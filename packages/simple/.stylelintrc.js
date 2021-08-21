const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.stylelint,
  rules: {
    'unicode-bom': 'never',
    'no-descending-specificity': null,
  },
};
