import { getValueByKey, recordError } from 'antd-management-fast-framework/es/utils/tools';
import { actionCore } from 'antd-management-fast-framework/es/utils/actionAssist';

import { fieldData } from '../Common/data';

function getApiData(props) {
  const { accessWay } = props;

  if ((accessWay || null) == null) {
    recordError('getApiData has some undefined error');
  }

  const { data } = accessWay;

  if ((data || null) == null) {
    recordError('data:getApiData has some undefined error');
  }

  return data;
}

export async function refreshCacheAction({ target, handleData, successCallback, successMessage }) {
  actionCore({
    api: 'accessWay/refreshCache',
    params: {
      accessWayId: getValueByKey({
        data: handleData,
        key: fieldData.accessWayId.name,
      }),
    },
    getApiData: (props) => {
      const {
        accessWay: { data },
      } = props;

      return data;
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
