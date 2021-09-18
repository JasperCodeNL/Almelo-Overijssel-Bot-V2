const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if(!message.member.hasPermission("BAN_MEMBERS")) return;

    var seperator = "|";

    if(args[0] == null){

        var embedInfo = new discord.MessageEmbed()
        .setTitle("Update Command")
        .setColor("BLUE")
        .setDescription(`Doe een update door: \n ?update (Jou bericht).`)

        return message.reply(embedInfo);

    }

    var argsList = args.join(" ").split(seperator);

    console.log(argsList)

}

module.exports.help = {
    name: "discordupdate"
}