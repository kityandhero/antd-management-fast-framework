import { actionCore } from 'antd-management-fast-common/es/utils/actionAssist';
import { getValueByKey } from 'antd-management-fast-common/es/utils/tools';

import { fieldData } from '../Common/data';

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
