import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/hostService/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/hostService/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const changeDataApiAddress = '/hostService/change';

export async function changeData(parameters) {
  return request({
    api: changeDataApiAddress,
    params: parameters,
  });
}

export const refreshAllStatusDataApiAddress = '/hostService/refreshAllStatus';

export async function refreshAllStatusData(parameters) {
  return request({
    api: refreshAllStatusDataApiAddress,
    params: parameters,
  });
}
