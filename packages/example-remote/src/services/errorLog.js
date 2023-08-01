import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/errorLog/pageList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/errorLog/get',
    params: parameters,
  });
}

export async function removeData(parameters) {
  return request({
    api: '/errorLog/remove',
    params: parameters,
  });
}

export async function removeMultiData(parameters) {
  return request({
    api: '/errorLog/removeMulti',
    params: parameters,
  });
}
