import request from '@antd-management-fast-framework/utils/request';
import { getApiVersion } from '@/customConfig/config';

export default async function queryError(code) {
  return request(`${getApiVersion()}/api/${code}`);
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
