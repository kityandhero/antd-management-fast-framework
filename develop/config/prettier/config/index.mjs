/**
generate by easy-soft-develop
*/

export const generalConfig = {
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'all',
  proseWrap: 'never',
  semi: true,
  overrides: [
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
  ],
  plugins: [
    // 'prettier-plugin-organize-imports',
    'prettier-plugin-packagejson',
  ],
};
