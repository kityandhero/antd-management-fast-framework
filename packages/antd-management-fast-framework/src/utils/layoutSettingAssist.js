import {
  getDispatch,
  getModelState,
} from 'antd-management-fast-common/es/utils/dva';
import { layoutSettings } from 'antd-management-fast-common/es/utils/dynamicSetting';
import {
  recordDebug,
  recordExecute,
} from 'antd-management-fast-common/es/utils/tools';

let configLayoutSettingComplete = false;

export function configLayoutSetting() {
  recordExecute('configLayoutSetting');

  const dispatch = getDispatch();

  recordDebug({
    layoutSettings,
  });

  dispatch({
    type: 'schedulingControl/configLayoutSetting',
    payload: layoutSettings,
    alias: 'setting',
  });
}

export function getLayoutSetting() {
  if (!configLayoutSettingComplete) {
    configLayoutSetting();

    configLayoutSettingComplete = true;
  }

  recordExecute('getLayoutSetting');

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
