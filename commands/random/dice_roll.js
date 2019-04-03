const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'roll',
      group: 'random',
      memberName: 'roll',
      description: 'Roll a dice',
    });
  }

  async run(message) {
    const number = Math.floor((Math.random() * 6) + 1);
    message.channel.send('Your number is: ' + number);
  }
}

module.exports = DiceRollCommand;