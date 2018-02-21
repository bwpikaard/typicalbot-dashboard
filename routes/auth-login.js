const router = module.exports = require("express").Router();

const passport = require("passport");
const url = require("url");

router.get("/auth/login", (req, res, next) => {
    if (req.session.backURL) {
        req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
        const parsed = url.parse(req.headers.referer);
        if (parsed.hostname === req.app.locals.domain) {
            req.session.backURL = parsed.path;
        }
    } else {
        req.session.backURL = '/';
    }
    next();
}, passport.authenticate("discord"));