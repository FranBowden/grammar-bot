const { setDialect } = require("../server-settings.js");

const DIALECT_LABELS = {
  american: "American English",
  british: "British English",
};

module.exports = {
  data: {
    name: "language",
    description:
      "Set the language for grammar checking (e.g., American English, British English)",
    options: [
      {
        name: "dialect",
        type: 3,
        description: "Choose a dialect",
        required: true,
        choices: [
          { name: "American English", value: "american" },
          { name: "British English", value: "british" },
        ],
      },
    ],
  },
  async execute(interaction) {
    const dialect = interaction.options.getString("dialect");
    setDialect(interaction.guild.id, dialect);
    await interaction.reply(
      `Language set to: ${DIALECT_LABELS[dialect] || dialect}`,
    );
  },
};
