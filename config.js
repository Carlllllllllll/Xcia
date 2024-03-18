module.exports = {
  TOKEN: "MTE5NzYwNTg2MjE1NjU1NDQ1NA.G1k0W6.qKtaG0s8SyLnTj9wJteRTVxqgI8WxReWhg88Cw",
  ownerID: ["1004206704994566164", ""],
  botInvite: "",
  supportServer: "",
  mongodbURL: "mongodb+srv://xmoncraftypersonal:<password>@cluster0.sc35fvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  status: 'Xcia',
  commandsDir: './commands',
  language: "en",
  embedColor: "00fbff",
  errorLog: "",


  sponsor: {
    status: false,
    url: "",
  },

  voteManager: {
    status: false,
    api_key: "",
    vote_commands: ["back", "channel", "clear", "dj", "filter", "loop", "nowplaying", "pause", "playnormal", "playlist", "queue", "resume", "save", "play", "skip", "stop", "time", "volume"],
    vote_url: "",
  },

  shardManager: {
    shardStatus: false
  },

  playlistSettings: {
    maxPlaylist: 10,
    maxMusic: 75,
  },

  opt: {
    DJ: {
      commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume', 'shuffle']
    },

    voiceConfig: {
      leaveOnFinish: false,
      leaveOnStop: false,
      leaveOnEmpty: {
        status: false,
        cooldown: 299999999900000000000,
      },

    },

    maxVol: 150,

  }
}
