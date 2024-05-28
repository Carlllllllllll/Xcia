const { Riffy } = require("riffy");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType } = require("discord.js");
const { queueNames } = require("./commands/play"); 
const fs = require("fs");
const { Classic } = require("musicard");

function initializePlayer(client) {
    const nodes = [
        {
            host: "lava-v4.ajieblogs.eu.org",
            port: 80, 
            password: "https://dsc.gg/ajidevserver", 
            secure: false
          },
        {
            host: "lavalink.oryzen.xyz",
            port: 80, 
            password: "oryzen.xyz", 
            secure: false
          },
    ];

    client.riffy = new Riffy(client, nodes, {
        send: (payload) => {
            const guildId = payload.d.guild_id;
            if (!guildId) return;

            const guild = client.guilds.cache.get(guildId);
            if (guild) guild.shard.send(payload);
        },
        defaultSearchPlatform: "spsearch",
        restVersion: "v4"
    });

    client.riffy.on("nodeConnect", node => {
        console.log(`Node "${node.name}" connected.`);
    });

    client.riffy.on("nodeError", (node, error) => {
        console.error(`Node "${node.name}" encountered an error: ${error.message}.`);
    });

    client.riffy.on("trackStart", async (player, track) => {
        const channel = client.channels.cache.get(player.textChannel);
   
        const musicard = await Classic({
            thumbnailImage: track.info.thumbnail,
            backgroundColor: "#070707",
            backgroundImage: "https://cdn.discordapp.com/attachments/1220001571228880917/1220001571690123284/01.png?ex=660d5a01&is=65fae501&hm=a8cfb44844e61aa0fd01767cd363af048df28966c30d7b04a59f27fa45cf69c4&",
            nameColor: "#21152b",
            name: track.info.title,
            progressColor: "#21152b",
            progressBarColor: "#21152b",
            author: `By ${track.info.author}`,
            authorColor: "#21152b",
            startTime: "0:00",
            endTime: "4:00",
            timeColor: "#21152b"
        });
    
        fs.writeFileSync("musicard.png", musicard);
        const details = `<a:arrow:1215601724341878815> **Title:** [${track.info.title}](${track.info.uri})\n` +
        `<a:arrow:1215601724341878815> **Author:** ${track.info.author}\n` +
        `<a:arrow:1215601724341878815> **Info:** The Bot Will Leave After The Song/Queue Is Ended.`
    
        const embed = new EmbedBuilder()
            .setColor("#21152b")
            .setAuthor({
                name: 'Now Playing',
                iconURL: 'https://cdn.discordapp.com/attachments/1140841446228897932/1144671132948103208/giphy.gif', 
                url: 'https://discord.gg/xQF9f9yUEM'
              })
            .setDescription(details)
            .setImage("attachment://musicard.png")
            .setTimestamp()
            .setFooter({ text: 'Xcia Music'});

        const queueLoopButton = new ButtonBuilder()
            .setCustomId("loopQueue")
            .setLabel("Loop Queue")
            .setStyle(ButtonStyle.Primary);

        const disableLoopButton = new ButtonBuilder()
            .setCustomId("disableLoop")
            .setLabel("Disable Loop")
            .setStyle(ButtonStyle.Primary);

        const skipButton = new ButtonBuilder()
            .setCustomId("skipTrack")
            .setLabel("Skip")
            .setStyle(ButtonStyle.Success);

        const showQueueButton = new ButtonBuilder()
            .setCustomId("showQueue")
            .setLabel("Show Queue")
            .setStyle(ButtonStyle.Primary);
        const clearQueueButton = new ButtonBuilder()
            .setCustomId("clearQueue")
            .setLabel("Clear Queue")
            .setStyle(ButtonStyle.Danger);

    
        const actionRow = new ActionRowBuilder()
            .addComponents(queueLoopButton,  disableLoopButton, showQueueButton, clearQueueButton , skipButton);

       
        const message = await channel.send({ embeds: [embed], components: [actionRow], files: ["musicard.png"] });

      
        const filter = i => i.customId === 'loopQueue' || i.customId === 'skipTrack' || i.customId === 'disableLoop' || i.customId === 'showQueue' || i.customId === 'clearQueue';
        const collector = message.createMessageComponentCollector({ filter, time: 180000 });
        setTimeout(() => {
            const disabledRow = new ActionRowBuilder()
                .addComponents(
                    queueLoopButton.setDisabled(true),
                    disableLoopButton.setDisabled(true),
                    skipButton.setDisabled(true),
                    showQueueButton.setDisabled(true),
                    clearQueueButton.setDisabled(true)
                );
        
          
            message.edit({ components: [disabledRow] })
                .catch(console.error);
        }, 180000);
        collector.on('collect', async i => {
            await i.deferUpdate();
            if (i.customId === 'loopQueue') {
                setLoop(player, 'queue');
                const loopEmbed = new EmbedBuilder()
            .setAuthor({
                    name: 'Loop!',
                    iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157318080670728283/7905-repeat.gif?ex=66383bb4&is=6636ea34&hm=65f37cf88245f1c09285b547fda57b82828b3bbcda855e184f446d6ff43756b3&', 
                    url: 'https://discord.gg/P47geahQ4Z'
                })
            .setColor("#00FF00")
            .setTitle("**Loop Hoga Abb**")
         

        await channel.send({ embeds: [loopEmbed] });
            } else if (i.customId === 'skipTrack') {
                player.stop();
                const skipEmbed = new EmbedBuilder()
                .setColor('#3498db')
                .setAuthor({
                  name: 'Song Skipped',
                  iconURL: 'https://cdn.discordapp.com/attachments/1156866389819281418/1157269773118357604/giphy.gif?ex=6517fef6&is=6516ad76&hm=f106480f7d017a07f75d543cf545bbea01e9cf53ebd42020bd3b90a14004398e&',
                  url: 'https://discord.gg/FUEHs7RCqz'
                })
            .setTitle("**Skipped, Now Time Travelling**")
            .setTimestamp()
               
    
            await channel.send({ embeds: [skipEmbed] });
            } else if (i.customId === 'disableLoop') {
                setLoop(player, 'none');
                const loopEmbed = new EmbedBuilder()
                .setColor("#0099ff")
                .setAuthor({
                    name: 'Looping Off',
                    iconURL: 'https://cdn.discordapp.com/attachments/1230824451990622299/1230836684774576168/7762-verified-blue.gif?ex=6638b97d&is=663767fd&hm=021725868cbbc66f35d2b980585489f93e9fd366aa57640732dc49e7da9a80ee&', 
                    url: 'https://discord.gg/P47geahQ4Z'
                })
                .setDescription('**Loop Disabled, Abb Nahi Hoga Loop**');
                  
    
            await channel.send({ embeds: [loopEmbed] });
            } else if (i.customId === 'showQueue') {

const pageSize = 10; 

const queueMessage = queueNames.length > 0 ?
    queueNames.map((song, index) => `${index + 1}. ${song}`).join('\n') :
    "Gaana Toh Chalao Bhai";


const pages = [];
for (let i = 0; i < queueNames.length; i += pageSize) {
    const page = queueNames.slice(i, i + pageSize);
    pages.push(page);
}

for (let i = 0; i < pages.length; i++) {
    const numberedSongs = pages[i].map((song, index) => `${index + 1}. ${song}`).join('\n');

    const queueEmbed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle(`<a:bow:1207744049566711910> Current Queue (Page ${i + 1}/${pages.length})`)
        .setDescription(numberedSongs);

    await channel.send({ embeds: [queueEmbed] });
}

            } else if (i.customId === 'clearQueue') {
                clearQueue(player);
                const queueEmbed = new EmbedBuilder()
                .setColor("#0099ff")
                .setAuthor({
                    name: 'Queue Cleared',
                    iconURL: 'https://cdn.discordapp.com/attachments/1230824451990622299/1230836684774576168/7762-verified-blue.gif?ex=6638b97d&is=663767fd&hm=021725868cbbc66f35d2b980585489f93e9fd366aa57640732dc49e7da9a80ee&', 
                    url: 'https://discord.gg/P47geahQ4Z'
                })
                .setDescription('**Purged Queue**');
               
    
            await channel.send({ embeds: [queueEmbed] });
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions.`);
        });
    });

client.riffy.on("queueEnd", async (player) => {
    const channel = client.channels.cache.get(player.textChannel);
    const autoplay = false;

    setTimeout(async () => {
        if (autoplay) {
            player.autoplay(player);
        } else {
            player.destroy();
            const queueEmbed = new EmbedBuilder()
                .setColor("#0099ff")
                .setDescription('**Gaana Khatam Abb Mai Jata Sir**');
            
            await channel.send({ embeds: [queueEmbed] });
        }
    }, 8000);
});
  
    function setLoop(player, loopType) {
        if (loopType === "queue") {
            player.setLoop("queue");
        } else {
            player.setLoop("none");
        }
    }

  
    function clearQueue(player) {
        player.queue.clear();
        queueNames.length = 0; 
    }

    
    function showQueue(channel, queue) {
        const queueList = queue.map((track, index) => `${index + 1}. ${track.info.title}`).join('\n');
        const queueEmbed = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle("Queue")
            .setDescription(queueList);
        channel.send({ embeds: [queueEmbed] });
    }

    module.exports = { initializePlayer, setLoop, clearQueue, showQueue };
}

module.exports = { initializePlayer };
