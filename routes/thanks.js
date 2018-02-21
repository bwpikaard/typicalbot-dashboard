const router = module.exports = require("express").Router();

router.get("/thanks", async (req, res, next) => {
    res.redirect(`/`);
});