import { request } from 'easy-soft-utility';

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
