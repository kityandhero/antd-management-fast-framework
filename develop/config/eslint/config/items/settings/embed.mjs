/**
generate by easy-soft-develop
*/

const items = {
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
      directory: [
        './tsconfig.json',
        './packages/*/tsconfig.json',
        './examples/*/tsconfig.json',
      ],
    },
  },
};

export const settings = {
  ...items,
};
