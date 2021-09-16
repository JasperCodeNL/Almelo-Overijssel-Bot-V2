const discord = require("discord.js");
const botConfig = require("./botConfig.json")

const fs = require("fs");

const client = new discord.Client();
client.commands = new discord.Collection();

client.login(process.env.token);

fs.readdir("./commands/" , (err, files) => {

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles.length <=0) {
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
    client.user.setActivity("Almelo V2", {type: "PLAYING"});

});

client.on("message", async message => {

    if(message.author.bot) return;

    if(message.channel.type == "dm") return;

    var prefix = botConfig.prefix

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    if(commands) commands.run(client,message, arguments);

    if(command === `${prefix}hallo`){
        return message.channel.send("Hallo!");
    }

    try {

        await commandData.run(client, message, arguments);

    } catch (error) {
        console.log(error);
        await message.reply(`**Er is een probleem opgetreden!** '*${error}*'`);
    }

});