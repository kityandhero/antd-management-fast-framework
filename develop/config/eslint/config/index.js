/* eslint-disable import/no-commonjs */

let { generalRules, sortRules } = require('../rules');

const rules = {
  ...generalRules,
  ...sortRules,
};

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
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['src', 'node_modules'],
        },
        typescript: {
          // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unIst`
          alwaysTryTypes: true,

          // use an array of glob patterns
          directory: ['./tsconfig.json', './packages/*/tsconfig.json'],
        },
      },
    },
  },
};
