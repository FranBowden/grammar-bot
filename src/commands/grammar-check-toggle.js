const { setGrammarCheckEnabled } = require("../serverSettings.js");

module.exports = {
  data: {
    name: "grammar-check-toggle",
    description: "Enable or disable grammar checking for the server",
    options: [
      {
        name: "toggle",
        type: 3,
        description: "Choose to enable or disable grammar checking",
        required: true,
        choices: [
          { name: "Enable", value: "enable" },
          { name: "Disable", value: "disable" },
        ],
      },
    ],
  },
  async execute(interaction) {
    const toggle = interaction.options.getString("toggle");
    const isEnabled = toggle === "enable";
    setGrammarCheckEnabled(interaction.guild.id, isEnabled);
    await interaction.reply(
      `Grammar checking has been ${isEnabled ? "enabled" : "disabled"}.`,
    );
  },
};
