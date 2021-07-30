import request from '../../lib/utils/request';

import {
  apiVirtualSuccessAccess,
  transferToVirtualAccess,
} from '../customConfig/apiVirtualAccessAssist';
import { getApiVersion } from '@/customConfig/config';

export async function pageListData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      pageSize: 10,
      total: 645,
      pageNo: 1,
      data: [],
    });

    return result;
  }

  return request(`${getApiVersion()}/accessWay/pageList`, {
    method: 'POST',
    data: params,
  });
}

export async function getData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request(`${getApiVersion()}/accessWay/get`, {
    method: 'POST',
    data: params,
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
