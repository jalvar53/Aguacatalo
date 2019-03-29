require('dotenv').config();
const commando = require ('discord.js-commando');

const DISABLE_GREETING = 'oe no_salude';
const ENABLE_GREETING = 'oe salude';
let isGreeting = true;

const getRandomItem = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const USER_NAMES = {
  '199728217869778945': ['media/sura.mp3'], // Aleochoam
  '157659095631921153': ['media/sabor.mp3'], // Eniqk
  '226762336747257856': ['media/healing.mp3'], // Segov
  '135869846423339008': ['molly.mp3', 'intro.mp3'], // Ramos
  '191754092706660352': ['ñengo.mp3', 'phoneDown.mp3', 'metralleta.mp3', 'ronco.mp3'], // Moreno
  '196011946011656192': ['media/chico.mp3'], // Chumbi
  '241737899098374144': ['cena.mp3', 'rko.mp3'], // Havoc
  '219232376067194883': ['media/gay.mp3'], // Padrino
};

const bot = new commando.Client({
  commandPrefix: 'oe ',
  owner: process.env.OWNER_ID,
});

bot.registry.registerGroups([
  ['random', 'Random'],
  ['music', 'Music'],
  ['util', 'Util'],
]);

bot.registry
  .registerCommandsIn(__dirname + '/commands')
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
  if(content == DISABLE_GREETING) isGreeting = false;
  if(content == ENABLE_GREETING) isGreeting = true;

  console.log('Message from: ' + username);
  console.log('Content: ' + message.content);
});

bot.on('voiceStateUpdate', async (oldUser, newUser) => {
  const id = newUser.user.id;
  const vChannel = newUser.voiceChannel;

  if(!isGreeting || !USER_NAMES[id] || newUser.user.id == bot.user.id) return;

  if (oldUser.voiceChannel) {
    oldUser.voiceChannel.leave();
  }

  if (vChannel != undefined && oldUser.voiceChannel != vChannel) {
    try {
      const connection = await vChannel.join();
      connection.playFile(getRandomItem(USER_NAMES[id]));
    }
    catch(error) {
      console.error(error);
    }
  }
});

bot.login(process.env.DISCORD_TOKEN);
