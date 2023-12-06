import { request } from 'easy-soft-utility';

export const getDataApiAddress = '/currentAccount/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/currentAccount/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const changePasswordDataApiAddress = '/currentAccount/changePassword';

export async function changePasswordData(parameters) {
  return request({
    api: changePasswordDataApiAddress,
    params: parameters,
  });
}
