const commando = require ('discord.js-commando');

const bot = new commando.Client();

bot.registry.registerGroups([
    ['random', "Random"],
    ['music', "Zumbe"]
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

bot.on('voiceStateUpdate', (oldUser, newUser) => {
  var user = newUser.user
  var vChannel = newUser.voiceChannel

  if (user.username == "aleochoam") {
      if (oldUser.voiceChannel) {
        oldUser.voiceChannel.leave()
      }
      
      if (newUser.voiceChannel.name) {
          // user.send("Hola " + user.username + " bienvenido al canal " + newUser.voiceChannel.name);
          vChannel.join().then(connection => {
            const dispatcher = connection.playFile("media/admin.mp3")
          })
          vChannel.leave()
      }
  }
});

bot.login('Mjk5NzU5ODU1NTg0MTQ5NTA0.C8ip3Q.VQQPa9JsuABmx2-bA4UL6DPaTjA')