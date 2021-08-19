# husky7 + commitlint + lint-staged 记录

---

## Install

* npm install -g husky
* npm install -D prettier husky commitizen @commitlint/config-conventional @commitlint/cli lint-staged cz-conventional-changelog
* npm install -D eslint eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-simple-import-sort

---

## husky初始化及钩子配置

* package.json set-script prepare "husky install"
* husky add .husky/pre-commit "npx lint-staged --allow-empty $1"
* husky add .husky/commit-msg "npx commitlint --edit $1"
* echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

---

## commitlint配置

* package.json set-script commit "git-cz"

> "config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
