require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'language',
    description: 'Set the language for grammar checking (e.g., American, British)',
    options: [
      {
        name: 'dialect',
        type: 3,
        description: 'Choose a dialect',
        required: true,
        choices: [
          { name: 'American', value: 'american' },
          { name: 'British', value: 'british' },
        ],
      },
    ],
  }
];

const rest = new REST().setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('Commands registered successfully!');
  } catch (error) {
    console.error(error);
  }
})();