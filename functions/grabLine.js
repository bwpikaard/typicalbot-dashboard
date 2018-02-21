const fs = require("fs");

module.exports = async function(file) {
    file = `${process.cwd()}/content/api/${file}.txt`;

    const data = fs.readFileSync(file, "utf8");

    const lines = data.split(/\r?\n/);
    const line = lines[Math.floor(Math.random() * lines.length)];
    return line;
};