/**
generate by easy-soft-develop
*/

const lintScript = {
  'z:lint:staged': 'npx lint-staged',
  'z:lint:staged:quiet': 'npx lint-staged --quiet',
};

const prepareScript = {
  prepare: 'echo do other prepare work with here before install package',
};

const toolsScript = {
  'z:show:info':
    'echo node version && node --version && echo npm version && npm --version',
  'z:sleep': 'npx easy-soft-develop sleep --second 2 --showInfo false',
  'z:create:assist-scripts': 'npx easy-soft-develop create-assist-scripts',
  'z:update:package-from-package':
    'node ./develop/assists/update-package-from-package.mjs',
};

const publishScript = {
  'prez:publish:repository': 'npm run z:change:npm:registry:local',
  'z:publish:repository': 'npm run z:repository:publish',
  'postz:publish:repository': 'npm run z:publish:npm-all',
  'prez:publish:build':
    'npm run z:install && pnpm changeset && pnpm changeset version && npm run z:cz && npm run z:build:all',
  'z:publish:build': 'npm run z:publish:repository',
};

const cleanScript = {
  'z:clean': 'node ./develop/assists/clean.mjs',
};

const environmentScript = {
  'prez:initial:environment': 'npm run z:create:assist-scripts',
  'z:initial:environment': 'node ./develop/assists/initial.environment.mjs',
};

const repositoryScript = {
  'z:repository:publish': 'pnpm -r publish',
  'z:bootstrap': 'npm run z:clean && git pull && npm run z:install',
};

const installScript = {
  'z:reinstall': 'npm run z:bootstrap',
  'prez:install.global.develop.dependence':
    'npm run z:change:npm:registry:local',
  'z:install.global.develop.dependence':
    'node ./develop/assists/install.global.develop.dependence.mjs',
  'postz:install.global.develop.dependence': 'npm run z:install',
  'prez:install': 'npm run z:change:npm:registry:local',
  'z:install': 'pnpm install',
  'postz:install':
    'pnpm changeset init && npm run z:husky && npm run z:post:extra:install && npm run z:initial:environment',
  'z:post:extra:install': 'echo do other postinstall work with here',
  'z:husky': 'npx husky',
};

const nrmScript = {
  'z:change:npm:registry:local': 'nrm use local',
  'z:change:npm:registry:npm': 'nrm use npm',
};

const commitScript = {
  commitlint: 'npx commitlint --edit',
  precommit: 'npm run z:lint:staged:quiet',
  'prez:cz':
    'npm run z:auto:adjust:file:all && npm run z:prettier:format:change && npm run z:commit:refresh && git stage -A',
  'z:cz': 'cz',
  'postz:cz': 'git push && npm run z:test',
  'z:commit:refresh': 'npx easy-soft-develop commit-refresh',
};

const prettierScript = {
  'z:prettier:format:all': 'npx prettier --write .',
  'z:prettier:format:change':
    'npx prettier --cache --write . && npx easy-soft-develop prompt --message "format changed files complete" --type success --blankLine',
  'z:prettier:package.json:all': 'npx prettier --write ./**/package.json',
  'z:prettier:package.json:current': 'npx prettier --write ./package.json',
};

const ncuScript = {
  'z:check:all-package-version':
    'npx easy-soft-develop check-all-package-version',
  'z:check:every-package-version':
    'npx easy-soft-develop check-every-package-version',
  'prez:update:all-package-version':
    'node ./develop/assists/install.global.develop.dependence.mjs',
  'z:update:all-package-version':
    'npx easy-soft-develop update-all-package-version --autoInstall false',
  'postz:update:all-package-version': 'npm run z:reinstall',
  'prez:update:every-package-version':
    'node ./develop/assists/install.global.develop.dependence.mjs',
  'z:update:every-package-version':
    'npx easy-soft-develop update-every-package-version',
  'postz:update:every-package-version': 'npm run z:reinstall',
  'z:update:special-package-version':
    'node ./develop/assists/package.update.special.version.mjs',
  'postz:update:special-package-version': 'npm run z:reinstall',
};

export default {
  ...lintScript,
  ...prettierScript,
  ...prepareScript,
  ...toolsScript,
  ...publishScript,
  ...cleanScript,
  ...environmentScript,
  ...repositoryScript,
  ...installScript,
  ...nrmScript,
  ...commitScript,
  ...ncuScript,
};
