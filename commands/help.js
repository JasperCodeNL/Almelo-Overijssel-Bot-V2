const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    var botEmbed = new discord.MessageEmbed()
    .setTitle("Commands")
    .setFooter("Alle commands")
    .setTimestamp()
    .setColor("BLUE")
    .addFields(
        {name:"Standaart commands:", value:"?help - Alle commands. \n ?hallo - Bot zegt hallo terug.  \n ?test - Kijk of de bot werkt. \n ?serverinfo - Krijg info over deze server."},
        {name:"Moderatie commands:", value:"?kick - Kick een speler. \n ?ban - Ban een speler. \n ?clear (Getal) - Verwijder berichten. \n ?close - Sluit een ticket. \n ?add - Voeg iemand toe aan je ticket. \n ?remove - Verwijder iemand uit je ticket."}
    )
    
    
return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "help"
}