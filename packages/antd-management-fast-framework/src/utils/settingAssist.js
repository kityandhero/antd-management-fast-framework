import {
  getDispatch,
  getModelState,
} from 'antd-management-fast-common/es/utils/dva';
import { runtimeSettings } from 'antd-management-fast-common/es/utils/dynamicSetting';
import { recordExecute } from 'antd-management-fast-common/es/utils/tools';

export function configSetting() {
  recordExecute('configSetting');

  const dispatch = getDispatch();

  dispatch({
    type: 'schedulingControl/configSetting',
    payload: runtimeSettings,
    alias: 'setting',
  });
}

export function getSetting() {
  recordExecute('getSetting');

  const state = getModelState('schedulingControl');

  const { setting } = {
    ...{ setting: {} },
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
