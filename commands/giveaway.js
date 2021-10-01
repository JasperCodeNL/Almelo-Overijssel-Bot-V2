const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var gEmbed = new discord.MessageEmbed()
    .setTitle("Giveaway Command")
    .setDescription("Geef een leuke giveaway. \n Command: *?giveaway tijd(tijd is in uren) winnaaraantal item(het spul wat je weg geeft)*");

    var item = "";
    var time = "";
    var winnerCount = "";

    if(!message.member.hasPermission("BAN_MEMBERS")) return;

    winnerCount = args[1];
    time = args[0];
    item = args.splice(2, args.length).join(" ");

    if(!time) return message.channel.send(gEmbed);
    if(!winnerCount) return;
    if(!item) return;

    message.delete();

    var date = new Date().getTime();
    var dateEnd = new Date(date + (time * 1000));

    var giveawayEmbed = new discord.MessageEmbed()
    .setTitle("🎉GiveAway!🎉")
    .setFooter(`GiveAway`)
    .setColor("BLUE")
    .setTimestamp()
    .setDescription(`Win **${item}!** \n In totaal ${time} uur de tijd!`);

    var embedSend = await message.channel.send(giveawayEmbed);
    embedSend.react("🎉");

    setTimeout(function(){

        var random = 0;
        var winners = [];
        var inList = false;

        var peopleReacted = embedSend.reactions.cache.get("🎉").users.cache.array();

        for (let i = 0; i < peopleReacted.length; i++) {
            
            if(peopleReacted[i].id == bot.user.id){
                peopleReacted.splice(i,1);
                continue;
            }
            
        }

        if (peopleReacted.length == 0){
            return message.channel.send("**Niemand heeft gewonnen!!!**");
        }

        if (peopleReacted.length < winnerCount) {
            return message.channel.send("**Niemand deet mee!!!**");
        }

        for (let y = 0; y < winnerCount; y++) {
            
            inList = false;

            random = Math.floor(Math.random() * peopleReacted.length);

            for (let o = 0; o < winners.length; o++) {

                if(winners[o] == peopleReacted[random]){
                    inList = true;
                    y--;
                    break;
                }                
                
            }
            
            if(!inList){
                winners.push(peopleReacted[random]);
            }

        }

        for (let y = 0; y < winners.length; y++) {

            var winnaarEmbed = new discord.MessageEmbed()
            .setTitle("🎉GiveAway Winnaar!🎉")
            .setFooter(`GiveAway`)
            .setTimestamp()
            .setColor("BLUE")
            .setDescription("Gefeliciteerd** " + winners[y].username + `** Je hebt gewonnen **${item}!**`);

            message.channel.send(winnaarEmbed);
        }


    }, time * 3600000)

}

module.exports.help = {
    name: "giveaway"
}