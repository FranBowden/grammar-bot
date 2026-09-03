let harperModule;
let binaryModule;
const linters = {};

/**
 * Get a linter for the specified dialect
 * @param {*} dialect 
 * @returns 
 */
async function getLinter(dialect) {
  if (!harperModule) {
    harperModule = await import('harper.js');
    ({ binary: binaryModule } = await import('harper.js/binary'));
  }

  if (!linters[dialect]) {
    linters[dialect] = new harperModule.LocalLinter({
      binary: binaryModule,
      dialect: dialect === 'british' ? harperModule.Dialect.British : harperModule.Dialect.American,
    });
  }

  return linters[dialect];
}

/**
 * Check the grammar of the provided text for the specified dialect
 * @param {*} text 
 * @param {*} dialect 
 * @returns 
 */
async function checkGrammar(text, dialect = 'american') {
  const linter = await getLinter(dialect);
  return linter.lint(text);
}

module.exports = { checkGrammar };