import { request } from 'antd-management-fast-framework/lib/utils/requestAssistor';

/**
 * 综合数据
 * @param {*} params
 */
export async function getData(params) {
  return request({
    api: `/metaData/get`,
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
