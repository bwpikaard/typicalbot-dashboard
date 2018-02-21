const checkGuild = require(`${process.cwd()}/functions/checkGuild`);

module.exports = async function (user) {
    const guilds = user.guilds;

    const data = (await Promise.all(guilds.map(g => checkGuild(g, user)))).filter(i => i);

    return data;
};