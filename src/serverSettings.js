const DEFAULT_DIALECT = "american";

const gifFeatureByServer = new Map();
const grammarCheckByServer = new Map();
const dialectByServer = new Map();

/**
 * Checks if the GIF feature is enabled for a given server
 *
 * @param {*} serverId
 * @returns
 */
function isGifFeatureEnabled(serverId) {
  return gifFeatureByServer.get(serverId) ?? true;
}

/**
 * Sets the enabled status of the GIF feature for a given server
 *
 * @param {*} serverId
 * @param {boolean} enabled
 */
function setGifFeatureEnabled(serverId, enabled) {
  gifFeatureByServer.set(serverId, enabled);
}

/**
 * Checks if the grammar check feature is enabled for a given server
 *
 * @param {*} serverId
 * @returns
 */
function isGrammarCheckEnabled(serverId) {
  return grammarCheckByServer.get(serverId) ?? true;
}

/**
 * Sets the enabled status of the grammar check feature for a given server
 *
 * @param {*} serverId
 * @param {boolean} enabled
 */
function setGrammarCheckEnabled(serverId, enabled) {
  grammarCheckByServer.set(serverId, enabled);
}

/**
 * Gets the dialect for a given server
 *
 * @param {*} serverId
 * @returns
 */
function getDialect(serverId) {
  return dialectByServer.get(serverId) ?? DEFAULT_DIALECT;
}

/**
 * Sets the dialect for a given server
 *
 * @param {*} serverId
 * @param {string} dialect
 */
function setDialect(serverId, dialect) {
  dialectByServer.set(serverId, dialect);
}

module.exports = {
  isGifFeatureEnabled,
  setGifFeatureEnabled,
  isGrammarCheckEnabled,
  setGrammarCheckEnabled,
  getDialect,
  setDialect,
};
