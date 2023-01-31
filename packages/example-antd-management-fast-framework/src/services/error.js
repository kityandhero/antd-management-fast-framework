import { request } from 'antd-management-fast-common';

export default async function queryError(code) {
  return request({
    api: `/api/${code}`,
  });
}
