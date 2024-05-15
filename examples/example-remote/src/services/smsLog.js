import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/smsLog/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}
