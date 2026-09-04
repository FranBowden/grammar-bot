require("dotenv").config();
const { checkGrammar } = require("./grammar.js");
const { getAngryGif } = require("./gif.js");
const { execSync } = require("child_process");
const {
  setGifFeatureEnabled,
  setGrammarCheckEnabled,
  isGrammarCheckEnabled,
  isGifFeatureEnabled,
} = require("./utils.js");

try {
  execSync("node src/deploy-commands.js", { stdio: "inherit" });
  console.log("Commands deployed");
} catch (err) {
  console.error("Command deploy failed:", err);
}

const {
  Client,
  GatewayIntentBits,
  Events,
  EmbedBuilder,
} = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const serverDialects = new Map();

const BOT_TOKEN = process.env.BOT_TOKEN;

client.on(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
  if (!isGrammarCheckEnabled()) return;

  try {
    const dialect = serverDialects.get(message.guild.id) || "american";
    const lints = await checkGrammar(message.content, dialect);
    if (lints.length > 0) {
      const feedback = lints.map((lint) => lint.message).join(" ");
      if (!isGifFeatureEnabled()) {
        await message.reply(feedback);
        return;
      }
      const gifUrl = await getAngryGif();
      const embed = new EmbedBuilder()
        .setDescription(feedback)
        .setImage(gifUrl);

      await message.reply({ embeds: [embed] });
    }
  } catch (error) {
    console.error("Error checking grammar:", error);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }

  if (interaction.commandName === "language") {
    const dialect = interaction.options.getString("dialect");
    const dialectLabels = {
      american: "American English",
      british: "British English",
    };
    serverDialects.set(interaction.guild.id, dialect);
    await interaction.reply(
      `Language set to: ${dialectLabels[dialect] || dialect}`,
    );
  }

  if (interaction.commandName === "gif-feature-toggle") {
    const toggle = interaction.options.getString("toggle");
    const isEnabled = toggle === "enable";
    setGifFeatureEnabled(isEnabled);
    await interaction.reply(
      `GIF feature has been ${isEnabled ? "enabled" : "disabled"}.`,
    );
  }

  if (interaction.commandName === "grammar-check-toggle") {
    const toggle = interaction.options.getString("toggle");
    const isEnabled = toggle === "enable";
    setGrammarCheckEnabled(isEnabled);
    await interaction.reply(
      `Grammar checking has been ${isEnabled ? "enabled" : "disabled"}.`,
    );
  }
});
client.login(BOT_TOKEN);
