import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/hostServiceLog/pageList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/hostServiceLog/get',
    params: parameters,
  });
}
