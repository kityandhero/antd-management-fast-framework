import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/generalLog/pageList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/generalLog/get',
    params: parameters,
  });
}

export async function removeData(parameters) {
  return request({
    api: '/generalLog/remove',
    params: parameters,
  });
}

export async function removeMultiData(parameters) {
  return request({
    api: '/generalLog/removeMulti',
    params: parameters,
  });
}
