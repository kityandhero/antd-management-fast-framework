import { request } from 'antd-management-fast-common/es/utils/requestAssistor';

export async function getData(params) {
  return request({
    api: `/CurrentSystem/get`,
    params,
  });
}
