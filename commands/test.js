const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    var botEmbed = new discord.MessageEmbed()
    .setDescription("**Ik werk!**")
    .setColor("GREEN") 
    
return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "test"
}