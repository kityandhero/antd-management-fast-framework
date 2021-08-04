import { history } from 'umi';
import { message } from 'antd';

import { showRuntimeErrorMessage, isFunction } from './tools';
import { getToken } from './globalStorageAssist';
import { defaultSettingsLayoutCustom } from './defaultSettingsSpecial';

/**
 * 是否使用模拟访问
 *
 * @export
 * @returns
 */
export function transferToVirtualAccess() {
  return defaultSettingsLayoutCustom.getUseVirtualRequest();
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
 */
export function apiVirtualFailData({
  code,
  message: messageText,
  needAuthorize = true,
}) {
  if (needAuthorize) {
    if (apiVirtualAuthorize()) {
      showRuntimeErrorMessage(messageText);

      return {
        code,
        message: messageText,
      };
    }

    return {
      code: 2001,
      message: '未授权的访问',
    };
  }

  showRuntimeErrorMessage(message);

  return {
    code,
    message,
  };
}

/**
 * 封装模拟的正确返回
 */
export function apiVirtualSuccessData({ data, needAuthorize = true }) {
  if (needAuthorize) {
    if (apiVirtualAuthorize()) {
      return {
        code: 200,
        message: '',
        ...data,
      };
    }

    return {
      code: 2001,
      message: '未授权的访问',
    };
  }

  return {
    code: 200,
    message: '',
    ...data,
  };
}

/**
 * 封装正确的虚拟访问
 */
export async function apiVirtualSuccessAccess({
  remoteResponse,
  needAuthorize = true,
}) {
  let result = {};

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiVirtualSuccessData({ remoteResponse, needAuthorize }));
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
 */
export async function apiVirtualFailAccess({
  remoteResponse,
  needAuthorize = true,
}) {
  let result = {};

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiVirtualFailData(remoteResponse, needAuthorize));
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
 */
export async function apiVirtualAccess({ dataBuild }) {
  let result = {};

  await new Promise((resolve) => {
    if (isFunction(dataBuild)) {
      setTimeout(() => {
        dataBuild(resolve);
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

//  dataBuild示例
// apiVirtualAccess((resolve) => {
//   setTimeout(() => {
//     const { password, userName, type } = params;
//     if (password === '888888' && userName === 'admin') {
//       resolve(
//         apiVirtualSuccessData(
//           {
//             id: 1,
//             token: '059b1900-7d7b-40aa-872f-197d04b03385',
//             userName: 'admin',
//             type,
//             role: [],
//             currentAuthority: 'admin',
//           },
//           false,
//         ),
//       );
//     } else if (password === '123456' && userName === 'user') {
//       resolve(
//         apiVirtualSuccessData(
//           {
//             id: 2,
//             token: 'a9f98dab-00c1-4929-b79f-bacd1a7846d0',
//             userName: 'user',
//             type,
//             role: [],
//             currentAuthority: 'user',
//           },
//           false,
//         ),
//       );
//     } else {
//       resolve(apiVirtualFailData(1001, '用户名不存在或密码错误', false));
//     }
//   }, 300);
// });

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
