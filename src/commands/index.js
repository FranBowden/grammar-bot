const fs = require("fs");
const path = require("path");

/**
 * Load every command module in this directory into a Map keyed by command name.
 * Adding a new slash command only requires adding a new file here 
 */
const commands = new Map();

for (const file of fs.readdirSync(__dirname)) {
  if (file === "index.js" || !file.endsWith(".js")) continue;
  const command = require(path.join(__dirname, file));
  commands.set(command.data.name, command);
}

module.exports = { commands };
