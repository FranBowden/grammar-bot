const fs = require("fs");
const path = require("path");

const DEFAULT_DIALECT = "american";
const DEFAULT_STRICTNESS = "standard";

const DATA_DIR = path.join(__dirname, "..", "data");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

let settingsByServer = loadSettings();

/**
 * Loads persisted server settings from disk, if present.
 * @returns {object} settings keyed by server ID
 */
function loadSettings() {
  try {
    return JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Failed to load server settings, starting fresh:", error);
    }
    return {};
  }
}

/**
 * Writes the current settings to disk (atomically, via a temp file + rename).
 */
function saveSettings() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tempFile = `${SETTINGS_FILE}.tmp`;
  fs.writeFileSync(tempFile, JSON.stringify(settingsByServer, null, 2));
  fs.renameSync(tempFile, SETTINGS_FILE);
}

/**
 * Updates a single setting for a server and persists the change.
 * @param {*} serverId
 * @param {string} key
 * @param {*} value
 */
function setSetting(serverId, key, value) {
  const server = settingsByServer[serverId] ?? {};
  server[key] = value;
  settingsByServer[serverId] = server;
  saveSettings();
}

/**
 * Checks if the GIF feature is enabled for a given server
 *
 * @param {*} serverId
 * @returns
 */
function isGifFeatureEnabled(serverId) {
  return settingsByServer[serverId]?.gifFeatureEnabled ?? true;
}

/**
 * Sets the enabled status of the GIF feature for a given server
 *
 * @param {*} serverId
 * @param {boolean} enabled
 */
function setGifFeatureEnabled(serverId, enabled) {
  setSetting(serverId, "gifFeatureEnabled", enabled);
}

/**
 * Checks if the grammar check feature is enabled for a given server
 *
 * @param {*} serverId
 * @returns
 */
function isGrammarCheckEnabled(serverId) {
  return settingsByServer[serverId]?.grammarCheckEnabled ?? true;
}

/**
 * Sets the enabled status of the grammar check feature for a given server
 *
 * @param {*} serverId
 * @param {boolean} enabled
 */
function setGrammarCheckEnabled(serverId, enabled) {
  setSetting(serverId, "grammarCheckEnabled", enabled);
}

/**
 * Gets the dialect for a given server
 *
 * @param {*} serverId
 * @returns
 */
function getDialect(serverId) {
  return settingsByServer[serverId]?.dialect ?? DEFAULT_DIALECT;
}

/**
 * Sets the dialect for a given server
 *
 * @param {*} serverId
 * @param {string} dialect
 */
function setDialect(serverId, dialect) {
  setSetting(serverId, "dialect", dialect);
}

/**
 * Gets the strictness level for a given server
 *
 * @param {*} serverId
 * @returns
 */
function getStrictness(serverId) {
  return settingsByServer[serverId]?.strictness ?? DEFAULT_STRICTNESS;
}

/**
 * Sets the strictness level for a given server
 *
 * @param {*} serverId
 * @param {string} strictness
 */
function setStrictness(serverId, strictness) {
  setSetting(serverId, "strictness", strictness);
}

/**
 * Deletes all stored settings for a server (e.g. when the Bot is removed from it)
 *
 * @param {*} serverId
 */
function deleteServerSettings(serverId) {
  if (!(serverId in settingsByServer)) return;
  delete settingsByServer[serverId];
  saveSettings();
}

module.exports = {
  isGifFeatureEnabled,
  setGifFeatureEnabled,
  isGrammarCheckEnabled,
  setGrammarCheckEnabled,
  getDialect,
  setDialect,
  getStrictness,
  setStrictness,
  deleteServerSettings,
};
