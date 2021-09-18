const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var KickEmbed = new discord.MessageEmbed()
        .setTitle("Kick Command")
        .setDescription("Kick een gebruiker. \n Command: *?kick naam reden*");

    var RedenEmbed = new discord.MessageEmbed()
        .setDescription("**Graag een reden achter laten!**")
        .setColor("Red");

    var GebruikerEmbed = new discord.MessageEmbed()
        .setDescription("**Kan gebruiker niet vinden!**")
        .setColor("Red");
 
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Jij hebt hier geen premmisions voor!");
 
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geef de bot premmisions!");
 
        if (!args[0]) return message.channel.send(KickEmbed);
 
        if (!args[1]) return message.channel.send(RedenEmbed);
 
        var kickUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
 
        var reason = args.slice(1).join(" ");
 
        if (!kickUser) return message.channel.send(GebruikerEmbed);;
 
        var embed = new discord.MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(kickUser.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`** Gekickt:** ${kickUser} (${kickUser.id})
            **Gekickt door:** ${message.author}
            **Redenen: ** ${reason}`);
 
        var embedPrompt = new discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor("Gelieve te reageren binnen 30 sec.")
            .setDescription(`Wil je ${kickUser} kicken?`);
 
 
        message.channel.send(embedPrompt).then(async msg => {
 
            var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);
 
 
            if (emoji === "✅") {
 
                msg.delete();
 
                kickUser.kick(reason).catch(err => {
                    if (err) return message.channel.send(`Er is iets foutgegaan.`);
                });
 
                message.reply(embed);
 
            } else if (emoji === "❌") {
 
                msg.delete();
 
                message.reply("Kick geanuleerd").then(m => m.delete(5000));
 
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
    name: "kick"
}