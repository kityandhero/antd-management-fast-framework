import { datetimeFormat } from 'antd-management-fast-common/es/utils/constants';
import { runtimeSettings } from 'antd-management-fast-common/es/utils/dynamicSetting';
import { request } from 'antd-management-fast-common/es/utils/requestAssistor';
import {
  formatDatetime,
  getNow,
  logDebug,
} from 'antd-management-fast-common/es/utils/tools';

export async function getMetaDataData(params) {
  return request({
    api: runtimeSettings.getMetaDataPath(),
    params,
  });
}

export async function getMetaDataSimulation(params) {
  const simulation = {
    ...{
      time: formatDatetime(getNow(), datetimeFormat.monthDayHourMinuteSecond),
    },
  };

  logDebug(
    `getMetaDataData use simulation mode, if need set it from api, please config getMetaDataPath.`,
  );

  return request({
    api: `/schedulingControl/getMetaDataSimulation`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}

export async function singleListAppListData(params) {
  return request({
    api: runtimeSettings.getAppListDataPath(),
    params,
  });
}

export async function singleListAppListDataSimulation(params) {
  logDebug(
    `singleListAppList use simulation mode, if need set it from api, please config getAppListDataPath.`,
  );

  return request({
    api: `/schedulingControl/singleListAppListDataSimulation`,
    params,
    useVirtualRequest: true,
    virtualNeedAuthorize: false,
    virtualSuccessResponse: {
      data: {},
      list: [],
      extra: {},
    },
  });
}
