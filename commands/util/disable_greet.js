const commando = require('discord.js-commando');

class DisableGreetCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'no_salude',
      group: 'util',
      memberName: 'no_salude',
      description: 'Tells Otto to not greet',
    });
  }

  async run(message) {
    message.channel.send('Ok');
  }
}

module.exports = DisableGreetCommand;
