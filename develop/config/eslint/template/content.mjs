/**
generate by easy-soft-develop
*/

const mainContent = `/**
generate by easy-soft-develop
*/

import { defineConfig } from 'eslint/config';

import { configCollection } from './develop/config/eslint/config/index.mjs';

export default defineConfig(configCollection);
`;

const packageContent = `/**
generate by easy-soft-develop
*/

import { defineConfig } from 'eslint/config';

import { configCollection } from '../../develop/config/eslint/config/index.mjs';

export default defineConfig(configCollection);
`;

export default {
  mainContent,
  packageContent,
};
