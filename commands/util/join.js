const commando = require('discord.js-commando');

class JoinCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'join',
      group: 'util',
      memberName: 'join',
      description: 'Tells Otto to join voice channel',
    });
  }

  async run(message) {
    message.member.voiceChannel.join();
  }
}

module.exports = JoinCommand;
