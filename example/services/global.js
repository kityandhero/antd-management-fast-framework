import request from '../../src/utils/request';
import {
  apiVirtualSuccessAccess,
  transferToVirtualAccess,
} from '../customConfig/apiVirtualAccessAssist';
import { getApiVersion } from '../customConfig/config';

/**
 * 综合数据
 * @param {*} params
 */
export async function getData(params) {
  if (transferToVirtualAccess()) {
    const result = await apiVirtualSuccessAccess({
      code: 200,
      success: true,
      message: 'success',
      data: {},
    });

    return result;
  }

  return request(`${getApiVersion()}/MetaData/get`, {
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
