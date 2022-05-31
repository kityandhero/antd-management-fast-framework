import { request } from 'antd-management-fast-framework/es/utils/requestAssistor';

export async function getData(params) {
  return request({
    api: `/CurrentSystem/get`,
    params,
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
