require('dotenv').config();
const commando = require ('discord.js-commando');

const getRandomItem = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const USER_NAMES = {
  aleochoam: ['media/sura.mp3'],
  eniqk: ['media/sabor.mp3'],
  segoviano: ['media/sabor.mp3'],
  david: ['molly.mp3', 'intro.mp3'],
  mornin: ['ñengo.mp3', 'phoneDown.mp3', 'metralleta.mp3', 'ronco.mp3'],
  chumbi: ['media/chico.mp3'],
  havoc_42: ['cena.mp3', 'rko.mp3'],
  padrinolopez: ['media/gay.mp3'],
};

const bot = new commando.Client({
  commandPrefix: 'oe ',
  owner: process.env.OWNER_ID,
});

bot.registry.registerGroups([
  ['random', 'Random'],
  ['music', 'Add'],
  ['util', 'Leave'],
]);

bot.registry.registerCommandsIn(__dirname + '/commands')
  .registerDefaults();

bot.on('ready', () => {
  console.log('Kongo Master is ready!');
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

bot.on('voiceStateUpdate', async (oldUser, newUser) => {
  if(newUser.user.username == bot.user.username) return;

  const username = newUser.user.username.toLowerCase();
  const vChannel = newUser.voiceChannel;

  if (oldUser.voiceChannel) {
    oldUser.voiceChannel.leave();
  }

  if (vChannel != undefined && oldUser.voiceChannel != vChannel) {
    try {
      const connection = await vChannel.join();
      if(USER_NAMES[username]) {
        // connection.playFile(getRandomItem(USER_NAMES[username]));
        // vChannel.leave();
      }
    }
    catch(error) {
      console.error(error);
    }
  }
});

bot.login(process.env.DISCORD_TOKEN);
