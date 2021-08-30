# husky7 + commitlint + lint-staged 记录

---

## Install

- npm install -g husky
- npm install -D prettier husky commitizen @commitlint/config-conventional @commitlint/cli lint-staged cz-conventional-changelog
- npm install -D eslint eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-simple-import-sort

---

## package.json script

- "prepare": "husky install",
- "commit": "git-cz",
- "commitlint":"commitlint --edit",
- "lint-staged": "lint-staged",

## husky 初始化及钩子配置

- husky add .husky/pre-commit "npx lint-staged --allow-empty $1"
- husky add .husky/commit-msg "npx commitlint --edit $1"
- echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

---

## commitlint 配置

> "config": { "commitizen": {

    "path": "./node_modules/cz-conventional-changelog"

} }
