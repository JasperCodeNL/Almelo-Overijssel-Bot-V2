const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    var botEmbed = new discord.MessageEmbed()
    .setTitle("Commands")
    .setFooter("Alle commands")
    .setTimestamp()
    .setColor("BLUE")
    .addFields(
        {name:"Standaard commands:", value:"?hallo - Bot zegt hallo terug.  \n ?test - Kijk of de bot werkt. \n ?leden - Zie hoeveel mensen in de discord zijn. \n ?ping - Zie de snelheid va onze bot. \n ?avatar - Bekijk de avatar van een speler.\n ?suggestie - Laat een suggestie achter voor de game. \n ?new - Maak een ticket. \n ?bug - Laat hier je bug achter. "},
        {name:"Informatie commands:", value:"?help - Alle commands. \n ?serverinfo - Krijg info over deze server."},
        {name:"Staff commands:", value:"?kick - Kick een speler. \n ?ban - Ban een speler. \n ?clear - Verwijder berichten. \n ?close - Sluit een ticket. \n ?add - Voeg iemand toe aan een ticket. \n ?remove - Verwijder iemand uit een ticket."},
        {name:"OC commands:", value:"?discordupdate - Doe een discord update. \n ?gameupdate - Doe een game update. ?giveaway - Start een giveaway."},


    )
    
    
return message.channel.send(botEmbed);

}

module.exports.help = {
    name: "help"
}