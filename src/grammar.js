let harperModule;
let binaryModule;
const linters = {};

// Harper suggests spelling these initialisms out in full (e.g. "idk" -> "I
// don't know"); fine for formal writing, overkill for casual Discord chat.
const RELAXED_DISABLED_RULES = {
  SentenceCapitalization: false,
  CapitalizePersonalPronouns: false,
  YeaToYeah: false,
  YehToYeah: false,
  IfYouKnowYouKnow: false,
  InCaseYouMissedIt: false,
  ForYourInformation: false,
  AsFarAsIKnow: false,
  BeRightBack: false,
  IDontKnow: false,
  IfIRecallCorrectly: false,
  AsSoonAsPossible: false,
  ByTheWay: false,
  ToBeHonest: false,
  InRealLife: false,
  ForWhatItsWorth: false,
  IfIUnderstandCorrectly: false,
  ExplainLikeImFive: false,
  InMyOpinion: false,
  PleaseTakeALook: false,
  InMyHumbleOpinion: false,
  LetMeKnow: false,
  OhMyGod: false,
  NeverMind: false,
  TalkToYouLater: false,
  OrthographicConsistency: false,
};

// Common chat shorthand that Harper's dictionary doesn't recognize by
// default, so it gets flagged as a spelling mistake.
const RELAXED_ACCEPTED_WORDS = [
  "idk",
  "imo",
  "imho",
  "tbh",
  "btw",
  "fyi",
  "afaik",
  "irl",
  "afk",
  "lol",
  "lmao",
  "rofl",
  "omg",
  "smh",
  "np",
  "nvm",
  "brb",
  "gtg",
  "ttyl",
  "omw",
  "hbu",
  "ikr",
  "thx",
  "pls",
  "plz",
  "obvi",
  "kk",
  "rn",
  "atm",
  "bc",
  "coz",
  "gr8",
  "ppl",
  "fwiw",
  "lmk",
  "iirc",
  "eli5",
  "ptal",
  "iykyk",
  "icymi",
  "xD",
  "xDD",
];

/**
 * Get a linter for the specified dialect and strictness level.
 * @param {*} dialect
 * @param {*} strictness
 * @returns
 */
async function getLinter(dialect, strictness) {
  if (!harperModule) {
    harperModule = await import("harper.js");
    ({ binary: binaryModule } = await import("harper.js/binary"));
  }

  const key = `${dialect}:${strictness}`;
  if (!linters[key]) {
    const linter = new harperModule.LocalLinter({
      binary: binaryModule,
      dialect:
        dialect === "british"
          ? harperModule.Dialect.British
          : harperModule.Dialect.American,
    });

    if (strictness === "strict") {
      const descriptions = await linter.getLintDescriptions();
      const allRulesOn = Object.fromEntries(
        Object.keys(descriptions).map((name) => [name, true]),
      );
      await linter.setLintConfig(allRulesOn);
    } else if (strictness === "relaxed") {
      await linter.setLintConfig(RELAXED_DISABLED_RULES);
      await linter.importWords(RELAXED_ACCEPTED_WORDS);
    }

    linters[key] = linter;
  }

  return linters[key];
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
 * Check the grammar of the provided text for the specified dialect and strictness
 * @param {*} text
 * @param {*} dialect
 * @param {*} strictness "relaxed", "standard" (Harper's defaults), or "strict" (every rule enabled)
 * @returns
 */
async function checkGrammar(
  text,
  dialect = "american",
  strictness = "standard",
) {
  const linter = await getLinter(dialect, strictness);
  const lints = await linter.lint(text);
  return lints.map(toPlainLint);
}

module.exports = { checkGrammar };
