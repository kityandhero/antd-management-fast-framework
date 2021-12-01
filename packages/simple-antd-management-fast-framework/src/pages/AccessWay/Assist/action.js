import { getValueByKey, recordError } from 'antd-management-fast-framework/es/utils/tools';
import { getApiDataCore, actionCore } from 'antd-management-fast-framework/es/utils/actionAssist';

import { fieldData } from '../Common/data';

function getApiData(props) {
  return getApiDataCore({ props, modelName: 'accessWay' });
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
    getApiData,
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
