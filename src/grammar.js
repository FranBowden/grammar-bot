async function checkGrammar(text, dialect = 'american') {
  const harper = await import('harper.js');
  const { binary } = await import('harper.js/binary');

  const linter = new harper.LocalLinter({
    binary,
    dialect: dialect === 'british' ? harper.Dialect.British : harper.Dialect.American,
  });

  const lints = await linter.lint(text);
  return lints;
}

module.exports = { checkGrammar };