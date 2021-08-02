import request from '../../src/utils/request';
import {
  apiVirtualSuccessAccess,
  transferToVirtualAccess,
} from '../customConfig/apiVirtualAccessAssist';
import { getApiVersion } from '../customConfig/config';

export async function getData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      data: {},
    });

    return result;
  }

  return request(`${getApiVersion()}/currentSupplier/get`, {
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
