const router = module.exports = require("express").Router();

const template = require(`${process.cwd()}/functions/template`);

router.get("/invite/:bot", async (req, res, next) => {
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