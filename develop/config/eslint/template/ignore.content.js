/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const content = `**/public
**/lib
**/es
**/.history
**/.husky
**/.vs
**/docs

*.d.ts
*.log
*.zip
*.txt
*.7z
*.min.js
rollup.config-*.cjs
`;

module.exports = {
  content,
};
