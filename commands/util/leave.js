const commando = require('discord.js-commando');

class LeaveCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'suerte',
      group: 'util',
      memberName: 'suerte',
      description: 'Kicks Aguacatalo from voice channel',
    });
  }

  async run(message) {
    message.member.voice.channel.leave();
  }
}

module.exports = LeaveCommand;
