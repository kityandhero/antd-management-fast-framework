import { request } from 'easy-soft-utility';

export const getGraphicalTreeDataApiAddress = '/organization/getGraphicalTree';

export async function getGraphicalTreeData(parameters) {
  return request({
    api: getGraphicalTreeDataApiAddress,
    params: parameters,
  });
}

export const getGraphicalDirectDepartmentDataApiAddress =
  '/organization/getGraphicalDirectDepartment';

export async function getGraphicalDirectDepartmentData(parameters) {
  return request({
    api: getGraphicalDirectDepartmentDataApiAddress,
    params: parameters,
  });
}

export const getGraphicalSingleSubsidiaryDepartmentDataApiAddress =
  '/organization/getGraphicalSingleSubsidiaryDepartment';

export async function getGraphicalSingleSubsidiaryDepartmentData(parameters) {
  return request({
    api: getGraphicalSingleSubsidiaryDepartmentDataApiAddress,
    params: parameters,
  });
}
