import {
  buildPromptModuleInfo,
  getApplicationExternalConfigList,
  getApplicationInitialConfig,
  getApplicationMergeConfig,
  logConfig,
  logDebug,
  setRequestHandler,
  setUrlGlobalPrefix,
} from 'easy-soft-utility';

import {
  getApiVersion,
  setEasySoftUtilityHandler,
} from 'antd-management-fast-common';

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

  setUrlGlobalPrefix(getApiVersion());

  setRequestHandler();

  logDebug(
    buildPromptModuleInfo(
      modulePackageName,
      'configEnvironment -> config complete',
      moduleName,
    ),
  );

  logConfig(getApplicationInitialConfig(), 'initialConfig');

  logConfig(
    { externalConfigs: getApplicationExternalConfigList() },
    'externalConfigs',
  );

  logConfig(getApplicationMergeConfig(), 'combinedConfig');
}
