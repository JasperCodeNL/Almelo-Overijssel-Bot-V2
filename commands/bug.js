const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var BugEmbed = new discord.MessageEmbed()
        .setTitle("Bug Command")
        .setDescription("Laat weten of er een bug is in de game. \n Command: *?bug bericht*");

    const channel = message.guild.channels.cache.find(ch => ch.name === "🔎bugs");
    if(!channel) return message.reply("Kanaal niet gevonden!")

    var argsBericht = args.join(" ");
    if(!argsBericht) return message.channel.send(BugEmbed);

    var embedSucces = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTimestamp()
        .setFooter("Bug")
        .setDescription("**Bug succesvol geplaatst!**");

    var embed = new discord.MessageEmbed()
        .setDescription(argsBericht)
        .setColor("ORANGE")
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true}))
        .setAuthor(message.author.tag)

    channel.send(embed)
    message.reply(embedSucces);


}

module.exports.help = {
    name: "bug"
}