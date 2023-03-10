import {
  initializeApplication,
  setApplicationInitialOption,
} from 'easy-soft-dva';
import {
  buildPromptModuleInfo,
  getApplicationExternalConfigList,
  getApplicationInitialConfig,
  getApplicationMergeConfig,
  logDevelop,
} from 'easy-soft-utility';

import { setEasySoftUtilityHandler } from 'antd-management-fast-common';

import { loadApplicationInitialData } from './bootstrap';
import { modulePackageName } from './definition';

let configEnvironmentComplete = false;

/**
 * Module Name.
 */
const moduleName = 'configAssist';

export function configEnvironment() {
  if (configEnvironmentComplete) {
    return;
  }

  setEasySoftUtilityHandler();

  logDevelop(
    buildPromptModuleInfo(
      modulePackageName,
      'configEnvironment -> config complete',
      moduleName,
    ),
  );

  logDevelop('--------------------------------------------');

  logDevelop(getApplicationInitialConfig(), 'initialConfig info');

  logDevelop(
    { externalConfigs: getApplicationExternalConfigList() },
    'externalConfigs info',
  );

  logDevelop(getApplicationMergeConfig(), 'combinedConfig info');

  logDevelop('--------------------------------------------');

  setApplicationInitialOption();

  initializeApplication();

  logDevelop('--------------------------------------------');

  loadApplicationInitialData();
}
