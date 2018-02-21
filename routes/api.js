const router = module.exports = require("express").Router();
const bodyParser = require("body-parser");
const fs = require("fs");

const tokens = require(`${process.cwd()}/tokens`);

router.use(bodyParser.json());

router.use("/api/v1/*", (req, res, next) => {
    if (req.get("Authorization") && Object.keys(tokens).map(t => tokens[t].token).includes(req.get("Authorization"))) return next();

    res.status(401).json({ "message": "Unauthorized" });
});

fs.readdirSync(`${process.cwd()}/api`)
    .forEach(r => router.use("/api", require(`${process.cwd()}/api/${r}`)));
