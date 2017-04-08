const Discord = require("discord.js");
const bot = new Discord.Client()

bot.on('message', (message) => {
    if (message == "ping") {
        // message.reply('pong')
        message.channel.sendMessage("pong")
    }
});

bot.login('Mjk5NzU5ODU1NTg0MTQ5NTA0.C8ip3Q.VQQPa9JsuABmx2-bA4UL6DPaTjA')