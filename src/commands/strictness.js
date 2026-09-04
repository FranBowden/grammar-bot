const { setStrictness } = require("../server-settings.js");

const LEVEL_LABELS = {
  relaxed: "Relaxed",
  standard: "Standard",
  strict: "Strict",
};

module.exports = {
  data: {
    name: "strictness",
    description: "Set how strict grammar checking is for the server",
    options: [
      {
        name: "level",
        type: 3,
        description: "Choose a strictness level",
        required: true,
        choices: [
          {
            name: "Relaxed",
            value: "relaxed",
          },
          {
            name: "Standard",
            value: "standard",
          },
          {
            name: "Strict",
            value: "strict",
          },
        ],
      },
    ],
  },
  async execute(interaction) {
    const level = interaction.options.getString("level");
    setStrictness(interaction.guild.id, level);
    await interaction.reply(
      `Strictness set to: ${LEVEL_LABELS[level] || level}`,
    );
  },
};
