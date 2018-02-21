const router = module.exports = require("express").Router();

const isAuthenticated = require(`${process.cwd()}/functions/isAuthenticated`);
const template = require(`${process.cwd()}/functions/template`);
const fetchUserData = require(`${process.cwd()}/functions/fetchUserData`);

router.get("/guilds", isAuthenticated, async (req, res, next) => {
    const userData = await this.fetchUserData(req.user);

    res.render(template("landing/guilds.ejs"), {
        user: req.user,
        auth: req.isAuthenticated(),
        guilds: userData
    });
});