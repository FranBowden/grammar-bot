const { checkGrammar } = require('./grammar.js');

(async () => {
  console.log('Before checkGrammar');
  const lints = await checkGrammar('This is a bad grammer sentence.');
  console.log('After checkGrammar call');

  for (const lint of lints) {
    console.log('Message:', lint.message());
    console.log('Span:', lint.span().start, '-', lint.span().end);
    if (lint.suggestion_count() > 0) {
      console.log('Suggestions:', lint.suggestions().map(s => s.text ? s.text() : s));
    }
    console.log('---');
  }
})();