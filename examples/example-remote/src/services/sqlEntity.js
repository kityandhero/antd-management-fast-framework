import { request } from 'easy-soft-utility';

export const pageListInfrastructureDataApiAddress =
  '/sqlEntity/pageListInfrastructure';

export async function pageListInfrastructureData(parameters) {
  return request({
    api: pageListInfrastructureDataApiAddress,
    params: parameters,
  });
}

export const pageListBusinessDataApiAddress = '/sqlEntity/pageListBusiness';

export async function pageListBusinessData(parameters) {
  return request({
    api: pageListBusinessDataApiAddress,
    params: parameters,
  });
}

export const getInfrastructureDataApiAddress = '/sqlEntity/getInfrastructure';

export async function getInfrastructureData(parameters) {
  return request({
    api: getInfrastructureDataApiAddress,
    params: parameters,
  });
}

export const getBusinessDataApiAddress = '/sqlEntity/getBusiness';

export async function getBusinessData(parameters) {
  return request({
    api: getBusinessDataApiAddress,
    params: parameters,
  });
}
