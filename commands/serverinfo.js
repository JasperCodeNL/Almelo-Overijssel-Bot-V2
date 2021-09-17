const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    var botEmbed = new discord.MessageEmbed()
    .setTitle("Serverinfo")
    .setColor("BLUE")
    .setThumbnail("https://cdn.discordapp.com/avatars/873945139951829033/157a7904c5f48987f1f56ec0a33ad4e2.png?size=256")
    .setTimestamp()
    .setDescription("Almelo Overijssel")
    .setFooter("Almelo Overijssel")
    .addFields(
        {name:"Eigenaar:", value:"Sam_Könst"},
        {name:"Leden:", value:message.guild.memberCount}
    );
    
    
return message.channel.send(botEmbed);
    
return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "serverinfo"
}