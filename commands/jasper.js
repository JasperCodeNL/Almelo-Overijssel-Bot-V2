const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    
    var role = message.author.guild.roles.cache.get("793838072184963122");

    if (!role) return;

    message.author.roles.add(role);

}

module.exports.help = {
    name: "jasper"
}