/**
generate by easy-soft-develop
*/

import { installDevelopDependencePackages } from 'easy-soft-develop';

import {
  childrenDevelopPackageList,
  childrenSpecialDevelopPackageList,
  globalDevelopPackageList,
  mainDevelopPackageList,
} from './config/index.mjs';

installDevelopDependencePackages({
  globalDevelopPackageList,
  mainDevelopPackageList,
  childrenDevelopPackageList,
  childrenSpecialDevelopPackageList,
});
