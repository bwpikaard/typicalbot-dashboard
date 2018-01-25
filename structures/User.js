const { Permissions } = require("discord.js");
const tokens = require("../tokens");

module.exports = class {
    constructor(profile) {
        this.id = profile.id;
        this.username = profile.username;
        this.discriminator = profile.discriminator;
        this.avatarURL = profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : null;
        this.guilds = profile.guilds;

        this.lightTheme = true;

        this.apitoken = tokens[profile.id] ? tokens[profile.id].token : null;
    }
};
