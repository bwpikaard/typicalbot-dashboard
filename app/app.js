const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const fs = require("fs");

const { Collection } = require("discord.js");
const { Strategy } = require("passport-discord"); // possible to get rid of - small lib - can implement without

const config = require("./config");

const users = new Collection();
const app = express();

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
    new Strategy({ clientID: config.clientID, clientSecret: config.clientSecret, callbackURL: config.redirectUri, scope: ["identify", "guilds"] },
        (accessToken, refreshToken, profile, done) => process.nextTick(() => done(null, profile)))
);

app.use(session({ secret: "typicalbot", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

fs.readdirSync("./routes").forEach(route => app.use(require(`./routes/${route}`)));

app.use(express.static(path.join(process.cwd(), "public")));
app.use((req, res) => res.status(404).render(path.join(process.cwd(), "resources", "templates", "404.ejs"), { user: req.user, auth: req.isAuthenticated() }));

app.listen(config.port, () => console.log(`Express Server Created | Listening on Port :${config.port}`));