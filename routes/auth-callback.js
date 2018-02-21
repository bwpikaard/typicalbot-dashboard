const router = module.exports = require("express").Router();

const passport = require("passport");

router.get("/auth/callback", passport.authenticate("discord", {
    failureRedirect: `/auth/access-denied`
}), (req, res) => {
    if (req.session.backURL) {
        res.redirect(req.session.backURL);
        req.session.backURL = null;
    } else {
        res.redirect("/");
    }
});