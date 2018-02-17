const express       = require("express");
const bodyParser    = require("body-parser");
const Discord       = require("discord.js");
const path          = require("path");

const fs            = require("fs");
const fsn           = require("fs-nextra");
const request       = require("snekfetch");

const crypto        = require("crypto");

const tokens        = require("../tokens");

async function grabLine(file) {
    file = path.join(__dirname, "/data", `${file}.txt`);

    const data = fs.readFileSync(file, "utf8");

    const lines = data.split(/\r?\n/);
    const line = lines[Math.floor(Math.random() * lines.length)];
    return line;
}

class Router extends express.Router {
    constructor(server) {
        super();

        Object.defineProperty(this, "server", { value: server });

        this.use(bodyParser.json());

        this.use("/v1/*", (req, res, next) => {
            if (req.get("Authorization") && Object.keys(tokens).map(t => tokens[t].token).includes(req.get("Authorization"))) return next();
            
            res.status(401).json({ "message": "Unauthorized" });
        });

        /*              Routes              */

        this.all("/v1", (req, res) => {
            res.json({ "message": "No Content" });
        });

        /**
         * @api {get} /v1/stats Statistics
         * @apiVersion 1.0.0
         * @apiName Statistics
         * @apiGroup TypicalBot
         * 
         * @apiHeader Authorization TypicalBot API token.
         * @apiHeaderExample {json} Header-Example:
         *     {
         *         "Authorization": "dQnKCHo9WRmk8V2xt+jDCC85LOo="
         *     }
         * 
         * @apiSuccess {Object} data The response from the API.
         * @apiSuccess {Object} data.guilds The total number of gulds the bot is in.
         * @apiSuccess {Object} data.channels The total number of channels the bot is in.
         * @apiSuccess {Object} data.voiceConnections The total number of voice connections the bot is in.
         * @apiSuccess {Object} data.users The total number of users the bot can see.
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "data": {
         *             "guilds": 34,
         *             "channels": 886,
         *             "voiceConnections": 0,
         *             "users": 5034
         *         }
         *     }
         * 
         * @apiError {String} message The error encountered.
         * @apiError {String} resolution The way to fix the error.
         * @apiErrorExample {json} Error-Response:
         *     HTTP/1.1 403 Unauthorized
         *     {
         *         "message": "Unauthorized"
         *     }
         * 
         * @apiSampleRequest /api/v1/stats
         */

        this.all("/v1/stats", async (req, res) => {
            request.get(`${this.config.api}/stats`).set("Authorization", this.config.apitoken).then(data => {
                return res.json({ data: data.body });
            }).catch(err => {
                console.log(err);
                return res.status(500);
            });
        });

        /**
         * @api {get} /v1/quote Quotes
         * @apiVersion 1.0.0
         * @apiName Quotes
         * @apiGroup Entertainment
         * 
         * @apiHeader Authorization TypicalBot API token.
         * @apiHeaderExample {json} Header-Example:
         *     {
         *         "Authorization": "dQnKCHo9WRmk8V2xt+jDCC85LOo="
         *     }
         * 
         * @apiSuccess {String} data The response from the API.
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "data": "\"Don't do that!\""
         *     }
         * 
         * @apiError {String} message The error encountered.
         * @apiError {String} resolution The way to fix the error.
         * @apiErrorExample {json} Error-Response:
         *     HTTP/1.1 403 Unauthorized
         *     {
         *         "message": "Unauthorized"
         *     }
         * 
         * @apiSampleRequest /api/v1/quote
         */

        this.get("/v1/quote", async (req, res) => {
            res.json({ "data": await grabLine("quotes") });
        });

        /**
         * @api {get} /v1/joke Jokes
         * @apiVersion 1.0.0
         * @apiName Jokes
         * @apiGroup Entertainment
         * 
         * @apiHeader Authorization TypicalBot API token.
         * @apiHeaderExample {json} Header-Example:
         *     {
         *         "Authorization": "dQnKCHo9WRmk8V2xt+jDCC85LOo="
         *     }
         * 
         * @apiSuccess {String} data The response from the API.
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "data": "\"This is a joke. T'was it a funny one?\""
         *     }
         * 
         * @apiError {String} message The error encountered.
         * @apiError {String} resolution The way to fix the error.
         * @apiErrorExample {json} Error-Response:
         *     HTTP/1.1 403 Unauthorized
         *     {
         *         "message": "Unauthorized"
         *     }
         * 
         * @apiSampleRequest /api/v1/joke
         */

        this.get("/v1/joke", async (req, res) => {
            res.json({ "data": await grabLine("jokes") });
        });

        /**
         * @api {get} /v1/yomomma Yomomma Jokes
         * @apiVersion 1.0.0
         * @apiName Yomomma Jokes
         * @apiGroup Entertainment
         * 
         * @apiHeader Authorization TypicalBot API token.
         * @apiHeaderExample {json} Header-Example:
         *     {
         *         "Authorization": "dQnKCHo9WRmk8V2xt+jDCC85LOo="
         *     }
         * 
         * @apiSuccess {String} data The response from the API.
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "data": "\"Yo mama so fat she crushed the couch.\""
         *     }
         * 
         * @apiError {String} message The error encountered.
         * @apiError {String} resolution The way to fix the error.
         * @apiErrorExample {json} Error-Response:
         *     HTTP/1.1 403 Unauthorized
         *     {
         *         "message": "Unauthorized"
         *     }
         * 
         * @apiSampleRequest /api/v1/yomomma
         */

        this.get("/v1/yomomma", async (req, res) => {
            res.json({ "data": await grabLine("yomomma") });
        });

        /**
         * @api {get} /v1/tigr Tigers
         * @apiVersion 1.0.0
         * @apiName Tigers
         * @apiGroup Entertainment
         * 
         * @apiHeader Authorization TypicalBot API token.
         * @apiHeaderExample {json} Header-Example:
         *     {
         *         "Authorization": "dQnKCHo9WRmk8V2xt+jDCC85LOo="
         *     }
         * 
         * @apiSuccess {Object} data The response from the API.
         * @apiSuccess {String} data.type The type of the data given.
         * @apiSuccess {Array} data.data The Bufer array.
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "data": {
         *             "type": "Buffer",
         *             "data": [ . . . ]
         *         }
         *     }
         * 
         * @apiError {String} message The error encountered.
         * @apiError {String} resolution The way to fix the error.
         * @apiErrorExample {json} Error-Response:
         *     HTTP/1.1 403 Unauthorized
         *     {
         *         "message": "Unauthorized",
         *     }
         * 
         * @apiSampleRequest /api/v1/tiger
         */

        this.get("/v1/tiger", async (req, res) => {
            const dir = path.join(__dirname, "data", "tigers");
            const tigers = await fsn.readdir(dir);

            res.json({ "data": await fsn.readFile(`${dir}/` + tigers[Math.round(tigers.length * Math.random())]) }); 
        });

        this.all("/v1/*", (req, res) => {
            res.json({ "message": "Endpoint Not Found" });
        });

        this.all("/tokens", (req, res) => {
            res.json({ "message": "No Content" });
        });

        /**
         * @api {get} /tokens/generate Generate Token
         * @apiVersion 1.0.0
         * @apiName Token Generation
         * @apiGroup Tokens
         * 
         * @apiSuccess {String} data The response from the API.
         * @apiSuccessExample {json} Success-Response:
         *     HTTP/1.1 200 OK
         *     {
         *         "data": "dQnKCHo9WRmk8V2xt+jDCC85LOo="
         *     }
         * 
         * @apiSampleRequest /api/tokens/generate
         */

        this.get("/tokens/generate", async (req, res) => {
            res.json({ "data": crypto.randomBytes(20).toString("base64") });
        });

        this.all("/tokens/*", (req, res) => {
            res.json({ "message": "Endpoint Not Found" });
        });
    }
}

module.exports = Router;