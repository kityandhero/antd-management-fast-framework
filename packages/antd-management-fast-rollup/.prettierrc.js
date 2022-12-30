const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  pluginSearchDirs: false,
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'all',
  proseWrap: 'never',
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
  ],
};
