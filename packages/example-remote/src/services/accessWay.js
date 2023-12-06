import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/accessWay/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}
