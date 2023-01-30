let recommendRules = require('../rules');

let generalRules = recommendRules.generalRules;

let sortRules = recommendRules.sortRules;

let rules = Object.assign(generalRules, sortRules, {});

module.exports = {
  generalConfig: {
    extends: [require.resolve('@umijs/max/eslint')],
    plugins: ['simple-import-sort', 'import', 'prettier'],
    rules: rules,
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
  },
};
