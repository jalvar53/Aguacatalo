const commando = require('discord.js-commando');

class EnableGreetCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'salude',
      group: 'util',
      memberName: 'salude',
      description: 'Tells Otto to greet',
    });
  }

  async run(message) {
    message.channel.send('Ok');
  }
}

module.exports = EnableGreetCommand;
