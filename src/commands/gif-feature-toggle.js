const { setGifFeatureEnabled } = require("../server-settings.js");

module.exports = {
  data: {
    name: "gif-feature-toggle",
    description: "Turn the GIF feature on or off",
    options: [
      {
        name: "toggle",
        type: 3,
        description: "Choose to enable or disable the GIF feature",
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
    setGifFeatureEnabled(interaction.guild.id, isEnabled);
    await interaction.reply(
      `GIF feature has been ${isEnabled ? "enabled" : "disabled"}.`,
    );
  },
};
