const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var botEmbed = new discord.MessageEmbed()
    .setTitle("Pong!")
    .setDescription(`${message.createdTimestamp - Date.now()}ms`)
    .setTimestamp()
    .setColor("GREEN") 
    
    return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "ping"
}