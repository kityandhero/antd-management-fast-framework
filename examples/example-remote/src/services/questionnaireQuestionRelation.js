import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/questionnaireQuestionRelation/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/questionnaireQuestionRelation/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const bindRelationDataApiAddress =
  '/questionnaireQuestionRelation/bindRelation';

export async function bindRelationData(parameters) {
  return request({
    api: bindRelationDataApiAddress,
    params: parameters,
  });
}

export const bindBatchRelationDataApiAddress =
  '/questionnaireQuestionRelation/bindBatchRelation';

export async function bindBatchRelationData(parameters) {
  return request({
    api: bindBatchRelationDataApiAddress,
    params: parameters,
  });
}

export const unbindRelationDataApiAddress =
  '/questionnaireQuestionRelation/unbindRelation';

export async function unbindRelationData(parameters) {
  return request({
    api: unbindRelationDataApiAddress,
    params: parameters,
  });
}

export const setBindSortDataApiAddress =
  '/questionnaireQuestionRelation/setBindSort';

export async function setBindSortData(parameters) {
  return request({
    api: setBindSortDataApiAddress,
    params: parameters,
  });
}

export const setBindScoreDataApiAddress =
  '/questionnaireQuestionRelation/setBindScore';

export async function setBindScoreData(parameters) {
  return request({
    api: setBindScoreDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/questionnaireQuestionRelation/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
