const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var SugEmbed = new discord.MessageEmbed()
    .setTitle("Suggestie Command")
    .setDescription("Laat weten of er een bug is in de game. \n Command: *?suggestie bericht*");

    const channel = message.guild.channels.cache.find(ch => ch.name === "💡suggesties");
    if(!channel) return message.reply("geen suggestie kanaal gevonden!");

    var argsBericht = args.join(" ");
    if(!argsBericht) return message.channel.send(SugEmbed);

    var embedSucces = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTimestamp()
        .setFooter("Suggestie")
        .setDescription("**Suggestie succesvol geplaatst!**");

    var embed = new discord.MessageEmbed()
        .setDescription(argsBericht)
        .setColor("ORANGE")
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true}))
        .setAuthor(message.author.tag);
    
    channel.send(embed).then(async (msg) => {

        await msg.react("✅")
        await msg.react("❎")

    }).catch(err => {
        console.log(err);
    })
    message.reply(embedSucces);
    

}

module.exports.help = {
    name: "suggestie"
}