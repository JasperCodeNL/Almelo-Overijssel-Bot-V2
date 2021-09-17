const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    var botEmbed = new discord.MessageEmbed()
    .setColor("BLUE")
    .setFooter("Leden")
    .setTimestamp()
    .addFields(
        {name:"Leden:", value:message.guild.memberCount}
    ); 
    
return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "members"
}