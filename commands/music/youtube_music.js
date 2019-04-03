const { YouTube } = require('better-youtube-api');
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
    this.youtube = new YouTube(process.env.GOOGLE_KEY);
    this.long_url_pattern = new RegExp('(https?://)*(www.)?youtube.com/(.*)');
    this.short_url_patter = new RegExp('(https*://)*(www.){0,1}youtu.be/(.*)');
  }

  async run(message, args) {
    const streamOptions = { seek: 0, volume: 1 };
    const connection = await message.member.voiceChannel.join();
    let video;

    if (this.long_url_pattern.test(args) || this.short_url_patter.test(args)) {
      video = await this.youtube.getVideoByUrl(args);
    }
    else{
      const videos = await this.youtube.search('video', args, 1);
      video = videos[0];
    }

    // this.queue.push({stream, song});
    // if(this.queue.length > 1) {
    const song = video.title;
    const stream = ytdl(video.url, { filter : 'audioonly' });
    message.channel.send('Playing: ' + song);
    connection.playStream(stream, streamOptions);
    // }
  }
}

module.exports = YouTubePlayer;
