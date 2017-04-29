const entities = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
};

// TERA only converts these characters.
const escapeChars = {
  '<': 'lt',
  '>': 'gt',
};

module.exports = {
  stripTags(s) {
    return s.replace(/<\/?[^<>]*>/gi, '');
  },

  escapeHTML(s) {
    return s.replace(/[<>]/g, m => `&${escapeChars[m]};`);
  },

  decodeHTMLEntities(s) {
    return (s
      .replace(/&#(\d+);?/g, (_, code) => String.fromCharCode(code))
      .replace(/&#[xX]([A-Fa-f0-9]+);?/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
      .replace(/&([^;\W]+;?)/g, (m, e) => entities[e.replace(/;$/, '')] || m)
    );
  },

  escapeRegExp(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  },
};
