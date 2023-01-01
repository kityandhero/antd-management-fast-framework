import { request } from 'antd-management-fast-common/es/utils/requestAssistor';

export async function initData(params) {
  return request({
    api: `/flowEditor/init`,
    params,
    virtualSuccessResponse: {
      data: {},
    },
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
