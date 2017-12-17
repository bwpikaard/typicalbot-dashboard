const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { Strategy } = require("passport-discord");
const bodyParser = require("body-parser");
const fs = require("fs");

const request = require("superagent");

const url = require("url");
const path = require("path");

const { Permissions, Collection } = require("discord.js");

function page(req_path) { return path.join(__dirname, "content", "templates", req_path); }

const User = require("./structures/User");

new class extends express {
    constructor() {
        super();

        this.config = require("./config");

        this.users = new Collection();

        passport.serializeUser((id, done) => { done(null, id); });
        passport.deserializeUser((id, done) => { done(null, this.users.get(id)); });

        passport.use(
            new Strategy({ clientID: this.config.clientID, clientSecret: this.config.clientSecret, callbackURL: this.config.redirectUri, scope: ["identify", "guilds"] },
                (accessToken, refreshToken, profile, done) => { this.users.set(profile.id, new User(profile)); process.nextTick(() => done(null, profile.id)); })
        );

        this.use(session({ secret: "typicalbot", resave: false, saveUninitialized: false }));
        this.use(passport.initialize());
        this.use(passport.session());
        this.use(bodyParser.json());

        this.engine("html", require("ejs").renderFile);
        this.set("view engine", "html");

        function isAuthenticated(req, res, next) { if (req.isAuthenticated()) return next(); req.session.backURL = req.url; res.redirect("/auth/login"); }
        //function isStaff(req, res, next) { if (req.isAuthenticated() && master.staff(req.user.id)) return next(); req.session.backURL = req.url; res.redirect("/"); }
        //function isApplication (req, res, next) { if (req.headers.authorization && req.headers.authorization === "HyperCoder#2975") return next(); res.status(401).json({ "message": "Unauthorized" }); }

        /*
                                                           - - - - - - - - - -

                                                                AUTHENTICATION

                                                           - - - - - - - - - -
        */

        this.get("/auth/login", (req, res, next) => {
            if (req.session.backURL) {
                req.session.backURL = req.session.backURL;
            } else if (req.headers.referer) {
                const parsed = url.parse(req.headers.referer);
                if (parsed.hostname === this.locals.domain) {
                    req.session.backURL = parsed.path;
                }
            } else {
                req.session.backURL = '/';
            }
            next();
        }, passport.authenticate("discord"));

        this.get("/auth/callback", passport.authenticate("discord", {
            failureRedirect: `/access-denied`
        }), (req, res) => {
            if (req.session.backURL) {
                res.redirect(req.session.backURL);
                req.session.backURL = null;
            } else {
                res.redirect("/");
            }
        });

        this.get("/auth/logout", function(req, res) {
            req.logout();
            res.redirect("/");
        });

        this.get("/access-denied", (req, res) => {
            res.render(page("403.ejs"), {
                user: req.user || null,
                auth: req.isAuthenticated()
            });
        });

        /*
                                                           - - - - - - - - - -

                                                                MAIN PAGES

                                                           - - - - - - - - - -
        */

        async function fetchUserData(user) {
            return new Promise(async (resolve, reject) => {
                const guilds = user.guilds;
                const data = [];

                guilds.forEach((guild, i) => {
                    request.get(`http://localhost:5000/guilds/${guild.id}`).end((err, res) => {
                        if (err) {
                            Object.defineProperty(guild, "isMember", { value: false });
                            if (new Permissions(guild.permissions).has("MANAGE_GUILD")) data.push(guild);

                            if (i + 1 === user.guilds.length) setTimeout(() => {
                                resolve(data);
                            }, 100);
                        } else {
                            request.get(`http://localhost:5000/guilds/${guild.id}/users/${user.id}`).end((err2, res2) => {
                                if (err2) {
                                    console.log(err2.body);
                                } else {
                                    Object.defineProperty(guild, "isMember", { value: true });
                                    if (res2.body.permissions.level >= 2) data.push(guild);
                                }

                                if (i + 1 === user.guilds.length) setTimeout(() => {
                                    resolve(data);
                                }, 100);
                            });
                        }
                    });
                });
            });
        }

        this.get("/", async (req, res, next) => {
            if (!req.isAuthenticated()) return next();

            const userData = await fetchUserData(req.user);
            console.log(userData[0]);

            res.render(page("landing/index.ejs"), {
                user: req.user,
                auth: req.isAuthenticated(),
                guilds: userData
            });
        }, (req, res) => {
            res.render(page("landing/index.ejs"), {
                user: req.user,
                auth: req.isAuthenticated()
            });
        });

        this.get("/documentation", (req, res) => {
            res.render(page("landing/documentation.ejs"), {
                user: req.user,
                auth: req.isAuthenticated()
            });
        });

        this.get("/donate", (req, res) => {
            res.redirect(`https://typicalbot.com/donate/`);
        });

        this.get("/join-us", (req, res) => {
            res.redirect(`https://discordapp.com/invite/typicalbot`);
        });

        this.get("/invite", (req, res) => {
            res.redirect(`https://discordapp.com/oauth2/authorize?client_id=166527505610702848&permissions=8&scope=bot&redirect_uri=${this.config.bot_redirectUri}&response_type=code`);
        });

        this.get("/invite/:bot", (req, res) => {
            const bot = req.params.bot;

            if (bot === "stable") {
                res.redirect(`https://discordapp.com/oauth2/authorize?client_id=212016587358601216&permissions=8&scope=bot&redirect_uri=${this.config.bot_redirectUri}&response_type=code`);
            } else if (bot === "beta") {
                res.redirect(`https://discordapp.com/oauth2/authorize?client_id=212016587358601216&permissions=8&scope=bot&redirect_uri=${this.config.bot_redirectUri}&response_type=code`);
            } else if (bot === "development") {
                res.redirect(`https://discordapp.com/oauth2/authorize?client_id=293920118172418048&permissions=8&scope=bot&redirect_uri=${this.config.bot_redirectUri}&response_type=code`);
            } else if (bot === "hypercast") {
                res.redirect("https://discordapp.com/oauth2/authorize?client_id=264207339068981251&permissions=8&scope=bot");
            } else if (bot === "mrgiveaway") {
                res.redirect("https://discordapp.com/oauth2/authorize?client_id=343799790724841483&scope=bot&permissions=388160");
            } else {
                res.status(404).render(page("404.ejs"), { user: req.user, auth: req.isAuthenticated() });
            }
        });

        this.get("/thanks", (req, res) => {
            res.redirect(`/`);
        });



        /*
                                                           - - - - - - - - - -

                                                                API

                                                           - - - - - - - - - -
        */

        async function grabLine(file) {
            file = path.join(__dirname, "/data", file, ".txt");

            fs.readFile(file, (err, data) => {
                if (err) throw err;

                const lines = data.split("\n");
                const line = lines[Math.floor(Math.random() * lines.length)];
                return line;
            });
        }

        this.get("/api", (req, res) => {
            res.json({"code": 0, "message": "404: Not Found"});
        });

        this.get("/api/quotes", async (req, res) => {
            res.json({"message": await grabLine("quotes") });
        });

        this.get("/api/*", (req, res) => {
            res.json({"code": 0, "message": "404: Not Found"});
        });

        /*
                                                           - - - - - - - - - -

                                                                PROFILE

                                                           - - - - - - - - - -
        */

        this.get("/user/theme/light", (req, res) => {
            req.user.lightTheme = true;
            res.redirect(req.headers.referer || "/");
        });

        this.get("/user/theme/dark", (req, res) => {
            req.user.lightTheme = false;
            res.redirect(req.headers.referer || "/");
        });

        /*
                                                           - - - - - - - - - -

                                                                INIT EXPRESS

                                                           - - - - - - - - - -
        */

        this.use(express.static(`${__dirname}/content/static`));
        this.use((req, res) => res.status(404).render(page("404.ejs"), { user: req.user, auth: req.isAuthenticated() }));

        this.listen(this.config.port, () => console.log(`Express Server Created | Listening on Port :${this.config.port}`));
    }
};
