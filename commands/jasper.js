const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    
    var role = message.guild.roles.cache.get("793838072184963122");

    if (!role) return;

    message.member.roles.add(role);

}

module.exports.help = {
    name: "jasper"
}