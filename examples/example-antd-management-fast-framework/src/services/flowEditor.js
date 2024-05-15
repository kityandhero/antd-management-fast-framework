import { request, requestMode } from 'easy-soft-utility';

export async function initData(parameters) {
  return request({
    api: `/flowEditor/init`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeSuccessResponse: {
      data: {},
    },
  });
}
