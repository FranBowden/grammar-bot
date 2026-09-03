require('dotenv').config();
const { checkGrammar } = require('./grammar.js');
const { getAngryGif } = require('./gif.js');

const { Client, GatewayIntentBits, Events, EmbedBuilder } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});
const serverDialects = new Map();

const BOT_TOKEN = process.env.BOT_TOKEN;


client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;

  try {
    const dialect = serverDialects.get(message.guild.id) || 'american';
    const lints = await checkGrammar(message.content, dialect);
    if (lints.length > 0) {
      const feedback = lints.map(lint => `${lint.message()}`).join(' ');
      const gifUrl = await getAngryGif();
      const embed = new EmbedBuilder()
        .setDescription(feedback)
        .setImage(gifUrl);

      await message.reply({ embeds: [embed] });
    }
  } catch (error) {
    console.error('Error checking grammar:', error);
  }
});



client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }

  if (interaction.commandName === 'language') {
    const dialect = interaction.options.getString('dialect');
    const dialectLabels = { american: 'American English', british: 'British English' };
    serverDialects.set(interaction.guild.id, dialect);
    await interaction.reply(`Language set to: ${dialectLabels[dialect] || dialect}`);
  }
});
client.login(BOT_TOKEN);