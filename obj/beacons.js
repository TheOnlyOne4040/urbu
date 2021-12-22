module.exports.info = function info(text)
{
    return console.log(`\x1b[48;5;220;30m[INFO]\x1b[0m ${text}`);
}

module.exports.warn = function warn(text)
{
    return console.log(`\x1b[48;5;202;30m[WARN]\x1b[0m ${text}`);
}

module.exports.error = function error(text)
{
    return console.log(`\x1b[48;5;160;30m[ERROR]\x1b[0m ${text}`);
}