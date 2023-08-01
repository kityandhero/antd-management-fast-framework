import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/uploadHistory/pageList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/uploadHistory/get',
    params: parameters,
  });
}

export async function removeData(parameters) {
  return request({
    api: '/uploadHistory/remove',
    params: parameters,
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: '/uploadHistory/refreshCache',
    params: parameters,
  });
}
