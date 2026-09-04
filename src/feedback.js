/**
 * Build a bulleted feedback list from lints, truncating so it fits within
 * a given character limit (adding a "...and N more" note if needed).
 * @param {*} lints
 * @param {number} maxLength
 * @returns {string}
 */
function buildFeedback(lints, maxLength) {
  const lines = lints.map((lint) => `- ${lint.message}`);
  const included = [];
  let length = 0;

  for (let i = 0; i < lines.length; i++) {
    const remaining = lines.length - i;
    const note = `\n...and ${remaining} more issue${remaining === 1 ? "" : "s"}`;
    const addedLength = (included.length > 0 ? 1 : 0) + lines[i].length;

    if (length + addedLength + note.length > maxLength) {
      return included.join("\n") + note;
    }

    included.push(lines[i]);
    length += addedLength;
  }

  return included.join("\n");
}

module.exports = { buildFeedback };
