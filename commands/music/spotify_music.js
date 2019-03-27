const { YouTube } = require('better-youtube-api');
const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');
const SpotifyWebApi = require('spotify-web-api-node');

function slicePlaylistId(uri) {
  return uri.split(':').pop();
}

function enqueueSongs(body) {
  return body['tracks']['items'].map(track => {
    return track['track']['name'] + ' - ' + track['track']['artists'][0]['name'];
  });
}

class SpotifyPlayer extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'spotify',
      group: 'music',
      memberName: 'spotify',
      description: 'reproduce tu playlist de Spotify',
    });

    this.queue = [];
    this.youtube = new YouTube(process.env.GOOGLE_KEY);
    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      redirectUri: 'http://localhost:3000/',
    });
  }

  async run(message, args) {
    message.channel.send('Please wait, downloading the songs...');
    const playlistId = slicePlaylistId(args);

    try {
      const credentialsData = await this.spotifyApi.clientCredentialsGrant();
      this.spotifyApi.setAccessToken(credentialsData.body['access_token']);

      const playlistData = await this.spotifyApi.getPlaylist(playlistId);
      const queue = enqueueSongs(playlistData.body);

      const videos = [];
      for (let i = 0; i < Math.min(queue.length, 10); i++) {
        const results = await this.youtube.search('video', args, 1);
        if(results.length == 0) continue;

        await message.channel.send('Downloading ' + i + ' of ' + queue.length);
        const stream = ytdl(results[0].url, { filter : 'audioonly' });
        videos.push(stream);
      }

      const connection = await message.member.voiceChannel.join();
      connection.playStream(videos[0], { seek: 0, volume: 1 });
    }
    catch (error) {
      message.channel.send('Something went wrong:' + error);
    }
  }
}

module.exports = SpotifyPlayer;
