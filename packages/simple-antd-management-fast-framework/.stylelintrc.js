const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.stylelint,
  customSyntax: 'postcss-less',
  rules: {
    'unicode-bom': 'never',
    'no-descending-specificity': null,
    'selector-class-pattern': null,
    'value-no-vendor-prefix': null,
  },
  settings: {
    react: {
      /**
       * "detect" automatically picks the version you have installed.
       * You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
       * default to latest and warns if missing
       */
      version: 'detect',
    },
  },
};
