import { request } from '@fast-framework/utils/requestAssistor';

export default async function queryError(code) {
  return request({
    api: `/api/${code}`,
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
