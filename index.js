const config = require('./config');
const commando = require ('discord.js-commando');

const bot = new commando.Client({
  commandPrefix: 'oe ',
  owner: '199728217869778945',
});


bot.registry.registerGroups([
  ['random', 'Random'],
  ['music', 'Add'],
  ['util', 'Abrase'],
]);

bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.on('ready', () => {
  console.log('Kongo Master is ready!');
});

bot.on('error', (ex) => {
  console.error('ERROR ' + ex);
});

bot.on('message', message => {
// const username = message.author.usernam e
  console.log(message.content);
});

bot.on('voiceStateUpdate', (oldUser, newUser) => {
  console.log(oldUser, newUser);
  // var username = newUser.user.username.toLowerCase()
  // var vChannel = newUser.voiceChannel


  // if (oldUser.voiceChannel) {
  //  oldUser.voiceChannel.leave()
  // }

  // if (vChannel != undefined && oldUser.voiceChannel != vChannel) {
  //     vChannel.join().then(connection => {
  //       if (username== 'aleochoam') {
  //         const dispatcher = connection.playFile('media/sura.mp3')
  //       }else if (username == 'eniqk') {
  //         const dispatcher = connection.playFile('media/healing.mp3')
  //       }else if (username == 'segov') {
  //         const dispatcher = connection.playFile('media/sabor.mp3')
  //       }else if (username == 'david') {
  //         var opciones = ['molly.mp3', 'intro.mp3']
  //         const dispatcher = connection.playFile('media/' + getRandomItem(opciones))
  //       }else if (username == 'mornin') {
  //         var opciones = ['ñengo.mp3', 'phoneDown.mp3', 'metralleta.mp3', 'ronco.mp3']
  //         const dispatcher = connection.playFile('media/' + getRandomItem(opciones))
  //       }else if (username == 'chumbi') {
  //         const dispatcher = connection.playFile('media/chico.mp3')
  //       }else if (username == 'havoc_42') {
  //         var opciones = ['cena.mp3', 'rko.mp3']
  //         const dispatcher = connection.playFile('media/' + getRandomItem(opciones))
  //       }else if (username == 'padrinolopez') {
  //         const dispatcher = connection.playFile('media/gay.mp3')
  //       }
  //     })
  //     vChannel.leave()
  // }
});

bot.login(config.token);

// function getRandomItem(list) {
//   return list[Math.floor(Math.random() * list.length)];
// }