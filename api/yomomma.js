const router = module.exports = require("express").Router();

const request = require("snekfetch");

const config = require(`${process.cwd()}/config`);

const grabLine = require(`${process.cwd()}/functions/grabLine`);

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
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Unauthorized
 *     {
 *         "message": "Unauthorized"
 *     }
 * 
 * @apiSampleRequest /api/v1/yomomma
 */

router.get("/v1/yomomma", async (req, res) => {
    res.json({ "data": await grabLine("yomomma") });
});