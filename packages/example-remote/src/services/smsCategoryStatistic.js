import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/smsCategoryStatistic/pageList',
    params: parameters,
  });
}
