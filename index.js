const commando = require ('discord.js-commando');

const bot = new commando.Client();

bot.registry.registerGroups([
    ['random', "Random"],
    ['music', "KongoYT"]
    ]);
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands")

bot.on('ready', () => {
  console.log('Kongo Master is ready!');
});

bot.on('message', message => {
    const username = message.author.username

    console.log("LOG: Mensaje recibido de " + message.author.username)
    if (username !== 'aleochoam' &&
        username !== 'Otto' &&
        message.channel.name == "pruebas") {
        
        message.channel.sendMessage("Shhhhh " + username + ", estoy en pruebas");
    }
});

bot.login('Mjk5NzU5ODU1NTg0MTQ5NTA0.C8ip3Q.VQQPa9JsuABmx2-bA4UL6DPaTjA')