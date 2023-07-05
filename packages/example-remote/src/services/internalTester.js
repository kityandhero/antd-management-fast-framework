import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/internalTester/pageList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/internalTester/get',
    params: parameters,
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: '/internalTester/addBasicInfo',
    params: parameters,
  });
}

export async function removeData(parameters) {
  return request({
    api: '/internalTester/remove',
    params: parameters,
  });
}
