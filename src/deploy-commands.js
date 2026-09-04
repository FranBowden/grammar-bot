require("dotenv").config();
const { REST, Routes } = require("discord.js");
const { commands } = require("./commands");

const rest = new REST().setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log("Registering slash commands...");

    const body = [...commands.values()].map((command) => command.data);
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body,
    });

    console.log("Commands registered successfully!");
  } catch (error) {
    console.error(error);
  }
})();
