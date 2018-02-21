const router = module.exports = require("express").Router();

const template = require(`${process.cwd()}/functions/template`);
const isAuthenticated = require(`${process.cwd()}/functions/isAuthenticated`);

router.get("/auth/access-denied", isAuthenticated, (req, res, next) => {
    res.render(template("403.ejs"), {
        user: req.user || null,
        auth: req.isAuthenticated()
    });
});