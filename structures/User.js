const { Permissions }   = require("discord.js");
const tokens            = require("../tokens");
const request           = require("snekfetch");
const config            = require("../config");

module.exports = class {
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
        request.get(`${config.api}/guilds/163038706117115906/users/${this.id}`).set("Authentication", config.apitoken)
            .then(data => {
                this.staff = data.body.permission.level >= 8;
            }).catch(err => {
                this.staff = false;
            });
    }
};
