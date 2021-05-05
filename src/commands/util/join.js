const commando = require('discord.js-commando');

class JoinCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'venga',
      group: 'util',
      memberName: 'venga',
      description: 'Tells Aguacatalo to join voice channel',
    });
  }

  async run(message) {
    message.member.voiceChannel.join();
  }
}

module.exports = JoinCommand;
