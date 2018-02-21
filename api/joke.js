const router = module.exports = require("express").Router();

const request = require("snekfetch");

const grabLine = require(`${process.cwd()}/functions/grabLine`);

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
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Unauthorized
 *     {
 *         "message": "Unauthorized"
 *     }
 * 
 * @apiSampleRequest /api/v1/joke
 */

router.get("/v1/joke", async (req, res) => {
    res.json({ "data": await grabLine("jokes") });
});