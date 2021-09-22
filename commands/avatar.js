const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var member = message.guild.member(message.mentions.users.first() || bot.users.cache.get(args[0]) ||
        bot.users.cache.find(user => user.username.toLowerCase() == args.join(" ").toLowerCase()) ||
        bot.users.cache.find(user => user.tag.toLowerCase() == args.join(" ").toLowerCase()));

    if(!member) member = message.member;

}

module.exports.help = {
    name: "test"
}