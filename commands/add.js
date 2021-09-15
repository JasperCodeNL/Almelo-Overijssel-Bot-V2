const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var categoryID = "855749102171193345";

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Je hebt geen perms!");

    if(!message.channel.parentID == categoryID) return message.reply("Haha wat grappig!");

    var addUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    
    if(!addUser) return message.reply("Geen gebruiker meegegeven!");

    var Authorp = message.author

    var embedPrompt = new discord.MessageEmbed()
        .setDescription(`**Wil je ${addUser} toevoegen?**`)
        .setColor("BLUE")
        .setTimestamp()
        .setFooter("Ticket systeem");
    
    var embed = new discord.MessageEmbed()
        .setDescription(`**${addUser} Is toegevoegd door ${Authorp}**`)
        .setColor("GREEN")
        .setTimestamp()
        .setFooter("Ticket systeem");

    message.channel.send(embedPrompt).then(async msg => {
        
        message.delete();

        var emoji = await promptMessage(msg, message.author, 30, ["✅","❌"]);

        if(emoji == "✅") {

            msg.delete();

            message.channel.updateOverwrite(addUser,{
                SEND_MESSAGES: true,
                VIEW_CHANNEL: true
            });

            message.channel.send(embed);

        }else if(emoji == "❌"){

            msg.delete();

            message.reply("Geanuleerd!").then(msg => msg.delete({ timeout: 5000 }));
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
    name: "add"
}