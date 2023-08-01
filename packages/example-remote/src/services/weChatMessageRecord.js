import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/weChatMessageRecord/pageList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/weChatMessageRecord/get',
    params: parameters,
  });
}
