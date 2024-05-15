/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

function buildConfig(api) {
  api.cache(true);

  return {
    babelrcRoots: ['.', 'packages/*', 'examples/*'],
  };
}

module.exports = buildConfig;
