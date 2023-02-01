/* eslint-disable import/no-commonjs */

const content = `{
  "*.{md,json}": ["npx prettier --cache --write"],
  "*.{js,jsx}": ["npx max lint --fix --eslint-only", "npx prettier --cache --write"],
  "*.{css,less,scss}": [
    "npx max lint --fix --stylelint-only",
    "npx prettier --cache --write"
  ],
  "*.{ts,tsx}": [
    "npx max lint --fix --eslint-only",
    "npx prettier --cache --parser=typescript --write"
  ]
}
`;

module.exports = {
  content,
};
