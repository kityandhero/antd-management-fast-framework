import {
  actionCore,
  apiDataConvertCore,
} from 'antd-management-fast-framework/es/utils/actionAssist';
import { getValueByKey } from 'antd-management-fast-framework/es/utils/tools';

import { fieldData } from '../Common/data';

function apiDataConvert(props) {
  return apiDataConvertCore({ props, modelName: 'accessWay' });
}

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'accessWay/refreshCache',
    params: {
      accessWayId: getValueByKey({
        data: handleData,
        key: fieldData.accessWayId.name,
      }),
    },
    apiDataConvert,
    target,
    handleData,
    successCallback,
    successMessage,
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
