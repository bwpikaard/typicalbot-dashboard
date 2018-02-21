const router = module.exports = require("express").Router();

const template = require(`${process.cwd()}/functions/template`);
const fetchUserData = require(`${process.cwd()}/functions/fetchUserData`);

router.get("/documentation", (req, res, next) => {
    if (req.isAuthenticated()) return next();

    res.render(template("landing/documentation.ejs"), {
        user: req.user,
        auth: req.isAuthenticated()
    });
}, async (req, res) => {
    const userData = await fetchUserData(req.user);

    res.render(template("landing/documentation.ejs"), {
        user: req.user,
        auth: req.isAuthenticated(),
        guilds: userData
    });
});