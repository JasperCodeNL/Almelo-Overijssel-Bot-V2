const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    const categoryID = "873968786968035329";

    if(!message.member.roles.cache.has('793838521826672660')) return message.reply("Je hebt geen perms!");

    if(message.channel.parentID == categoryID) {

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

    } else {

        return message.reply("Haha wat grappig!");

    }

   

  
}


module.exports.help = {
    name: "close"
}