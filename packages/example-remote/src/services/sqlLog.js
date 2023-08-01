import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/sqlLog/pageList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/sqlLog/get',
    params: parameters,
  });
}

export async function removeData(parameters) {
  return request({
    api: '/sqlLog/remove',
    params: parameters,
  });
}

export async function removeMultiData(parameters) {
  return request({
    api: '/sqlLog/removeMulti',
    params: parameters,
  });
}
