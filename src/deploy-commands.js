require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
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
  {
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
  {
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
];

const rest = new REST().setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log("Commands registered successfully!");
  } catch (error) {
    console.error(error);
  }
})();
