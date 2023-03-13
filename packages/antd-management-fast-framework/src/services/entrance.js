import { getGuid, logDebug, request, requestMode } from 'easy-soft-utility';

import {
  getSignInApi,
  getSignInCaptchaApi,
  getSignInSimulationData,
  getSignOutApi,
  getTokenName,
} from 'antd-management-fast-common';

export async function signInData(parameters) {
  return request({
    api: getSignInApi(),
    params: parameters,
  });
}

export async function signInDataSimulation(parameters) {
  const simulation = {
    currentAuthority: [],
    ...getSignInSimulationData(),
  };

  simulation[getTokenName()] = getGuid();

  logDebug(simulation, 'signIn simulation data');

  return request({
    api: `/entrance/signInSimulation`,
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

export async function getCaptchaData(parameters) {
  return request({
    api: getSignInCaptchaApi(),
    params: parameters,
  });
}

export async function getCaptchaDataSimulation(parameters) {
  const simulation = {
    image: '',
  };

  simulation[getTokenName()] = getGuid();

  logDebug(simulation, 'getCaptcha simulation data');

  return request({
    api: `/entrance/getCaptchaSimulation`,
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

export async function signOutData(parameters) {
  return request({
    api: getSignOutApi(),
    params: parameters,
  });
}

export async function signOutDataSimulation(parameters) {
  const simulation = {};

  simulation[getTokenName()] = getGuid();

  logDebug(simulation, 'signOut simulation data');

  return request({
    api: `/entrance/signOutSimulation`,
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
