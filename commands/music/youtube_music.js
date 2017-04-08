const commando = require("discord.js-commando");

class YouTubePlayer extends commando.Command {
    constructor(client){
        super(client, {
            name: 'kongoyt',
            group: 'music',
            memberName: 'kongoyt',
            description: "reproduce tu tema de youtube"
        });
    }

    async run(message, args){
        message.member.voiceChannel.join((error, connection) => {
            if (error) {
                message.reply("No me pude conectar: " + error)
            } else {
                message.reply("Aca estoy: "+ connection)
            }
            
        })
    }
}

module.exports = YouTubePlayer;