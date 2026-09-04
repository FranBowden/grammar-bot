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
    harperModule = await import("harper.js");
    ({ binary: binaryModule } = await import("harper.js/binary"));
  }

  if (!linters[dialect]) {
    linters[dialect] = new harperModule.LocalLinter({
      binary: binaryModule,
      dialect:
        dialect === "british"
          ? harperModule.Dialect.British
          : harperModule.Dialect.American,
    });
  }

  return linters[dialect];
}

/**
 * Convert a WASM-backed Lint into a plain object for easy inspection/logging
 * @param {*} lint
 * @returns
 */
function toPlainLint(lint) {
  return {
    kind: lint.lint_kind_pretty(),
    message: lint.message(),
    problemText: lint.get_problem_text(),
    suggestions: lint.suggestions().map((s) => s.get_replacement_text()),
  };
}

/**
 * Check the grammar of the provided text for the specified dialect
 * @param {*} text
 * @param {*} dialect
 * @returns
 */
async function checkGrammar(text, dialect = "american") {
  const linter = await getLinter(dialect);
  const lints = await linter.lint(text);
  return lints.map(toPlainLint);
}

module.exports = { checkGrammar };
