# Annoying Grammar Checker Bot

A Discord bot that checks chat messages for spelling & grammar mistakes (using Harper) and replies with corrections, plus an angry GIF using Giphy.

Built with Node.js, discord.js, and Harper. This bot is designed to run in Discord servers (guilds) only — it does not support DMs.

## Setup

1. `npm install`
2. Create a `.env` file:
   ```
   BOT_TOKEN=...
   CLIENT_ID=...
   GIPHY_API_KEY=...
   ```
3. In the [Discord Developer Portal](https://discord.com/developers/applications), under your app's **Bot** settings, enable the **Message Content Intent** — the bot can't read message text to grammar-check it without this.
4. Invite the bot to your server with the **Administrator** permission (or, at minimum: View Channels, Send Messages, Read Message History, Embed Links, and Use Slash Commands).
5. Register slash commands: `node src/deploy-commands.js`
6. Start the bot: `node src/index.js`

## Commands

- `/ping` — health check, replies with "Pong!"
- `/language` — set grammar dialect (American/British English) for the server
- `/gif-feature-toggle` — enable or disable the angry GIF reply for the server
- `/grammar-check-toggle` — enable or disable grammar checking entirely for the server
- `/strictness` — set how strict grammar checking is for the server:
  - `relaxed`
  - `standard` (default)
  - `strict`

Each command lives in its own file under [src/commands/](src/commands/)
