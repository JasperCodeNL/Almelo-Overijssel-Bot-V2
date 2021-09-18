const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    if(!message.member.hasPermission("BAN_MEMBERS")) return;

    var seperator = "|";

    if(args[0] == null){

        var embedInfo = new discord.MessageEmbed()
        .setTitle("Update Command")
        .setColor("BLUE")
        .setDescription(`Doe een update door: \n ?update -Bericht |-Bericht |-Bericht`)

        return message.reply(embedInfo);

    }

    var embedSucces = new discord.MessageEmbed()
    .setColor("GREEN")
    .setTimestamp()
    .setFooter("Updates")
    .setDescription("Update succesvlo geplaatst!");


    var argsList = args.join(" ").split(seperator);

    if(argsList[0] == undefined) argsList[0] == "-";
    if(argsList[1] == undefined) argsList[1] == "-";
    if(argsList[2] == undefined) argsList[2] == "-";
    if(argsList[3] == undefined) argsList[3] == "-";
    if(argsList[4] == undefined) argsList[4] == "-";
    if(argsList[5] == undefined) argsList[5] == "-";
    if(argsList[6] == undefined) argsList[6] == "-";
    if(argsList[7] == undefined) argsList[7] == "-";
    if(argsList[8] == undefined) argsList[8] == "-";
    if(argsList[9] == undefined) argsList[9] == "-";

    var options = {

        bericht1: argsList[0] || " ",
        bericht2: argsList[1] || " ",
        bericht3: argsList[2] || " ",
        bericht4: argsList[3] || " ",
        bericht5: argsList[4] || " ",
        bericht6: argsList[5] || " ",
        bericht7: argsList[6] || " ",
        bericht8: argsList[7] || " ",
        bericht9: argsList[8] || " ",
        bericht10: argsList[9] || " ",

    }

    var UpdateEmbed = new discord.MessageEmbed()
        .setTitle("Game Update")
        .setColor("RED")
        .setTimestamp()
        .setFooter("Game Update")
        .setDescription(`${options.bericht1} \n ${options.bericht2} \n ${options.bericht3} \n ${options.bericht4} \n ${options.bericht5} \n ${options.bericht6} \n ${options.bericht7} \n ${options.bericht8} \n ${options.bericht9} \n ${options.bericht10} \n`)

    var channel = message.member.guild.channels.cache.find(channels => channels.name === "📙updates");
    if (!channel) return;

    channel.send(UpdateEmbed);
    message.reply(embedSucces);
}

module.exports.help = {
    name: "gameupdate"
}