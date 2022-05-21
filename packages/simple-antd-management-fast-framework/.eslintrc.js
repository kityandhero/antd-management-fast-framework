module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint'), 'plugin:react/jsx-runtime'],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
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
    'no-use-before-define': 0,
    'no-nested-ternary': 0,
    'compat/compat': 0,
    '@typescript-eslint/no-this-alias': ['off'],
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-invalid-this': 0,
  },
};
