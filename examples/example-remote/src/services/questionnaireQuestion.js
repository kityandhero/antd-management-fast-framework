import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/questionnaireQuestion/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/questionnaireQuestion/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const bindRelationDataApiAddress = '/questionnaireQuestion/bindRelation';

export async function bindRelationData(parameters) {
  return request({
    api: bindRelationDataApiAddress,
    params: parameters,
  });
}

export const unbindRelationDataApiAddress =
  '/questionnaireQuestion/unbindRelation';

export async function unbindRelationData(parameters) {
  return request({
    api: unbindRelationDataApiAddress,
    params: parameters,
  });
}

export const setBindSortDataApiAddress = '/questionnaireQuestion/setBindSort';

export async function setBindSortData(parameters) {
  return request({
    api: setBindSortDataApiAddress,
    params: parameters,
  });
}

export const setBindScoreDataApiAddress = '/questionnaireQuestion/setBindScore';

export async function setBindScoreData(parameters) {
  return request({
    api: setBindScoreDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/questionnaireQuestion/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
