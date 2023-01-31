/* eslint-disable import/no-commonjs */

module.exports = {
  generalConfig: {
    extends: require.resolve('@umijs/max/stylelint'),
    customSyntax: 'postcss-less',
    rules: {
      'unicode-bom': 'never',
      'no-descending-specificity': null,
      'selector-class-pattern': null,
      'value-no-vendor-prefix': null,
    },
  },
};
