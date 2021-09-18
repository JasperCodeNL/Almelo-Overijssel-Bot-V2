const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    const channel = message.guild.channels.cache.find(ch => ch.name === "🔎bugs");
    if(!channel) return message.reply("geen suggestie kanaal gevonden!");

    var argsBericht = args.join(" ");
    if(!argsBericht) return message.reply("Vergeet geen bericht mee te geven!")

    var embed = new discord.MessageEmbed()
        .setDescription(argsBericht)
        .setColor("ORANGE")
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true}))
        .setAuthor(message.author.tag)

    channel.send(embed)

}

module.exports.help = {
    name: "bug"
}