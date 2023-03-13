import { request, requestMode } from 'easy-soft-utility';

import {
  getCurrentOperatorApi,
  getCurrentOperatorSimulationData,
} from 'antd-management-fast-common';

export async function getCurrentOperatorData(parameters) {
  return request({
    api: getCurrentOperatorApi(),
    params: parameters,
  });
}

export async function getCurrentOperatorDataSimulation(parameters) {
  const simulation = {
    ...getCurrentOperatorSimulationData(),
  };

  return request({
    api: `/currentOperator/getCurrentOperatorSimulation`,
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
