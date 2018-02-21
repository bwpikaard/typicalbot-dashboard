const router = module.exports = require("express").Router();

router.get("/donate", async (req, res, next) => {
    res.redirect(`https://typicalbot.com/donate/`);
});