/**
generate by easy-soft-develop
*/

import { initialEnvironment } from 'easy-soft-develop';

import editorFile from '../config/editor/template/content.mjs';
import eslintFile from '../config/eslint/template/content.mjs';
import editorAttributesFile from '../config/git/template/attributes.content.mjs';
import editorIgnoreFile from '../config/git/template/ignore.content.mjs';
import jestFile from '../config/jest/template/content.mjs';
import jestSimpleTestFile from '../config/jest/template/simple.test.content.mjs';
import jsdocFile from '../config/jsdoc/template/content.mjs';
import lintStagedFile from '../config/lint-staged/template/content.mjs';
import ncuFile from '../config/ncu/template/content.mjs';
import childrenCustomPackageFile from '../config/package/custom/children.content.mjs';
import mainCustomPackageFile from '../config/package/custom/main.content.mjs';
import childrenNecessaryPackageFile from '../config/package/template/children.content.mjs';
import mainNecessaryPackageFile from '../config/package/template/main.content.mjs';
import prettierFile from '../config/prettier/template/content.mjs';
import prettierIgnoreFile from '../config/prettier/template/ignore.content.mjs';
import stylelintFile from '../config/stylelint/template/content.mjs';
import stylelintIgnoreFile from '../config/stylelint/template/ignore.content.mjs';

const mainEslintFileContent = eslintFile.mainContent;
const packageEslintFileContent = eslintFile.packageContent;

const mainNcuFileContent = ncuFile.mainContent;
const packageNcuFileContent = ncuFile.packageContent;

const packageJsdocFileContent = jsdocFile.packageContent;

const mainPrettierContent = prettierFile.mainContent;
const packagePrettierContent = prettierFile.packageContent;

const prettierIgnoreContent = prettierIgnoreFile.content;

const mainStylelintContent = stylelintFile.mainContent;

const stylelintIgnoreContent = stylelintIgnoreFile.content;

const packageStylelintContent = stylelintFile.packageContent;

const editorConfigContent = editorFile.content;

const gitAttributesContent = editorAttributesFile.content;

const gitIgnoreContent = editorIgnoreFile.content;
const lintStagedRcContent = lintStagedFile.content;
const jestContent = jestFile.content;
const jestSimpleTestContent = jestSimpleTestFile.content;

const mainFileContentList = [
  {
    name: 'eslint.config.mjs',
    content: mainEslintFileContent,
    coverFile: true,
  },
  {
    name: '.ncurc.mjs',
    content: mainNcuFileContent,
    coverFile: true,
  },
  {
    name: '.prettierrc.mjs',
    content: mainPrettierContent,
    coverFile: true,
  },
  {
    name: '.prettierignore',
    content: prettierIgnoreContent,
    coverFile: false,
  },
  {
    name: '.stylelintrc.mjs',
    content: mainStylelintContent,
    coverFile: true,
  },
  {
    name: '.stylelintignore',
    content: stylelintIgnoreContent,
    coverFile: false,
  },
  {
    name: '.editorconfig',
    content: editorConfigContent,
    coverFile: true,
  },
  {
    name: '.gitattributes',
    content: gitAttributesContent,
    coverFile: true,
  },
  {
    name: '.gitignore',
    content: gitIgnoreContent,
    coverFile: false,
  },
  {
    name: '.lintstagedrc',
    content: lintStagedRcContent,
    coverFile: false,
  },
];

const packageFileContentList = [
  {
    name: 'eslint.config.mjs',
    content: packageEslintFileContent,
    coverFile: true,
  },
  {
    name: '.ncurc.mjs',
    content: packageNcuFileContent,
    coverFile: true,
  },
  {
    name: '.jsdoc.js',
    content: packageJsdocFileContent,
    coverFile: true,
  },
  {
    name: '.prettierrc.mjs',
    content: packagePrettierContent,
    coverFile: true,
  },
  {
    name: '.prettierignore',
    content: prettierIgnoreContent,
    coverFile: false,
  },
  {
    name: '.stylelintrc.mjs',
    content: packageStylelintContent,
    coverFile: true,
  },
  {
    name: '.stylelintignore',
    content: stylelintIgnoreContent,
    coverFile: false,
  },
  {
    name: '.editorconfig',
    content: editorConfigContent,
    coverFile: true,
  },
  {
    name: '.gitattributes',
    content: gitAttributesContent,
    coverFile: true,
  },
  {
    name: '.gitignore',
    content: gitIgnoreContent,
    coverFile: false,
  },
  {
    name: '.lintstagedrc',
    content: lintStagedRcContent,
    coverFile: false,
  },
  {
    name: 'jest.config.mjs',
    content: jestContent,
    coverFile: false,
  },
  {
    name: 'simple.test.mjs',
    relativePath: 'test',
    content: jestSimpleTestContent,
    coverFile: true,
  },
];

initialEnvironment({
  mainFileContentList: mainFileContentList,
  packageFileContentList: packageFileContentList,
  mainScripts: {
    ...mainCustomPackageFile,
    ...mainNecessaryPackageFile,
  },
  childScripts: {
    ...childrenCustomPackageFile,
    ...childrenNecessaryPackageFile,
  },
});
