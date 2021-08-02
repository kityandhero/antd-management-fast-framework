import { history } from 'umi';
import { message } from 'antd';

import { showRuntimeErrorMessage } from '../../src/utils/tools';
import { getToken } from '../../src/utils/globalStorageAssist';

/**
 * 是否使用模拟访问
 *
 * @export
 * @returns
 */
export function transferToVirtualAccess() {
  // return process.env.NODE_ENV === 'development';
  return true;
  // return false;
}

/**
 * 封装模拟的登录验证
 *
 * @returns
 */
function apiVirtualAuthorize() {
  const tokenValue = getToken;
  return (tokenValue || '') !== '';
}

/**
 * 封装模拟的错误返回
 *
 * @export
 * @param {*} statusCode
 * @param {*} messageText
 * @param {boolean} [needAuthorize=true]
 * @returns
 */
export function apiVirtualFailData(
  statusCode,
  messageText,
  needAuthorize = true,
) {
  if (needAuthorize) {
    if (apiVirtualAuthorize()) {
      showRuntimeErrorMessage(messageText);

      return {
        code: statusCode,
        message: messageText,
      };
    }

    return {
      code: 2001,
      msg: '未授权的访问',
    };
  }

  showRuntimeErrorMessage(messageText);
  return {
    code: statusCode,
    message: messageText,
  };
}

/**
 * 封装模拟的正确返回
 *
 * @export
 * @param {*} successData
 * @param {boolean} [needAuthorize=true]
 * @returns
 */
export function apiVirtualSuccessData(successData, needAuthorize = true) {
  if (needAuthorize) {
    if (apiVirtualAuthorize()) {
      return {
        code: 200,
        msg: '',
        ...successData,
      };
    }

    return {
      code: 2001,
      msg: '未授权的访问',
    };
  }

  return {
    code: 200,
    msg: '',
    ...successData,
  };
}

/**
 * 封装正确的虚拟访问
 *
 * @export
 * @param {*} dataVirtual
 * @param {boolean} [needAuthorize=true]
 * @returns
 */
export async function apiVirtualSuccessAccess(
  dataVirtual,
  needAuthorize = true,
) {
  let result = {};

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiVirtualSuccessData(dataVirtual, needAuthorize));
    }, 300);
  }).then((data) => {
    result = data;
  });

  message.info('由虚拟访问返回');

  const { code } = result;

  if (code === 2001) {
    history.push('/user/login');
  }

  return result;
}

/**
 * 封装失败的虚拟访问
 *
 * @export
 * @param {*} dataVirtual
 * @param {boolean} [needAuthorize=true]
 * @returns
 */
export async function apiVirtualFailAccess(dataVirtual, needAuthorize = true) {
  let result = {};

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiVirtualFailData(dataVirtual, needAuthorize));
    }, 300);
  }).then((data) => {
    result = data;
  });

  message.info('由虚拟访问返回');

  const { code, message: messageText } = result;

  if (code === 2001) {
    history.push('/user/login');
  } else if (code !== 200) {
    message.warn(messageText);
  }

  return result;
}

/**
 * 封装模拟访问
 *
 * @export
 * @param {*} dataBuildFunction
 * dataBuildFunction示例
 * apiVirtualAccess(resolve => {
 *   setTimeout(() => {
 *     const { password, userName, type } = params;
 *     if (password === '888888' && userName === 'admin') {
 *       resolve(
 *         apiVirtualSuccessData(
 *           {
 *             id: 1,
 *             token: '059b1900-7d7b-40aa-872f-197d04b03385',
 *             userName: 'admin',
 *             type,
 *             role: [],
 *             currentAuthority: 'admin',
 *           },
 *           false
 *         )
 *       );
 *     } else if (password === '123456' && userName === 'user') {
 *       resolve(
 *         apiVirtualSuccessData(
 *           {
 *             id: 2,
 *             token: 'a9f98dab-00c1-4929-b79f-bacd1a7846d0',
 *             userName: 'user',
 *             type,
 *             role: [],
 *             currentAuthority: 'user',
 *           },
 *           false
 *         )
 *       );
 *     } else {
 *       resolve(apiVirtualFailData(1001, '用户名不存在或密码错误', false));
 *     }
 *   }, 300);
 * });
 * @returns
 */
export async function apiVirtualAccess(dataBuildFunction) {
  let result = {};

  await new Promise((resolve) => {
    if (typeof dataBuildFunction === 'function') {
      setTimeout(() => {
        dataBuildFunction(resolve);
      }, 200);
    }
  }).then((data) => {
    result = data;
  });

  message.info('由虚拟访问返回');

  const { code, message: messageText } = result;

  if (code !== 200) {
    message.warn(messageText);
  }

  return result;
}
