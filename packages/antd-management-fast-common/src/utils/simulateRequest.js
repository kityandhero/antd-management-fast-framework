import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  logError,
  logTrace,
  redirectTo,
  showRuntimeError,
  showSimpleWarningMessage,
  showSimpleWarnMessage,
} from 'easy-soft-utility';

import { runtimeSettings } from './dynamicSetting';
import { getToken } from './tokenAssist';

/**
 * 是否使用模拟访问
 *
 * @export
 * @returns
 */
export function transferToSimulateRequest() {
  return runtimeSettings.getUseSimulateRequest();
}

/**
 * 封装模拟的登录验证
 *
 * @returns
 */
function simulateApiAuthorize() {
  const tokenValue = getToken;
  return (tokenValue || '') !== '';
}

/**
 * 封装模拟的错误返回
 */
export function buildApiRequestFailSimulationData({
  remoteResponse,
  code,
  message: messageText,
  needAuthorize = true,
}) {
  if (needAuthorize) {
    if (simulateApiAuthorize()) {
      showRuntimeError({
        message: messageText,
      });

      return {
        code,
        message: messageText,
        success: false,
        ...remoteResponse,
      };
    }

    return {
      code: runtimeSettings.getAuthenticationFailCode(),
      message: '登录失效, 请重新登录',
      success: false,
    };
  }

  showRuntimeError({
    message: messageText,
  });

  return {
    code,
    message: messageText,
    success: false,
    ...remoteResponse,
  };
}

/**
 * 封装模拟的正确返回
 */
export function buildApiRequestSuccessSimulationData({
  remoteResponse,
  needAuthorize = true,
}) {
  if (needAuthorize) {
    if (simulateApiAuthorize()) {
      return {
        code: runtimeSettings.getApiSuccessCode(),
        message: 'success',
        success: true,
        ...remoteResponse,
      };
    }

    return {
      code: runtimeSettings.getAuthenticationFailCode(),
      message: '登录失效, 请重新登录',
      success: false,
    };
  }

  return {
    code: runtimeSettings.getApiSuccessCode(),
    message: 'success',
    success: true,
    ...remoteResponse,
  };
}

/**
 * 封装正确的虚拟访问
 */
export async function simulateApiSuccessRequest({
  remoteResponse,
  needAuthorize = true,
}) {
  let result = {};

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        buildApiRequestSuccessSimulationData({
          remoteResponse,
          needAuthorize,
        }),
      );
    }, 300);
  })
    .then((data) => {
      result = data;

      return data;
    })
    .catch((res) => {
      logError(res);
    });

  const { code } = result;

  if (code === runtimeSettings.getAuthenticationFailCode()) {
    const signInPath = runtimeSettings.getSignInPath();

    if (checkStringIsNullOrWhiteSpace(signInPath)) {
      throw new Error('缺少登录页面路径配置');
    }

    redirectTo(signInPath);
  }

  return result;
}

/**
 * 封装失败的虚拟访问
 */
export async function simulateApiFailRequest({
  remoteResponse,
  needAuthorize = true,
}) {
  let result = {};

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(buildApiRequestFailSimulationData(remoteResponse, needAuthorize));
    }, 300);
  })
    .then((data) => {
      result = data;

      return data;
    })
    .catch((res) => {
      logError(res);
    });

  const { code, message: messageText } = result;

  if (code === runtimeSettings.getAuthenticationFailCode()) {
    const signInPath = runtimeSettings.getSignInPath();

    if (checkStringIsNullOrWhiteSpace(signInPath)) {
      throw new Error('缺少登录页面路径配置');
    }

    redirectTo(signInPath);
  } else if (code !== runtimeSettings.getApiSuccessCode()) {
    showSimpleWarnMessage(messageText);
  }

  return result;
}

/**
 * 封装模拟访问
 */
export async function simulateApiRequest({
  virtualRequestDelay = 200,
  dataBuild,
}) {
  let result = {};

  await new Promise((resolve) => {
    if (isFunction(dataBuild)) {
      setTimeout(
        () => {
          dataBuild(resolve);
        },
        virtualRequestDelay > 0 ? virtualRequestDelay : 0,
      );
    }
  })
    .then((data) => {
      logTrace(`api request is virtual: simulation completed.`);

      result = data;

      return data;
    })
    .catch((res) => {
      logError(res);
    });

  const { code, message: messageText } = result;

  if (code !== runtimeSettings.getApiSuccessCode()) {
    showSimpleWarningMessage(messageText);
  }

  return result;
}
