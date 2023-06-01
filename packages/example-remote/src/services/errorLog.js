import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: `/errorLog/pageList`,
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: `/errorLog/get`,
    params: parameters,
  });
}

export async function deleteData(parameters) {
  return request({
    api: `/errorLog/delete`,
    params: parameters,
  });
}

export async function deleteMultiData(parameters) {
  return request({
    api: `/errorLog/deleteMulti`,
    params: parameters,
  });
}
