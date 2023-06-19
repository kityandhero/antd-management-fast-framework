import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/hostService/pageList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/hostService/get',
    params: parameters,
  });
}

export async function changeData(parameters) {
  return request({
    api: '/hostService/change',
    params: parameters,
  });
}

export async function refreshAllStatusData(parameters) {
  return request({
    api: '/hostService/refreshAllStatus',
    params: parameters,
  });
}
