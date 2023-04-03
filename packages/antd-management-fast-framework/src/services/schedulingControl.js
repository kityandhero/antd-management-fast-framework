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

export async function refreshMetaDataData(parameters) {
  return request({
    api: getMetaDataApi(),
    params: parameters,
  });
}

export async function refreshMetaDataSimulation(parameters) {
  const simulation = {
    time: formatDatetime({
      data: getNow(),
      format: datetimeFormat.monthDayHourMinuteSecond,
    }),
  };

  return request({
    api: `/schedulingControl/refreshMetaDataSimulation`,
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

export async function refreshSingleListApplicationListData(parameters) {
  return request({
    api: getApplicationListDataApi(),
    params: parameters,
  });
}

export async function refreshSingleListApplicationListDataSimulation(
  parameters,
) {
  return request({
    api: `/schedulingControl/refreshApplicationListDataSimulation`,
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
