const YTSearch = require("youtube-api-search");

const commando = require("discord.js-commando");
const ytdl = require('ytdl-core');

const API_KEY = "AIzaSyAVtW40Z_ZWJM99KUg_xQ3reoRMQbNXAQE";

class YouTubePlayer extends commando.Command {
    constructor(client){
        super(client, {
            name: 'zumbe',
            group: 'music',
            memberName: 'zumbe',
            description: "reproduce tu tema de youtube"
        });
    }
    

    async run(message, args){
        const streamOptions = { seek: 0, volume: 1 };

        message.member.voiceChannel.join().then(connection => {
            var pattern = new RegExp("(https*:\/\/)*(www.){0,1}youtube.com\/(.*)")
            var pattern2 = new RegExp("(https*:\/\/)*(www.){0,1}youtu.be\/(.*)")

            if (pattern.test(args) || pattern2.test(args)) {
                console.log("IF")
                const stream = ytdl(args, {filter : 'audioonly'});
                const dispatcher = connection.playStream(stream, streamOptions);
                message.channel.sendMessage("ZuMbAnDo: " + args)
            }else{
                YTSearch({key: API_KEY, term: args}, (videos) => {
                     const stream = ytdl('https://www.youtube.com/watch?v='+videos[0].id.videoId,
                        {filter : 'audioonly'});
                     const dispatcher = connection.playStream(stream, streamOptions);
                     message.channel.sendMessage("ZuMbAnDo: " + videos[0].snippet.title)
                });
            }
        })
    }

}

module.exports = YouTubePlayer;
