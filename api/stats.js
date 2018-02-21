const router = module.exports = require("express").Router();

const request = require("snekfetch");

const config = require(`${process.cwd()}/config`);

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
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Unauthorized
 *     {
 *         "message": "Unauthorized"
 *     }
 * 
 * @apiSampleRequest /api/v1/stats
 */

router.all("/v1/stats", async (req, res) => {
    request.get(`${config.api}/stats`).set("Authorization", config.apitoken).then(data => {
        return res.json({ data: data.body });
    }).catch(err => {
        return res.status(500);
    });
});