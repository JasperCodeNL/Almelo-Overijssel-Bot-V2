const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    var botEmbed = new discord.MessageEmbed()
    .setColor("BLUE")
    .setFooter("Leden")
    .setTimestamp()
    .setTitle("Leden:")
    .setDescription(message.guild.memberCount) 
    
return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "leden"
}