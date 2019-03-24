const YTSearch = require('youtube-api-search');

const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');

class YouTubePlayer extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'add',
      group: 'music',
      memberName: 'add',
      description: 'reproduce tu tema de youtube',
    });
  }

  async run(message, args) {
    const streamOptions = { seek: 0, volume: 1 };

    message.member.voiceChannel.join().then(connection => {
      const pattern = new RegExp('(https?://)*(www.)?youtube.com/(.*)');
      const pattern2 = new RegExp('(https*://)*(www.){0,1}youtu.be/(.*)');

      if (pattern.test(args) || pattern2.test(args)) {
        const stream = ytdl(args, { filter : 'audioonly' });
        connection.playStream(stream, streamOptions);
        message.channel.sendMessage('Playing: ' + args);
      }
      else{
        YTSearch({ key: process.env.GOOGLE_KEY, term: args }, (videos) => {
          const stream = ytdl('https://www.youtube.com/watch?v=' + videos[0].id.videoId,
            { filter : 'audioonly' });

          connection.playStream(stream, streamOptions);
          message.channel.sendMessage('Playing: ' + videos[0].snippet.title);
        });
      }
    });
  }
}

module.exports = YouTubePlayer;
