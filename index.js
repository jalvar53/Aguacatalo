const commando = require ('discord.js-commando');

const bot = new commando.Client();

bot.registry.registerGroups([
    ['random', "Random"],
    ['music', "Zumbe"],
    ['util', "Abrase"]
    ]);
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands")

bot.on('ready', () => {
  console.log('Kongo Master is ready!');
});

try{
    bot.on('message', message => {
        const username = message.author.username

        console.log("LOG: Mensaje recibido de " + message.author.username)
        if (username == "Dyno") {
            var myArray = ["Shhhhh Dyno", "Por que no me usan a mi :(", "Yo tambien puedo", "A el Dyno nana"]
            var rand = myArray[Math.floor(Math.random() * myArray.length)];
            message.channel.sendMessage(rand);
        }
    });

    bot.on('voiceStateUpdate', (oldUser, newUser) => {
        var username = newUser.user.username.toLowerCase()
        var vChannel = newUser.voiceChannel

      
        if (oldUser.voiceChannel) {
          oldUser.voiceChannel.leave()
        }

        if (vChannel) {
            vChannel.join().then(connection => {
              if (username== "aleochoam") {
                const dispatcher = connection.playFile("media/admin.mp3")
              }else if (username == "eniqk") {
                const dispatcher = connection.playFile("media/healing.mp3")
              }else if (username == "segov") {
                const dispatcher = connection.playFile("media/cena.mp3")
              }
            })
            vChannel.leave()
        }
    });

    bot.login('Mjk5NzU5ODU1NTg0MTQ5NTA0.C8ip3Q.VQQPa9JsuABmx2-bA4UL6DPaTjA')

}catch(err){
    console.log(err)
}
