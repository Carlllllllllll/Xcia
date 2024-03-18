const db = require("../../mongoDB");
const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, song) => {
  if (queue) {
    if (!client.config.opt.loopMessage && queue?.repeatMode !== 0) return;
    if (queue?.textChannel) {
      const embed = new EmbedBuilder()
      .setAuthor({
        name: 'Currently playing a Track',
        iconURL: 'https://cdn.discordapp.com/attachments/1140841446228897932/1144671132948103208/giphy.gif', 
        url: 'https://discord.gg/Qs58Zxpa'
    })
    .setDescription(`\n ‎ \n<a:list:1215605657856770068> **Details :** **${song?.name}**\n<a:list:1215605657856770068> **Enjoy The Ultimate Music Experience By Xcia ** \n<a:list:1215605657856770068> **Made With Love By Lazy Xmo**`)
.setImage(queue.songs[0].thumbnail)
    .setColor('#FF0000')
    .setFooter({ text: 'More info - Made By notxmon Aka Lazy Xmo' });
     
      queue?.textChannel?.send({ embeds: [embed] }).catch(e => { });
    }
  }
}

