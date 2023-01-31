import {
  getDispatch,
  getModelState,
  layoutSettings,
  logDebug,
  logExecute,
} from 'antd-management-fast-common';

let configLayoutSettingComplete = false;

export function configLayoutSetting() {
  logExecute('configLayoutSetting');

  const dispatch = getDispatch();

  logDebug({
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

  logExecute('getLayoutSetting');

  const state = getModelState('schedulingControl');

  const { setting } = {
    ...{ setting: layoutSettings },
    ...state,
  };

  return setting || {};
}
