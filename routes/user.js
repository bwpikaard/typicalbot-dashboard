const router = module.exports = require("express").Router();

const isAuthenticated = require(`${process.cwd()}/functions/isAuthenticated`);
const template = require(`${process.cwd()}/functions/template`);
const fetchUserData = require(`${process.cwd()}/functions/fetchUserData`);

router.get("/user", isAuthenticated, async (req, res, next) => {
    const userData = await fetchUserData(req.user);

    res.render(template("landing/user.ejs"), {
        user: req.user,
        auth: req.isAuthenticated(),
        guilds: userData
    });
});