const express       = require("express");
const session       = require("express-session");
const passport      = require("passport");
const { Strategy }  = require("passport-discord");
const bodyParser    = require("body-parser");
const Discord       = require("discord.js");

const fs            = require("fs");
const fsn           = require("fs-nextra");
const request       = require("snekfetch");
const url           = require("url");
const path          = require("path");

const crypto        = require("crypto");

const tokens        = require("./tokens");

const User = require("./structures/User");

function template(req) { return path.join(__dirname, "content", "templates", req); }

new class extends express {
    constructor() {
        super();

        this.config = require("./config");

        this.invite = `https://discordapp.com/oauth2/authorize?client_id=293920118172418048&permissions=8&scope=bot&redirect_uri=https://dashboard.typicalbot.com/&response_type=code`;

        this.users = new Discord.Collection();

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

        function isAuthenticated(req, res, next) { if (req.isAuthenticated()) return next(); res.redirect("/auth/login"); }
        function isStaff(user) {
            request.get(`${this.config.api}/users/${user.id}`).then(res => {
                const data = res.body;
                return !!data.staff;
            }).catch(err => { return false; });
        }
        function isApplication (req, res, next) {
            if (req.get("Authentication") && Object.keys(tokens).filter(u => tokens[u].token === req.get("Authentication")[0])) return next();
            
            res.status(401).json({ "message": "Unauthorized", "resolution": "Supply an 'Authentication' header with your API token, which can be found on your profile page." }); }

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
            res.render(template("403.ejs"), {
                user: req.user || null,
                auth: req.isAuthenticated()
            });
        });

        /*
                                                           - - - - - - - - - -

                                                                MAIN templateS

                                                           - - - - - - - - - -
        */

        this.checkGuild = async function(guild, user) {
            try {
                const res = await request.get(`${this.config.api}/guilds/${guild.id}`).set("Authentication", this.config.apitoken);
            } catch (err) {
                guild.isMember = false;
                if (new Discord.Permissions(guild.permissions).has("MANAGE_GUILD")) return guild;
            }

            try {
                const res = await request.get(`${this.config.api}/guilds/${guild.id}/users/${user.id}`).set("Authentication", this.config.apitoken);
                guild.isMember = true;
                if (res.body.permissions.level >= 2) return guild;
            } catch (err) { return undefined; }

            return undefined;
        };

        this.fetchUserData = async function(user) {
            const guilds = user.guilds;

            const data = (await Promise.all(guilds.map(g => this.checkGuild(g, user)))).filter(i => i);

            return data;
        };

        this.get("/", async (req, res, next) => {
            if (!req.isAuthenticated()) return next();
            if (req.query.guild_id) return res.redirect(`/guilds/${req.query.guild_id}`);

            const userData = await this.fetchUserData(req.user);

            res.render(template("landing/index.ejs"), {
                user: req.user,
                auth: req.isAuthenticated(),
                guilds: userData
            });
        }, (req, res) => {
            res.render(template("landing/index.ejs"), {
                user: req.user,
                auth: req.isAuthenticated()
            });
        });

        this.get("/documentation", async (req, res, next) => {
            if (!req.isAuthenticated()) return next();

            const userData = await this.fetchUserData(req.user);

            res.render(template("landing/documentation.ejs"), {
                user: req.user,
                auth: req.isAuthenticated(),
                guilds: userData
            });
        }, (req, res) => {
            res.render(template("landing/documentation.ejs"), {
                user: req.user,
                auth: req.isAuthenticated()
            });
        });

        this.get("/user", isAuthenticated, async (req, res) => {
            const userData = await this.fetchUserData(req.user);

            res.render(template("landing/user.ejs"), {
                user: req.user,
                auth: req.isAuthenticated(),
                guilds: userData
            });
        });

        this.get("/guilds", isAuthenticated, async (req, res) => {
            const userData = await this.fetchUserData(req.user);

            res.render(template("landing/guilds.ejs"), {
                user: req.user,
                auth: req.isAuthenticated(),
                guilds: userData
            });
        });

        this.get("/guilds/:guild", isAuthenticated, async (req, res) => {
            const guild = req.params.guild;

            const userInGuild = req.user.guilds.filter(g => g.id === guild)[0];
            if (!userInGuild) return res.redirect("/access-denied");

            const userData = await this.fetchUserData(req.user);

            request.get(`${this.config.api}/guilds/${guild}`).set("Authentication", this.config.apitoken).then(guildData => {
                request.get(`${this.config.api}/guilds/${guild}/users/${req.user.id}`).set("Authentication", this.config.apitoken).then(dataUser => {
                    if (dataUser.body.permissions.level < 2) return res.redirect("/access-denied");

                    res.render(template("landing/guild/guild.ejs"), {
                        user: req.user,
                        auth: req.isAuthenticated(),
                        guilds: userData,
                        guild: guildData.body.guild
                    });
                }).catch(console.error);
            }).catch(err => {
                const userPerms = new Discord.Permissions(userInGuild.permissions);
                if (!userPerms.has("MANAGE_GUILD")) return res.status(403).json({ "message": "You do not have permissions to add the bot to that guild." });

                res.redirect(`${this.invite}&guild_id=${guild}`);
            });
        });

        this.get("/guilds/:guild/leave", isAuthenticated, async (req, res) => {
            const guild = req.params.guild;

            const userInGuild = req.user.guilds.filter(g => g.id === guild)[0];
            if (!userInGuild) return res.redirect("/access-denied");

            const userData = await this.fetchUserData(req.user);

            request.get(`${this.config.api}/guilds/${guild}`).set("Authentication", this.config.apitoken).then(guildData => {
                request.get(`${this.config.api}/guilds/${guild}/users/${req.user.id}`).set("Authentication", this.config.apitoken).then(dataUser => {
                    if (dataUser.body.permissions.level < 2) return res.redirect("/access-denied");

                    request.post(`${this.config.api}/guilds/${guild}/leave`).set("Authentication", this.config.apitoken).then(() => {
                        res.redirect("/");
                    }).catch(err => {
                        res.redirect("/access-denied");
                    });
                }).catch(console.error);
            }).catch(err => {
                const userPerms = new Discord.Permissions(userInGuild.permissions);
                if (!userPerms.has("MANAGE_GUILD")) return res.status(403).json({ "message": "You do not have permissions to add the bot to that guild." });

                res.redirect(`${this.invite}&guild_id=${guild}`);
            });
        });

        this.get("/guilds/:guild/settings", isAuthenticated, async (req, res) => {
            const guild = req.params.guild;

            const userInGuild = req.user.guilds.filter(g => g.id === guild)[0];
            if (!userInGuild) return res.redirect("/access-denied");

            const userData = await this.fetchUserData(req.user);

            request.get(`${this.config.api}/guilds/${guild}`).set("Authentication", this.config.apitoken).then(guildData => {
                request.get(`${this.config.api}/guilds/${guild}/users/${req.user.id}`).set("Authentication", this.config.apitoken).then(dataUser => {
                    if (dataUser.body.permissions.level < 2) return res.redirect("/access-denied");

                    res.render(template("landing/guild/settings.ejs"), {
                        user: req.user,
                        auth: req.isAuthenticated(),
                        guilds: userData,
                        guild: guildData.body.guild
                    });
                }).catch(console.error);
            }).catch(err => {
                const userPerms = new Discord.Permissions(userInGuild.permissions);
                if (!userPerms.has("MANAGE_GUILD")) return res.status(403).json({ "message": "You do not have permissions to add the bot to that guild." });

                res.redirect(`${this.invite}&guild_id=${guild}`);
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
                res.status(404).render(template("404.ejs"), { user: req.user, auth: req.isAuthenticated() });
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

        function tokenGen() {
            return crypto.randomBytes(20).toString("base64");
        }

        async function grabLine(file) {
            file = path.join(__dirname, "/data", `${file}.txt`);

            const data = fs.readFileSync(file, "utf8");

            const lines = data.split(/\r?\n/);
            const line = lines[Math.floor(Math.random() * lines.length)];
            return line;
        }

        this.get("/api", isApplication, (req, res) => {
            res.json({ "code": 0, "message": "404: Not Found" });
        });

        this.get("/api/stats", isApplication, async (req, res) => {
            request.get(`${this.config.api}/stats`).set("Authentication", this.config.apitoken).then(data => {
                return res.json({ data: data.body });
            }).catch(err => {
                console.log(err);
                return res.status(500);
            });
        });

        this.get("/api/quotes", isApplication, async (req, res) => {
            res.json({ "data": await grabLine("quotes") });
        });

        this.get("/api/jokes", isApplication, async (req, res) => {
            res.json({ "data": await grabLine("jokes") });
        });

        this.get("/api/yomomma", isApplication, async (req, res) => {
            res.json({ "data": await grabLine("yomomma") });
        });

        async function fetchTiger() {
            const dir = path.join(__dirname, "data", "tigers");
            const files = await fsn.readdir(dir);

            return await fsn.readFile(`${dir}/` + files[Math.round(files.length * Math.random())]);
        }

        this.get("/api/tiger", isApplication, async (req, res) => {
            res.json({ "data": await fetchTiger() });
        });

        this.get("/api/*", isApplication, (req, res) => {
            res.json({"code": 0, "message": "404: Not Found" });
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
        this.use((req, res) => res.status(404).render(template("404.ejs"), { user: req.user, auth: req.isAuthenticated() }));

        this.listen(this.config.port, () => console.log(`Express Server Created | Listening on Port :${this.config.port}`));
    }
};
