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

export async function deleteData(parameters) {
  return request({
    api: '/generalLog/delete',
    params: parameters,
  });
}

export async function deleteMultiData(parameters) {
  return request({
    api: '/generalLog/deleteMulti',
    params: parameters,
  });
}
