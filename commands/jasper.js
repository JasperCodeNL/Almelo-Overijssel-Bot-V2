const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    
    var role = member.guild.roles.cache.get("793838072184963122");

    if (!role) return;

    member.roles.add(role);

}

module.exports.help = {
    name: "jasper"
}