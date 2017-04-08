const commando = require("discord.js-commando");

class DiceRollCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: 'roll',
            group: 'random',
            memberName: 'roll',
            description: "Roll a dice"
        });
    }

    async run(message, args){
        message.member.voiceChannel.leave()
    }
}

module.exports = DiceRollCommand;