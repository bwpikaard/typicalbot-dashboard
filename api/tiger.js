const router = module.exports = require("express").Router();

const request = require("snekfetch");
const fsn = require("fs-nextra");

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
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Unauthorized
 *     {
 *         "message": "Unauthorized",
 *     }
 * 
 * @apiSampleRequest /api/v1/tiger
 */

router.get("/v1/tiger", async (req, res) => {
    const dir = `${process.cwd()}/content/api/tigers`;
    const tigers = await fsn.readdir(dir);

    res.json({ "data": await fsn.readFile(`${dir}/` + tigers[Math.round(Math.random() * tigers.length)]) });
});