const request = require("snekfetch");
const { Permissions } = require("discord.js");

const config = require(`${process.cwd()}/config`);

module.exports = async function(guild, user) {
    try {
        const res = await request.get(`${config.api}/guilds/${guild.id}`).set("Authorization", config.apitoken);
    } catch (err) {
        guild.isMember = false;
        if (new Permissions(guild.permissions).has("MANAGE_GUILD")) return guild;
    }

    try {
        const res = await request.get(`${config.api}/guilds/${guild.id}/users/${user.id}`).set("Authorization", config.apitoken);
        guild.isMember = true;
        if (res.body.permissions.level >= 2) return guild;
    } catch (err) {
        return undefined;
    }

    return undefined;
};