const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    const categoryID = "873968786968035329";

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var Ticketbestaat = false;
        
    if(Ticketbestaat) return;

    var embed = new discord.MessageEmbed()
        .setDescription(`**Je ticket is aangemaakt ${message.author.username}!**`)
        .setFooter("Ticket systeem")
        .setTimestamp()
        .setColor("GREEN");
    
    message.channel.send(embed);


    message.guild.channels.create("Ticket-" + userDiscriminator, { type: 'text' }).then(
        (createdChannel) => {
            createdChannel.setParent(categoryID).then(
                (settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'),{
                        SEND_MASSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.author.id, {
                        CREATE_INSTANT_INVITE: false,
                        READ_MASSAGES: true,
                        SEND_MASSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        READ_MASSAGES_HISTORY: true,
                        VIEW_CHANNEL: true
                    });

//                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@Staff Team'),{
//                        CREATE_INSTANT_INVITE: false,
//                        READ_MASSAGES: true,
//                        SEND_MASSAGES: true,
//                        ATTACH_FILES: true,
//                        CONNECT: true,
//                       ADD_REACTIONS: true,
//                        READ_MASSAGES_HISTORY: true,
//                        VIEW_CHANNEL: true
//                    });

                    var embedParent =  new discord.MessageEmbed()
                        .setDescription(`**Welkom ${message.author.username}, het staffteam komt er zo aan. \n Stuur alvast je klacht/vraag.** `)
                        .setFooter("Ticket systeem")
                        .setTimestamp()
                        .setColor("BLUE");
                        
                    settedParent.send(embedParent);

                    var LogEmbed =  new discord.MessageEmbed()
                    .setTitle("Ticket Aangemaakt")
                    .setFooter("Log")
                    .setTimestamp()
                    .setColor("BLUE")
                    .addFields(
                        { name: "Gebruiker:", value: `${message.author.tag} (${message.author.id})` },
                        { name: "Ticket:", value: `${message.author.tag}` }
                    );

                    bot.channels.cache.get('889811265738919977').send(LogEmbed);

                }
            ).catch(err => {
            message.channel.send(`Er ging iets fout! ${err}`)
            });
        }
    )
    
}
   
module.exports.help = {
    name: "new"
}