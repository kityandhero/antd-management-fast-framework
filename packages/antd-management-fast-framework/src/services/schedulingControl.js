import { datetimeFormat } from 'antd-management-fast-common/es/utils/constants';
import { defaultSettingsLayoutCustom } from 'antd-management-fast-common/es/utils/defaultSettingsSpecial';
import { request } from 'antd-management-fast-common/es/utils/requestAssistor';
import {
  formatDatetime,
  getNow,
  recordDebug,
} from 'antd-management-fast-common/es/utils/tools';

export async function getMetaDataData(params) {
  return request({
    api: defaultSettingsLayoutCustom.getMetaDataPath(),
    params,
  });
}

export async function getMetaDataSimulationData(params) {
  const simulation = {
    ...{
      time: formatDatetime(getNow(), datetimeFormat.monthDayHourMinuteSecond),
    },
  };

  recordDebug(
    `getMetaDataData simulation meta data silent data: ${JSON.stringify(
      simulation,
    )}`,
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

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
