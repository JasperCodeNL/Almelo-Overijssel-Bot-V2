const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    var botEmbed = new discord.MessageEmbed()
    .setTitle("Serverinfo!")
    .setColor("BLUE")
    .setThumbnail("https://cdn.discordapp.com/avatars/823900784072458261/ecefca36f24b4e0b121beb60cb768f92.png?size=256")
    .setTimestamp()
    .setDescription("Zaandam RolePlay")
    .setFooter("Zaandam RolePlay")
    .addFields(
        {name:"Leden:", value:message.guild.memberCount}
    );
    
    
return message.channel.send(botEmbed);
    
return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "serverinfo"
}