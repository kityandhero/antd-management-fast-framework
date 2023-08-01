import { request } from 'easy-soft-utility';

export async function getGraphicalTreeData(parameters) {
  return request({
    api: '/organization/getGraphicalTree',
    params: parameters,
  });
}
