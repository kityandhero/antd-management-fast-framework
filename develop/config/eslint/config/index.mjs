/**
generate by easy-soft-develop
*/

import babelParser from '@babel/eslint-parser';
import typescriptParser from '@typescript-eslint/parser';
import globals from 'globals';
import js from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import unicorn from 'eslint-plugin-unicorn';
import pluginPromise from 'eslint-plugin-promise';

import { rules, rulesX } from './items/rules/index.mjs';
import { parserJsOptions, parserTsOptions } from './items/parser/index.mjs';
import { pluginCollection, pluginXCollection } from './items/plugins/index.mjs';
import { extendCollection } from './items/extends/index.mjs';
import { settings } from './items/settings/index.mjs';
import { ignoreCollection } from './items/ignores/index.mjs';

const configJs = {
  files: ['**/*.js', '**/*.cjs', '**/*.mjs'],
  extends: [...extendCollection],
  languageOptions: {
    globals: {
      ...globals.es2015,
      ...globals.browser,
      ...globals.commonjs,
      ...globals.jest,
      ...globals.worker,
      ...globals.node,
    },
    parser: babelParser,
    parserOptions: parserJsOptions,
  },
  plugins: {
    ...pluginCollection,
  },
  rules: rules,
  settings: settings,
  ignores: [...ignoreCollection],
};

const configJsx = {
  files: ['**/*.jsx'],
  extends: [...extendCollection],
  languageOptions: {
    globals: {
      ...globals.es2015,
      ...globals.browser,
      ...globals.commonjs,
      ...globals.jest,
      ...globals.worker,
      ...globals.node,
    },
    parser: babelParser,
    parserOptions: parserJsOptions,
  },
  plugins: {
    ...pluginXCollection,
  },
  rules: rulesX,
  settings: settings,
  ignores: [...ignoreCollection],
};

const configTs = {
  files: ['**/*.ts', '**/*.tsx'],
  extends: [...extendCollection],
  languageOptions: {
    globals: {
      ...globals.es2015,
      ...globals.browser,
      ...globals.commonjs,
      ...globals.jest,
      ...globals.worker,
      ...globals.node,
    },
    parser: typescriptParser,
    parserOptions: parserTsOptions,
  },
  plugins: {
    ...pluginCollection,
  },
  rules: rules,
  settings: settings,
  ignores: [...ignoreCollection],
};

export const configCollection = [
  globalIgnores(ignoreCollection),
  js.configs.recommended,
  {
    files: ['**/*.{jsx,tsx}'],
    ...reactPlugin.configs.flat.recommended,
  },
  reactPlugin.configs.flat['jsx-runtime'],
  unicorn.configs.recommended,
  pluginPromise.configs['flat/recommended'],
  configJs,
  configJsx,
  configTs,
  eslintPluginPrettierRecommended,
];
