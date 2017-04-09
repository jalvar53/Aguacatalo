const commando = require("discord.js-commando");
const ytdl = require('ytdl-core');

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
            const stream = ytdl(args,
                {filter : 'audioonly'});

            const dispatcher = connection.playStream(stream, streamOptions);
        })
    }
}

module.exports = YouTubePlayer;

