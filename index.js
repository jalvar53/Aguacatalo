require('dotenv').config();
const commando = require ('discord.js-commando');

const bot = new commando.Client({
  commandPrefix: 'cucho ',
  owner: process.env.OWNER_ID,
});


bot.registry.registerGroups([
  ['util', 'Leave'],
]);

bot.registry.registerCommandsIn(__dirname + '/commands')
  .registerDefaults();

bot.on('ready', () => {
  console.log('Aguacatalo melo!');
});

bot.on('error', (ex) => {
  console.error('ERROR ' + ex);
});

bot.on('message', message => {
  const username = message.author.username;
  const content = message.content;

  if(!content.startsWith(bot.commandPrefix)) return;

  console.log('Message from: ' + username);
  console.log('Content: ' + message.content);
});

bot.on('voiceStateUpdate', (oldUser, newUser) => {
  if(newUser.user.username == bot.user.username) return;

  const username = newUser.user.username.toLowerCase();
  const vChannel = newUser.voiceChannel;

  if (oldUser.voiceChannel) {
    oldUser.voiceChannel.leave();
  }

  if (vChannel != undefined && oldUser.voiceChannel != vChannel) {
    vChannel.join()
      .then(connection => {
        if (username == 'aleochoam') {
          connection.playFile('media/sura.mp3');
        }
        else if (username == 'eniqk') {
          connection.playFile('media/healing.mp3');
        }
        else if (username == 'segov') {
          connection.playFile('media/sabor.mp3');
        }
        else if (username == 'david') {
          const opciones = ['molly.mp3', 'intro.mp3'];
          connection.playFile('media/' + getRandomItem(opciones));
        }
        else if (username == 'mornin') {
          const opciones = ['ñengo.mp3', 'phoneDown.mp3', 'metralleta.mp3', 'ronco.mp3'];
          connection.playFile('media/' + getRandomItem(opciones));
        }
        else if (username == 'chumbi') {
          connection.playFile('media/chico.mp3');
        }
        else if (username == 'havoc_42') {
          const opciones = ['cena.mp3', 'rko.mp3'];
          connection.playFile('media/' + getRandomItem(opciones));
        }
        else if (username == 'padrinolopez') {
          connection.playFile('media/gay.mp3');
        }

        // vChannel.leave();
      })
      .catch(console.error);
  }
});

bot.login(process.env.DISCORD_TOKEN);

function getRandomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}
