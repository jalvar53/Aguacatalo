const commando = require("discord.js-commando");

class AbriseCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'abrase',
            group: 'util',
            memberName: 'abrase',
            description: "saca al Otto del canal"
        });
    }

    async run(message, args){
        message.channel.sendMessage("mmmmmmmmmmme abro")
        message.member.voiceChannel.leave()
    }
}

module.exports = AbriseCommand;
