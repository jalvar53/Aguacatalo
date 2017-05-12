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

        if (username == "Dyno") {
            var opciones = ["Shhhhh Dyno", "Por que no me usan a mi :(", "Yo tambien puedo", "A el Dyno nana", "Severo punchispum"]
            var rand = opciones[Math.floor(Math.random() * opciones.length)];
            message.channel.sendMessage(rand);
        }
    });

    bot.on('voiceStateUpdate', (oldUser, newUser) => {
        var username = newUser.user.username.toLowerCase()
        var vChannel = newUser.voiceChannel

      
        if (oldUser.voiceChannel && vChannel != undefined) {
          oldUser.voiceChannel.leave()
        }

        console.log(vChannel)
        if (vChannel != undefined) {
            vChannel.join().then(connection => {
              if (username== "aleochoam") {
                const dispatcher = connection.playFile("media/admin.mp3")
              }else if (username == "eniqk") {
                const dispatcher = connection.playFile("media/healing.mp3")
              }else if (username == "segov") {
                var opciones = ["cena.mp3", "sabor.mp3"]
                const dispatcher = connection.playFile("media/" + getRandomItem(opciones))
              }else if (username == "david") {
                var opciones = ["molly.mp3", "intro.mp3"]
                const dispatcher = connection.playFile("media/" + getRandomItem(opciones))
              }else if (username == "mornin") {
                var opciones = ["ñengo.mp3", "phoneDown.mp3", "metralleta.mp3", "ronco.mp3"]
                const dispatcher = connection.playFile("media/" + getRandomItem(opciones))
              }else if (username == "chumbi") {
                const dispatcher = connection.playFile("media/chico.mp3")
              }else if (username == "havoc_42") {
                const dispatcher = connection.playFile("media/rko.mp3")
              }
            })
            vChannel.leave()
        }
    });

    bot.login('Mjk5NzU5ODU1NTg0MTQ5NTA0.C8ip3Q.VQQPa9JsuABmx2-bA4UL6DPaTjA')

}catch(err){
    console.log(err)
}

function getRandomItem(list) {
    return list[Math.floor(Math.random()*list.length)];
}