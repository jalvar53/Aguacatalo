const AWS = require('aws-sdk');
const fs = require('fs');
const commando = require('discord.js-commando');

class SpeakCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'diga',
      group: 'util',
      memberName: 'diga',
      description: 'Convierte texto en audio',
    });
  }

  async run(message) {
    message.member.voice.channel.join()
      .then(connection => this.createFileFromPolly(message.argString, connection));
  }

  createFileFromPolly(message, connection) {
    // Create a new AWS Polly object
    const polly = new AWS.Polly();

    const params = {
      OutputFormat: 'mp3',
      Text: message,
      Engine: 'standard',
      VoiceId: 'Lupe',
    };

    const synthCallback = function(err, data) {
      if (err) {
        console.log(err, err.stack);
        return;
      }

      fs.writeFile('output.mp3', data.AudioStream, function(err) {
        if (err) {
          console.log('An error occurred while writing the file.');
          console.log(err);
          return;
        }
        console.log('Finished writing the file to the filesystem');
        connection.play('output.mp3', { seek: 0, volume: 1 });
      });
    };

    polly.synthesizeSpeech(params, synthCallback);

  }
}

module.exports = SpeakCommand;
