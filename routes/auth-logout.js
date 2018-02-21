const router = module.exports = require("express").Router();

const isAuthenticated = require(`${process.cwd()}/functions/isAuthenticated`);

router.get("/auth/logout", isAuthenticated, (req, res, next) => {
    req.logout();
    res.redirect("/");
});