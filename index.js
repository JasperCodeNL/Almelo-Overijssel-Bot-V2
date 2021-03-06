const discord = require("discord.js");
// const botConfig = require("./botConfig.json")

const fs = require("fs");

const client = new discord.Client();
client.commands = new discord.Collection();

client.login(process.env.token);

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Geen files gevonden!");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`${f} Is geladen!`);

        client.commands.set(fileGet.help.name, fileGet);

    })

});

client.on("ready", async () => {

    console.log(`${client.user.username} is online!`);
    client.user.setActivity("Almelo Overijssel V2", { type: "PLAYING" });

});

client.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get("793840906016784474");

    if (!role) return;

    member.roles.add(role);

    var channel = member.guild.channels.cache.get("806810000386162738");

    if (!channel) return;

    channel.send(` Welkom ${member} in **Almelo Overijssel**! Veel Roleplay plezier!`);

    var embed = new discord.MessageEmbed()
        .setTitle("Join Log Discord")
        .setDescription("Een speler is de server gejoined.")
        .setColor("GREEN")
        .setFooter("Logs")
        .setTimestamp()
        .addFields(
            { name: "Gebruiker:", value: `${member.user.tag} (${member.user.id})` },
        )

    client.channels.cache.get('889811265738919977').send(embed);

});

client.on("guildMemberRemove", member => {

    var embed = new discord.MessageEmbed()
        .setTitle("Leave Log Discord")
        .setDescription("Een speler is de server geleaved.")
        .setColor("RED")
        .setFooter("Logs")
        .setTimestamp()
        .addFields(
            { name: "Gebruiker:", value: `${member.user.tag} (${member.user.id})` },
        )

    client.channels.cache.get('889811265738919977').send(embed);

});

client.on("messageDelete", async messageDeleted => {

    if (messageDeleted.author.bot) return;

    var embed = new discord.MessageEmbed()
        .setTitle("Bericht Verwijderd")
        .setColor("BLUE")
        .setFooter("Logs")
        .setTimestamp()
        .addFields(
            { name: "Gebruiker:", value: `${messageDeleted.author.tag} (${messageDeleted.author.id})` },
            { name: "Kanaal:", value: `${messageDeleted.channel}` },
            { name: "Bericht:", value: `${messageDeleted.content}` }
        )

    client.channels.cache.get('889811265738919977').send(embed);

});

//j

client.on("messageUpdate", async (oldMessage, newMessage) => {

    if (newMessage.author.bot) return;

    if (oldMessage.content == newMessage.content) return;

    var embed = new discord.MessageEmbed()
        .setTitle("Bericht Bewerkt")
        .setColor("BLUE")
        .setFooter("Logs")
        .setTimestamp()
        .addFields(
            { name: "Gebruiker:", value: `${newMessage.author.tag} (${newMessage.author.id})` },
            { name: "Kanaal:", value: `${newMessage.channel}` },
            { name: "Voor:", value: `${oldMessage.content}` },
            { name: "Na:", value: `${newMessage.content}` }
        )

    client.channels.cache.get('889811265738919977').send(embed);

});

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type == "dm") return;

    var prefix = process.env.prefix

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    //  Command Handler
    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    if (commands) commands.run(client, message, arguments);

});