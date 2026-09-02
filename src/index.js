require('dotenv').config();
const { checkGrammar } = require('./grammar.js');
const { getAngryGif } = require('./gif.js');

const BOT_TOKEN = process.env.BOT_TOKEN;
const { Client, GatewayIntentBits, Events } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});
const serverDialects = new Map();

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;

  try {
    const dialect = serverDialects.get(message.guild.id) || 'american';
    const lints = await checkGrammar(message.content, dialect);
    if (lints.length > 0) {
      const feedback = lints.map(lint => `• ${lint.message()}`).join('\n');
      const gifUrl = await getAngryGif();
      await message.reply(`${feedback}\n${gifUrl}`);
    }
  } catch (error) {
    console.error('Error checking grammar:', error);
  }
});

// client.on(Events.InteractionCreate, async interaction => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === 'ping') {
//     await interaction.reply('Pong!');
//   }

  // if (interaction.commandName === 'language') {
  //   const dialect = interaction.options.getString('dialect');
  //   serverDialects.set(interaction.guild.id, dialect);
  //   await interaction.reply(`Language set to: ${dialect}`);
  // }
// });
client.login(BOT_TOKEN);