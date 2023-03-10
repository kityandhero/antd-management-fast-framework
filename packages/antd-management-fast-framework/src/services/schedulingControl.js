import {
  datetimeFormat,
  formatDatetime,
  getNow,
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
  return request({
    api: `/schedulingControl/getApplicationListDataSimulation`,
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
