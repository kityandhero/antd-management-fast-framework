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
