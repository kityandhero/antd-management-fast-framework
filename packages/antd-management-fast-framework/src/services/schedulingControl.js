import {
  datetimeFormat,
  formatDatetime,
  getNow,
  logDebug,
  request,
  requestMode,
} from 'easy-soft-utility';

import {
  getApplicationListDataApi,
  getMetaDataApi,
} from 'antd-management-fast-common';

export async function getMetaDataData(parameters) {
  return request({
    api: getMetaDataApi(),
    params: parameters,
  });
}

export async function getMetaDataSimulation(parameters) {
  const simulation = {
    time: formatDatetime(getNow(), datetimeFormat.monthDayHourMinuteSecond),
  };

  logDebug(
    `getMetaDataData use simulation mode, if need set it from api, please config getMetaDataApi.`,
  );

  return request({
    api: `/schedulingControl/getMetaDataSimulation`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeAuthorize: false,
    simulativeSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}

export async function singleListApplicationListData(parameters) {
  return request({
    api: getApplicationListDataApi(),
    params: parameters,
  });
}

export async function singleListApplicationListDataSimulation(parameters) {
  logDebug(
    `singleListAppList use simulation mode, if need set it from api, please config getApplicationListDataApi.`,
  );

  return request({
    api: `/schedulingControl/singleListApplicationListDataSimulation`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeAuthorize: false,
    simulativeSuccessResponse: {
      data: {},
      list: [],
      extra: {},
    },
  });
}
