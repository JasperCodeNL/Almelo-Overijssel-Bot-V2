const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    const categoryID = "873968786968035329";

    if(message.channel.parentID == categoryID){

        var LogEmbed =  new discord.MessageEmbed()
        .setTitle("Ticket Gesloten")
        .setFooter("Logs")
        .setTimestamp()
        .setColor("BLUE")
        .addFields(
            { name: "Gesloten Door:", value: `${message.author.tag} (${message.author.id})` },
            { name: "Ticket:", value: `${message.channel.name}` }
        );
    
        bot.channels.cache.get('889811265738919977').send(LogEmbed);

        message.channel.delete();
    }



}

module.exports.help = {
    name: "close"
}