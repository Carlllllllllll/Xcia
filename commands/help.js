const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB"); // Replace with your mongoDB interaction

const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "help",
  description: "Get information about bot and commands.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const musicCommandsEmbed = new EmbedBuilder()
        .setColor(client.config.embedColor) // Replace with your embed color
        .setTitle('  ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎<a:poll:1218153303993487373> **Commands** <a:poll:1218153303993487373>')
        .addFields(
          { name: '<a:list:1215605657856770068> Play <a:list:1215605657856770068>', value: '<a:arrow:1215601724341878815> Play A Song By Text' },
          { name: '<a:list:1215605657856770068> Stop <a:list:1215605657856770068>', value: '<a:arrow:1215601724341878815> Stops The Music' },
          { name: '<a:list:1215605657856770068> Queue <a:list:1215605657856770068>', value: '<a:arrow:1215601724341878815> View Song List/Queue' },
          { name: '<a:list:1215605657856770068> Skip <a:list:1215605657856770068>', value: '<a:arrow:1215601724341878815> Skip The Purrent Playing Song' },
          { name: '<a:list:1215605657856770068> Pause <a:list:1215605657856770068>', value: '<a:arrow:1215601724341878815> Pause The Currently Playing Song' },
          { name: '<a:list:1215605657856770068> Resume <a:list:1215605657856770068>', value: '<a:arrow:1215601724341878815> Resume The Current Paused Song' },
          { name: '<a:list:1215605657856770068> Loop <a:list:1215605657856770068>', value: '<a:arrow:1215601724341878815> Toggle Loop Mode For Queue Or Current Song' },
          { name: '<a:list:1215605657856770068> Autoplay <a:list:1215605657856770068>', value: '<a:arrow:1215601724341878815> Enable Or Disable Autoplay [Play Random Songs]' },
          { name: '<a:list:1215605657856770068> Seek <a:list:1215605657856770068>', value: '<a:arrow:1215601724341878815> Seek To A Specific Time In The Current Song' },
          { name: '<a:list:1215605657856770068> Previous <a:list:1215605657856770068>', value: '<a:arrow:1215601724341878815> Play The Previous Song Again' },
          { name: '<a:list:1215605657856770068> Shuffle <a:list:1215605657856770068>', value: '<a:arrow:1215601724341878815> Shuffle The Songs In Queue' },
          { name: '<a:list:1215605657856770068> Ping <a:list:1215605657856770068>', value: "<a:arrow:1215601724341878815> Check The Bot's Ping According To The User" },
          { name: '<a:list:1215605657856770068> Clear <a:list:1215605657856770068>', value: '<a:arrow:1215601724341878815> Clear The Song Queue' },
          { name: '<a:list:1215605657856770068> Time <a:list:1215605657856770068>', value: '<a:arrow:1215601724341878815> Display The Current Song Playback Time' },
          { name: '<a:list:1215605657856770068> Filter <a:list:1215605657856770068>', value: '<a:arrow:1215601724341878815> Apply Filters To Enhance The Sound As You Love' },
          { name: '<a:list:1215605657856770068> Now Playing <a:list:1215605657856770068>', value: '<a:arrow:1215601724341878815> Display The Currently Playing Song Information' },
          { name: '<a:list:1215605657856770068> Volume <a:list:1215605657856770068>', value: '<a:arrow:1215601724341878815> Adjust The Music Volume' },
        )
        .setImage(`https://cdn.discordapp.com/attachments/1004341381784944703/1165201249331855380/RainbowLine.gif?ex=6607c9ba&is=65f554ba&hm=2a4a1f0178b6dfa353502a471586c5acdaec0e2e1b7ab80ce44b27156b44d95e&`);

      interaction.reply({
        embeds: [musicCommandsEmbed]
      }).catch(e => {});
    } catch (e) {
      console.error(e);
    }
  },
};
