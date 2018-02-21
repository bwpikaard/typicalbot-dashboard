const router = module.exports = require("express").Router();

const template = require(`${process.cwd()}/functions/template`);
const fetchUserData = require(`${process.cwd()}/functions/fetchUserData`);

router.get("/", (req, res, next) => {
    if (req.isAuthenticated()) return next();
    
    res.render(template("landing/index.ejs"), {
        user: req.user,
        auth: req.isAuthenticated()
    });
}, async (req, res) => {
    if (req.query.guild_id) return res.redirect(`/guilds/${req.query.guild_id}`);

    const userData = await fetchUserData(req.user);

    res.render(template("landing/index.ejs"), {
        user: req.user,
        auth: req.isAuthenticated(),
        guilds: userData
    });
});