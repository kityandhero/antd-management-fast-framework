/* eslint-disable import/no-commonjs */

module.exports = {
  generalRules: {
    eqeqeq: 'off',
    'react/jsx-wrap-multilines': 0,
    'react/prop-types': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-bitwise': 0,
    'linebreak-style': 0,
    'generator-star-spacing': 0,
    'operator-linebreak': 0,
    'object-curly-newline': 0,
    'no-use-before-define': 1,
    'no-nested-ternary': 0,
    'compat/compat': 0,
    '@typescript-eslint/no-this-alias': ['off'],
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-invalid-this': 0,
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
  sortRules: {
    'import/order': 0,
    'sort-imports': 0,
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^(?!antd-management-fast-)(?!easy-soft-)[a-zA-Z0-9]', '^@(?!/)'],
          ['^(?!@/)(?!easy-soft-)(?!.)'],
          ['^easy-soft-'],
          ['^(?!@/)(?!antd-management-fast-)(?!.)'],
          ['^antd-management-fast-'],
          ['^((@/).*|$)'],
          ['^\\u0000'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^.+\\.s?less$', '^.+\\.s?scss$', '^.+\\.s?css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
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
