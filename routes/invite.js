const router = module.exports = require("express").Router();

router.get("/invite", async (req, res, next) => {
    res.redirect(`https://discordapp.com/oauth2/authorize?client_id=166527505610702848&permissions=8&scope=bot&redirect_uri=${this.config.bot_redirectUri}&response_type=code`);
});