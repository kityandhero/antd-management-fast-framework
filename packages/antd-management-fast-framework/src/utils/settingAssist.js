import {
  getDispatch,
  getModelState,
} from 'antd-management-fast-common/es/utils/dva';
import { layoutSettings } from 'antd-management-fast-common/es/utils/dynamicSetting';
import {
  recordDebug,
  recordExecute,
} from 'antd-management-fast-common/es/utils/tools';

let configSettingComplete = false;

export function configSetting() {
  recordExecute('configSetting');

  const dispatch = getDispatch();

  recordDebug({
    layoutSettings,
  });

  dispatch({
    type: 'schedulingControl/configSetting',
    payload: layoutSettings,
    alias: 'setting',
  });
}

export function getSetting() {
  if (!configSettingComplete) {
    configSetting();

    configSettingComplete = true;
  }

  recordExecute('getSetting');

  const state = getModelState('schedulingControl');

  const { setting } = {
    ...{ setting: layoutSettings },
    ...state,
  };

  return setting || {};
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
