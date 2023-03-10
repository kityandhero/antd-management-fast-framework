import { getDispatch, getModelState } from 'easy-soft-dva';
import { logDebug, logExecute } from 'easy-soft-utility';

import { getLayoutSettings } from 'antd-management-fast-common';

let configLayoutSettingComplete = false;

export function configLayoutSetting() {
  logExecute('configLayoutSetting');

  const layoutSettings = getLayoutSettings();

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
    setting: getLayoutSettings(),
    ...state,
  };

  return setting || {};
}
