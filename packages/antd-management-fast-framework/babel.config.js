/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

module.exports = {
  presets: [
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-env',
  ],
  plugins: [
    '@babel/plugin-transform-react-jsx',
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    // ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-external-helpers',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
        helpers: true,
        version: '^7.7.7',
      },
    ],
  ],
};
