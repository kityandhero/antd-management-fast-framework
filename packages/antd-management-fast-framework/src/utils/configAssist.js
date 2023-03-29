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
} from 'easy-soft-utility';

import { setEasySoftUtilityHandler } from 'antd-management-fast-common';

import { appendEmbedModelBuilder } from '../modelBuilders';

import { loadApplicationInitialData } from './bootstrap';
import { progressControlAssist } from './progressControlAssist';

let configEnvironmentComplete = false;

export function configEnvironment(otherConfigHandler = null) {
  if (configEnvironmentComplete) {
    return;
  }
  logDevelop('--------------------------------------------');

  setEasySoftUtilityHandler();

  setProgressStartHandler(() => {
    progressControlAssist.startProgressing();
  });

  setProgressStopHandler(() => {
    progressControlAssist.stopProgressing();
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

  removeCurrentOperatorCache();
  removeLocalMetaData();

  loadApplicationInitialData();
}
