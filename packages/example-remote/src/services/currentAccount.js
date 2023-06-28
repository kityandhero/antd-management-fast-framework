import { request } from 'easy-soft-utility';

export async function getData(parameters) {
  return request({
    api: '/currentAccount/get',
    params: parameters,
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: '/currentAccount/updateBasicInfo',
    params: parameters,
  });
}

export async function changePasswordData(parameters) {
  return request({
    api: '/currentAccount/changePassword',
    params: parameters,
  });
}
