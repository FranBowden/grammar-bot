const gifFeatureByServer = new Map();

function isGifFeatureEnabled(serverId) {
  return gifFeatureByServer.get(serverId) ?? true;
}

function setGifFeatureEnabled(serverId, enabled) {
  gifFeatureByServer.set(serverId, enabled);
}

const grammarCheckByServer = new Map();

function isGrammarCheckEnabled(serverId) {
  return grammarCheckByServer.get(serverId) ?? true;
}

function setGrammarCheckEnabled(serverId, enabled) {
  grammarCheckByServer.set(serverId, enabled);
}

module.exports = {
  isGifFeatureEnabled,
  setGifFeatureEnabled,
  isGrammarCheckEnabled,
  setGrammarCheckEnabled,
};
