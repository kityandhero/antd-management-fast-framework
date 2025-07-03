import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/subsidiaryFeedbackMessage/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/subsidiaryFeedbackMessage/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const toggleConfirmDataApiAddress =
  '/subsidiaryFeedbackMessage/toggleConfirm';

export async function toggleConfirmData(parameters) {
  return request({
    api: toggleConfirmDataApiAddress,
    params: parameters,
  });
}

export const repayDataApiAddress = '/subsidiaryFeedbackMessage/repay';

export async function repayData(parameters) {
  return request({
    api: repayDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/subsidiaryFeedbackMessage/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/subsidiaryFeedbackMessage/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/subsidiaryFeedbackMessage/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
