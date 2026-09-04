let gifFeatureEnabled = true;

function isGifFeatureEnabled() {
  return gifFeatureEnabled;
}

function setGifFeatureEnabled(enabled) {
  gifFeatureEnabled = enabled;
}

let grammarCheckEnabled = true;

function isGrammarCheckEnabled() {
  return grammarCheckEnabled;
}

function setGrammarCheckEnabled(enabled) {
  grammarCheckEnabled = enabled;
}

module.exports = {
  isGifFeatureEnabled,
  setGifFeatureEnabled,
  isGrammarCheckEnabled,
  setGrammarCheckEnabled,
};
