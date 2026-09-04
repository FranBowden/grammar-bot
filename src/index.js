require("dotenv").config();
const { execSync } = require("child_process");
const {
  Client,
  GatewayIntentBits,
  Events,
  EmbedBuilder,
} = require("discord.js");

const { checkGrammar } = require("./grammar.js");
const { buildFeedback } = require("./feedback.js");
const { getAngryGif } = require("./gif.js");
const { commands } = require("./commands");
const {
  isGrammarCheckEnabled,
  isGifFeatureEnabled,
  getDialect,
  getStrictness,
} = require("./server-settings.js");

// execute the deploy-commands.js script to register slash commands with Discord
try {
  execSync("node src/deploy-commands.js", { stdio: "inherit" });
  console.log("Commands deployed");
} catch (err) {
  console.error("Command deploy failed:", err);
}

const BOT_TOKEN = process.env.BOT_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

/**
 * The event listener for new messages
 */
client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (!isGrammarCheckEnabled(message.guild.id)) return;

  try {
    const dialect = getDialect(message.guild.id);
    const strictness = getStrictness(message.guild.id);
    const lints = await checkGrammar(message.content, dialect, strictness);
    if (lints.length === 0) return;

    if (!isGifFeatureEnabled(message.guild.id)) {
      await message.reply(buildFeedback(lints, 2000));
      return;
    }

    const gifUrl = await getAngryGif();
    const embed = new EmbedBuilder()
      .setDescription(buildFeedback(lints, 4096))
      .setImage(gifUrl);

    await message.reply({ embeds: [embed] });
  } catch (error) {
    console.error(
      `Error checking grammar (guild=${message.guild.id}, channel=${message.channel.id}, user=${message.author.id}):`,
      error,
    );
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(
      `Error executing command "${interaction.commandName}":`,
      error,
    );
  }
});

client.login(BOT_TOKEN);
