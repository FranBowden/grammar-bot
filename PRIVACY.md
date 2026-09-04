# Privacy Policy

_Last updated: 2026-09-04_

This Privacy Policy explains what data the Annoying Grammar Checker Bot ("the Bot") processes when it is added to a Discord server.

## What the Bot Processes

- **Message content** — the Bot reads message text in servers it has been added to in order to check spelling and grammar. Message content is processed in memory to generate a correction and is **not stored, logged, or shared**.
- **Server ID** — used only as a key to remember that server's settings (see below). No user IDs, usernames, or message history are stored.
- **Server settings** — each server can configure:
  - Grammar dialect (American / British English)
  - Strictness level (relaxed / standard / strict)
  - Whether grammar checking is enabled
  - Whether the GIF reply feature is enabled

  These settings are stored on the Bot's server, keyed only by server ID, so they persist across Bot restarts. No message content, user IDs, or usernames are ever included in this storage.

## What the Bot Does Not Do

- The Bot does not store or log message content.
- The Bot does not build user profiles, track users across servers, or sell/share data with third parties for advertising or any other purpose.
- The Bot does not access Server Members data or presence/status information.

## Third-Party Services

- **Giphy API** — when the GIF reply feature is enabled, the Bot sends generic search terms (e.g. "angry") to Giphy to fetch a GIF. Your message content and personal information are never sent to Giphy. See [Giphy's Privacy Policy](https://support.giphy.com/hc/en-us/articles/360033880972-GIPHY-Privacy-Policy) for how they handle requests.
- Grammar checking is performed by the Bot itself using the open-source [Harper](https://writewithharper.com/) grammar engine.

## Data Retention

Server settings (dialect, strictness, and feature toggles) are retained until the Bot is removed from a server. No message content is retained at any time.

## Removing the Bot

Removing the Bot from your server stops all message processing for that server, and any stored settings for that server are deleted.

## Contact

Questions about this policy can be sent via [GitHub Issues](https://github.com/FranBowden/grammar-bot/issues) or to francescalbowden@gmail.com.

## Changes to This Policy

This policy may be updated as the Bot's features change. Continued use of the Bot after changes constitutes acceptance of the updated policy.
