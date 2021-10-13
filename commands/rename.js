const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    const categoryID = "873968786968035329";

    if(!message.member.roles.cache.has('793838521826672660')) return message.reply("Je hebt geen perms!");

    if(message.channel.parentID == categoryID) {

 
        var newNaam = args[0]

        message.channel.setName(newNaam)
    

    } else {

        return message.reply("Haha wat grappig!");

    }


  
}


module.exports.help = {
    name: "rename"
}