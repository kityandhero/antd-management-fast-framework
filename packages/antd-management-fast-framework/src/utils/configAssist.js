import {
  initializeApplication,
  setApplicationInitialOption,
} from 'easy-soft-dva';
import {
  getApplicationExternalConfigList,
  getApplicationInitialConfig,
  getApplicationMergeConfig,
  isFunction,
  logDevelop,
  removeCurrentOperatorCache,
  removeLocalMetaData,
  setProgressStartHandler,
  setProgressStopHandler,
  toString,
} from 'easy-soft-utility';

import {
  getLocalStorageSecretSwitch,
  setEasySoftUtilityHandler,
} from 'antd-management-fast-common';

import { appendEmbedModelBuilder } from '../modelBuilders';

import { loadApplicationInitialData } from './bootstrap';
import { progressBarControlAssist } from './progressBarControlAssist';

let configEnvironmentComplete = false;

export function configEnvironment(otherConfigHandler = null) {
  if (configEnvironmentComplete) {
    return;
  }
  logDevelop('--------------------------------------------');

  setEasySoftUtilityHandler();

  setProgressStartHandler(() => {
    progressBarControlAssist.start();
  });

  setProgressStopHandler(() => {
    progressBarControlAssist.stop();
  });

  if (isFunction(otherConfigHandler)) {
    otherConfigHandler();
  }

  logDevelop('configEnvironment', 'config complete');

  logDevelop('--------------------------------------------');

  logDevelop(getApplicationInitialConfig(), 'initialConfig info');

  logDevelop(
    { externalConfigs: getApplicationExternalConfigList() },
    'externalConfigs info',
  );

  logDevelop(getApplicationMergeConfig(), 'combinedConfig info');

  logDevelop('--------------------------------------------');

  appendEmbedModelBuilder();

  setApplicationInitialOption();

  initializeApplication();

  logDevelop('--------------------------------------------');

  logDevelop({}, [
    'localStorageSecretSwitch',
    toString(getLocalStorageSecretSwitch()),
  ]);

  logDevelop('--------------------------------------------');

  removeCurrentOperatorCache();
  removeLocalMetaData();

  loadApplicationInitialData();
}
