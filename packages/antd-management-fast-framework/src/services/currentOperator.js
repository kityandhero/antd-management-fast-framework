import { request, requestMode } from 'easy-soft-utility';

import {
  getCurrentOperatorApi,
  getCurrentOperatorSimulationData,
} from 'antd-management-fast-common';

export async function refreshCurrentOperatorData(parameters) {
  return request({
    api: getCurrentOperatorApi(),
    params: parameters,
  });
}

export async function refreshCurrentOperatorDataSimulation(parameters) {
  const simulation = {
    ...getCurrentOperatorSimulationData(),
  };

  return request({
    api: `/currentOperator/refreshCurrentOperatorSimulation`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeAuthorize: false,
    simulativeSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}
