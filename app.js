const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { Strategy } = require("passport-discord");

const { Collection } = require("discord.js");
const request = require("snekfetch");

const path = require("path");
const fs = require("fs");

const template = require(`${process.cwd()}/functions/template`);

const config = require("./config");
const tokens = require("./tokens");

const users = new Collection();

const app = express();

passport.serializeUser((id, done) => { done(null, id); });
passport.deserializeUser((id, done) => { done(null, users.get(id)); });

passport.use(
    new Strategy({ clientID: config.clientID, clientSecret: config.clientSecret, callbackURL: config.redirectUri, scope: ["identify", "guilds"] },
        (accessToken, refreshToken, profile, done) => { users.set(profile.id, new User(profile)); process.nextTick(() => done(null, profile.id)); })
);

app.use(session({ secret: "typicalbot", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use((req, res, next) => {
    if (/\/(?:auth|x|config)/.test(req.path)) return next();
    
    req.session.backURL = req.path;
    next();
});

fs.readdirSync("./routes")
    .forEach(route => app.use(require(`./routes/${route}`)));

app.use(express.static(`${__dirname}/content/static`));
app.use((req, res) => res.status(404).render(template("404.ejs"), { user: req.user, auth: req.isAuthenticated() }));

app.listen(config.port, () => console.log(`Express Server Created | Listening on Port :${config.port}`));

class User {
    constructor(profile) {
        this.id = profile.id;
        this.username = profile.username;
        this.discriminator = profile.discriminator;
        this.avatarURL = profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : null;
        this.guilds = profile.guilds;

        this.staff = false;

        this.lightTheme = true;

        this.apitoken = tokens[profile.id] ? tokens[profile.id].token : null;

        this.fetchLevel();
    }

    fetchLevel() {
        request
            .get(`${config.api}/guilds/163038706117115906/users/${this.id}`).set("Authentication", config.apitoken)
            .then(data => {
                this.staff = data.body.permissions.level >= 8;
            }).catch(err => {
                this.staff = false;
            });
    }
}