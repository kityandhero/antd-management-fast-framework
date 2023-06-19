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

export async function deleteData(parameters) {
  return request({
    api: '/sqlLog/delete',
    params: parameters,
  });
}

export async function deleteMultiData(parameters) {
  return request({
    api: '/sqlLog/deleteMulti',
    params: parameters,
  });
}
