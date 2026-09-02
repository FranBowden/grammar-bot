# Grammer Checker Bot

A Discord bot that checks chat messages for grammar mistakes (using Harper) and replies with corrections, plus an angry GIF using Giphy.

## Setup

1. `npm install`
2. Create a `.env` file:
BOT_TOKEN=...
CLIENT_ID=...
PUBLIC_KEY=...
GIPHY_API_KEY=...
4. Register slash commands: `node src/deploy-commands.js`
5. Start the bot: `node src/index.js`

## Commands
- `/ping` — health check
- `/language` — set grammar dialect (American/British) for the server
