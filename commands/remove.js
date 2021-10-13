const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var categoryID = "873968786968035329";

    if(!message.member.roles.cache.has('793838521826672660')) return message.reply("Je hebt geen perms!");

    if(!message.channel.parentID == categoryID) return message.reply("Haha wat grappig!");

    var removeUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    
    if(!removeUser) return message.reply("Geen gebruiker meegegeven!");

    var Authorp = message.author

    var embedPrompt = new discord.MessageEmbed()
        .setDescription(`**Wil je ${removeUser} Verwijderen uit deze ticket?**`)
        .setColor("BLUE")
        .setTimestamp()
        .setFooter("Ticket systeem");
    
    var embed = new discord.MessageEmbed()
        .setDescription(`**${Authorp} Heeft ${removeUser} verwijderd uit de ticket!**`)
        .setColor("GREEN")
        .setTimestamp()
        .setFooter("Ticket systeem");

    message.channel.send(embedPrompt).then(async msg => {
        
        message.delete();

        var emoji = await promptMessage(msg, message.author, 30, ["✅","❌"]);

        if(emoji == "✅") {

            msg.delete();

            message.channel.updateOverwrite(removeUser,{
                SEND_MESSAGES: false,
                VIEW_CHANNEL: false
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
    name: "remove"
}