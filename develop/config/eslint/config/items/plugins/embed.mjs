/**
generate by easy-soft-develop
*/

// import { fixupPluginRules } from '@eslint/compat';
import reactPlugin from 'eslint-plugin-react';
// import unicorn from 'eslint-plugin-unicorn';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginImport from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';

export const pluginCollection = {
  // unicorn,
  'simple-import-sort': simpleImportSort,
  import: eslintPluginImport,
  prettier,
};

export const pluginXCollection = {
  // react: fixupPluginRules(reactPlugin),
  react: reactPlugin,
  // unicorn,
  'simple-import-sort': simpleImportSort,
  import: eslintPluginImport,
  prettier,
};
