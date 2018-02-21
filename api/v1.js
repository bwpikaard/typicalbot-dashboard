const router = module.exports = require("express").Router();

router.get("/v1", (req, res, next) => {
    res.json({ "message": "No Content" });
});