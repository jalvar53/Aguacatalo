const commando = require('discord.js-commando');

class LeaveCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'leave',
      group: 'util',
      memberName: 'leave',
      description: 'Kicks Otto from voice channel',
    });
  }

  async run(message) {
    message.member.voiceChannel.leave();
  }
}

module.exports = LeaveCommand;
