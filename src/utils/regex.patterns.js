// Predefined patterns for common fields
const patterns = {
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
  phone: /(\+?\d{1,3}[-.]?)?\(?\d{3}\)?[-.]?\d{3}[-.]?\d{4}/g,
  date: /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/g,
  amount: /\$?\d+(?:\.\d{2})?/g,
  invoice: /INV-\d{5,}/g,
};

function extractWithRegex(text, patternKey) {
  const regex = patterns[patternKey];
  if (!regex) return [];
  const matches = text.match(regex);
  return matches || [];
}

module.exports = { patterns, extractWithRegex };
