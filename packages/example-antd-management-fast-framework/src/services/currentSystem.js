import { request } from 'antd-management-fast-common';

export async function getData(params) {
  return request({
    api: `/CurrentSystem/get`,
    params,
  });
}
