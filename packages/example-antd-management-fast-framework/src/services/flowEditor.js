import { request } from 'antd-management-fast-common';

export async function initData(params) {
  return request({
    api: `/flowEditor/init`,
    params,
    virtualSuccessResponse: {
      data: {},
    },
  });
}
