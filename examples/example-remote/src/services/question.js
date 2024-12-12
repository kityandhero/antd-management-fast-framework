import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/question/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const pageListWithoutQuestionnaireDataApiAddress =
  '/question/pageListWithoutQuestionnaire';

export async function pageListWithoutQuestionnaireData(parameters) {
  return request({
    api: pageListWithoutQuestionnaireDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/question/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/question/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/question/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateWhetherCorrectDataApiAddress =
  '/question/updateWhetherCorrect';

export async function updateWhetherCorrectData(parameters) {
  return request({
    api: updateWhetherCorrectDataApiAddress,
    params: parameters,
  });
}

export const updateAnswerDataApiAddress = '/question/updateAnswer';

export async function updateAnswerData(parameters) {
  return request({
    api: updateAnswerDataApiAddress,
    params: parameters,
  });
}

export const setOnlineDataApiAddress = '/question/setOnline';

export async function setOnlineData(parameters) {
  return request({
    api: setOnlineDataApiAddress,
    params: parameters,
  });
}

export const setOfflineDataApiAddress = '/question/setOffline';

export async function setOfflineData(parameters) {
  return request({
    api: setOfflineDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/question/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/question/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const practiceDataApiAddress = '/question/practice';

export async function practiceData(parameters) {
  return request({
    api: practiceDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress = '/question/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}

export const uploadImageDataApiAddress = '/question/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}
