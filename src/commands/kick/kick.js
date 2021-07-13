const commando = require('discord.js-commando');
const discord = require('discord.js');

class KickCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      group: 'management',
      memberName: 'kick',
      description: 'Inicia votación para sacar a alguien del canal',
    });
  }

  async run(message) {
    const approveEmoji = '👌'
    const declineEmoji = '❌'

    const memberTarget = message.mentions.members.first();
    const voiceChannel = memberTarget.voice.channel

    if (!message.member.hasPermission('KICK_MEMBERS'))
      return message.reply('No tienes permiso para este comando, perdedor',);

    if (!memberTarget)
      return message.channel.send('Por favor menciona a quien quieres sacar');

    if (!voiceChannel)
      return message.channel.send(`${memberTarget} no está en chat de voz`);

    await message.delete();

    const repVoteEmbed = new discord.MessageEmbed();
    repVoteEmbed.setTitle(`Cuantos para kickear a ${memberTarget.displayName}?`);
    repVoteEmbed.setDescription(`F1?`);
    repVoteEmbed.setFooter(`\nIniciado por: ${message.author.username}`);
    const pollMessage = await message.channel.send(repVoteEmbed);

    await pollMessage.react(approveEmoji);
    await pollMessage.react(declineEmoji);

    const filter = reaction => {
      return reaction.emoji.name === approveEmoji || reaction.emoji.name === declineEmoji
    }

    const results = await pollMessage.awaitReactions( filter, { time: 10000 })

    const approvals = results.get(approveEmoji).count - 1

    if (approvals > voiceChannel.members.size / 2) {
      memberTarget.voice
        .kick()
        .then((member) => message.channel.send(`${member} suerte gonorrea`))
        .catch(console.error);
    } else {
      message.channel.send(`${memberTarget} te salvaste puto`);
    }
  };
}

module.exports = KickCommand;
