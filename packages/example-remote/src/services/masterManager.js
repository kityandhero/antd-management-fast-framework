import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/masterManager/pageList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/masterManager/get',
    params: parameters,
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: '/masterManager/addBasicInfo',
    params: parameters,
  });
}

export async function resetPasswordData(parameters) {
  return request({
    api: '/masterManager/resetPassword',
    params: parameters,
  });
}

export async function deleteData(parameters) {
  return request({
    api: '/masterManager/delete',
    params: parameters,
  });
}
