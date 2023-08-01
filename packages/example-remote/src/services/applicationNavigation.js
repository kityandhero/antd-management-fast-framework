import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/applicationNavigation/pageList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/applicationNavigation/get',
    params: parameters,
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: '/applicationNavigation/addBasicInfo',
    params: parameters,
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: '/applicationNavigation/updateBasicInfo',
    params: parameters,
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: '/applicationNavigation/refreshCache',
    params: parameters,
  });
}

export async function removeData(parameters) {
  return request({
    api: '/applicationNavigation/remove',
    params: parameters,
  });
}

export async function getNavigationItemData(parameters) {
  return request({
    api: '/applicationNavigation/getNavigationItem',
    params: parameters,
  });
}

export async function addNavigationItemData(parameters) {
  return request({
    api: '/applicationNavigation/addNavigationItem',
    params: parameters,
  });
}

export async function updateNavigationItemData(parameters) {
  return request({
    api: '/applicationNavigation/updateNavigationItem',
    params: parameters,
  });
}

export async function removeNavigationItemData(parameters) {
  return request({
    api: '/applicationNavigation/removeNavigationItem',
    params: parameters,
  });
}

export async function setNavigationCollectionSortData(parameters) {
  return request({
    api: '/applicationNavigation/setNavigationCollectionSort',
    params: parameters,
  });
}

export async function pageListOperateLogData(parameters) {
  return request({
    api: '/applicationNavigation/pageListOperateLog',
    params: parameters,
  });
}
