import { request } from 'antd-management-fast-common/es/utils/requestAssistor';

export default async function queryError(code) {
  return request({
    api: `/api/${code}`,
  });
}
