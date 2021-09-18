const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    const channel = message.guild.channels.cache.find(ch => ch.name === "💡suggesties");
    if(!channel) return message.reply("geen suggestie kanaal gevonden!");

    var argsBericht = args.join(" ");
    if(!argsBericht) return message.reply("Vergeet geen suggestie mee te geven!")

    var embed = new discord.MessageEmbed()
        .setDescription(argsBericht)
        .setColor("ORANGE")
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true}))
        .setAuthor(message.author.tag)

    channel.send(embed).then(async (msg) => {

        await msg.react("✔")
        await msg.react("❌")

    }).catch(err => {
        console.log(err);
    })
    

}

module.exports.help = {
    name: "suggestie"
}