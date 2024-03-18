const config = require('./config.js');

if(config.shardManager.shardStatus == true){

const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: config.TOKEN || process.env.TOKEN });
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();


client.on('ready', async () => {
  console.log(`${client.user.tag} is online!`);
  client.user.setActivity('Xcia'); // Replace with the game name
client.user.setStatus('dnd');
});

} else {

require("./bot.js")

}
