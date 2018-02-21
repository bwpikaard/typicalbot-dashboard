const path = require("path");

module.exports = function(req) {
    return path.join(process.cwd(), "content", "templates", req);
};