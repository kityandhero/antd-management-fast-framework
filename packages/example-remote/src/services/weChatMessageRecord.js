import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/weChatMessageRecord/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/weChatMessageRecord/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}
