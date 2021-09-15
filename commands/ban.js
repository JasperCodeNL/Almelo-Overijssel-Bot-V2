const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
 
    if (!args[1]) return message.reply("Geen gebruiker opgegeven!");

    if (!args[2]) return message.reply("Graag een reden opgeven!");

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Jij hebt hier geen premmisions voor!");

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("Geef de bot premmisions!");

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));

    var reason = args.slice(2).join(" ");

    if (!banUser) return message.reply("Kan de gebruiker niet vinden!");

    var embed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setThumbnail(banUser.user.displayAvatarURL)
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`** Geband:** ${banUser} (${banUser.id})
        **Geband door:** ${message.author}
        **Redenen: ** ${reason}`);

    var embedPrompt = new discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor("Reageer binnen 30 seconden!")
        .setDescription(`Wil je ${banUser} bannen?`);


    message.channel.send(embedPrompt).then(async msg => {

        var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);


        if (emoji === "✅") {

            msg.delete();

            
            banUser.ban(reason).catch(err => {
                if (err) return message.channel.send(`Er is iets foutgegaan.`);
            });

            message.reply(embed);

        } else if (emoji === "❌") {

            msg.delete();

            message.reply("Ban geanuleerd").then(m => m.delete(5000));

        }

    });


}

    // Emojis aan teksten kopellen.
    async function promptMessage(message, author, time, reactions) {
        // We gaan eerst de tijd * 1000 doen zodat we seconden uitkomen.
        time *= 1000;
     
        // We gaan ieder meegegeven reactie onder de reactie plaatsen.
        for (const reaction of reactions) {
            await message.react(reaction);
        }
     
        // Als de emoji de juiste emoji is die men heeft opgegeven en als ook de auteur die dit heeft aangemaakt er op klikt
        // dan kunnen we een bericht terug sturen.
        const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;
     
        // We kijken als de reactie juist is, dus met die filter en ook het aantal keren en binnen de tijd.
        // Dan kunnen we bericht terug sturen met dat icoontje dat is aangeduid.
        return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);
    }
module.exports.help = {
    name: "ban"
}