const router = module.exports = require("express").Router();

const request = require("snekfetch");
const { Permissions } = require("discord.js");

const config = require(`${process.cwd()}/config`);

const isAuthenticated = require(`${process.cwd()}/functions/isAuthenticated`);
const template = require(`${process.cwd()}/functions/template`);
const fetchUserData = require(`${process.cwd()}/functions/fetchUserData`);

const invite = `https://discordapp.com/oauth2/authorize?client_id=293920118172418048&permissions=8&scope=bot&redirect_uri=https://dashboard.typicalbot.com/&response_type=code`;

router.get("/guilds/:guild/settings", isAuthenticated, async (req, res, next) => {
    const guild = req.params.guild;

    const userInGuild = req.user.guilds.filter(g => g.id === guild)[0];
    if (!userInGuild) return res.redirect("/auth/access-denied");

    const userData = await fetchUserData(req.user);

    request.get(`${config.api}/guilds/${guild}`).set("Authorization", config.apitoken).then(guildData => {
        request.get(`${config.api}/guilds/${guild}/users/${req.user.id}`).set("Authorization", config.apitoken).then(dataUser => {
            if (dataUser.body.permissions.level < 2) return res.redirect("/auth/access-denied");

            res.render(template("landing/guild/settings.ejs"), {
                user: req.user,
                auth: req.isAuthenticated(),
                guilds: userData,
                guild: guildData.body.guild
            });
        }).catch(console.error);
    }).catch(err => {
        const userPerms = new Permissions(userInGuild.permissions);
        if (!userPerms.has("MANAGE_GUILD")) return res.status(403).json({ "message": "You do not have permissions to add the bot to that guild." });

        res.redirect(`${invite}&guild_id=${guild}`);
    });
});