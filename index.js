const discord = require("discord.js");
const botConfig = require("./botConfig.json");
const fs = require("fs");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.help.name, command);

    console.log(`${command.help.name} is geladen!`)

}

client.once("ready", () => {
    console.log(`${client.user.username} is online!`);
    client.user.setActivity("Almelo Overijssel", { type: "PLAYING" });
});

client.on("guildMemberAdd" , member => {
 
    var role =  member.guild.roles.cache.get("793840906016784474");
  
    if (!role) return;
  
    member.roles.add(role);
  
    var channel = member.guild.channels.cache.get("806810000386162738");

    if(!channel) return;
  
    channel.send(` Welkom ${member} in **Alemlo Overijssel**! Veel Roleplay plezier!`);
  
 });

client.on("messageCreate", async message => {

    if (message.author.bot) return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    const commandData = client.commands.get(command.slice(prefix.length));

    if (!commandData) return;

    var arguments = messageArray.slice(1);

    try {

        await commandData.run(client, message, arguments);

    } catch (error) {
        console.log(error);
        await message.reply(`**Er is een probleem opgetreden!** '*${error}*'`);
    }

});

client.login(env.procces.token)