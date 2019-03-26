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
    this.queue = [];
  }

  async run(message, args) {
    const streamOptions = { seek: 0, volume: 1 };
    const connection = await message.member.voiceChannel.join();
    const pattern = new RegExp('(https?://)*(www.)?youtube.com/(.*)');
    const pattern2 = new RegExp('(https*://)*(www.){0,1}youtu.be/(.*)');
    let song;
    let stream;
    if (pattern.test(args) || pattern2.test(args)) {
      stream = ytdl(args, { filter : 'audioonly' });
      song = args;
    }
    else{
      await YTSearch({ key: process.env.GOOGLE_KEY, term: args }, (videos) => {
        stream = ytdl('https://www.youtube.com/watch?v=' + videos[0].id.videoId,
        { filter : 'audioonly' });
        song = videos[0].snippet.title;
      });
    }
    //this.queue.push({stream, song});
    //if(this.queue.length > 1) {
      message.channel.sendMessage('Playing: ' + song);
      connection.playStream(stream, streamOptions);
    //}
  }
}

module.exports = YouTubePlayer;
