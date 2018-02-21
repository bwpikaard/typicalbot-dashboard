const router = module.exports = require("express").Router();

router.get("/join-us", async (req, res, next) => {
    res.redirect(`https://discordapp.com/invite/typicalbot`);
});