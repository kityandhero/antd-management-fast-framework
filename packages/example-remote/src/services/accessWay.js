import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/accessWay/pageList',
    params: parameters,
  });
}
