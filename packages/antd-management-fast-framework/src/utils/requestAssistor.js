import { message } from 'antd';

import { defaultSettingsLayoutCustom } from './defaultSettingsSpecial';
import { clearCustomData, getToken } from './globalStorageAssist';
import remoteRequest from './request';
import {
  corsTarget,
  isFunction,
  isObject,
  isString,
  isUndefined,
  notifyInfo,
  queryStringify,
  recordObject,
  redirectToPath,
  stringIsNullOrWhiteSpace,
} from './tools';
import {
  apiVirtualAccess,
  apiVirtualFailData,
  apiVirtualSuccessData,
} from './virtualRequest';

/**
 * 错误数据模型
 */
function errorCustomData() {
  return {
    code: -1,
    message: '',
    data: null,
    list: [],
    extra: null,
  };
}

/**
 * 数据异常通知
 * @param {*} d 异常数据
 */
function dataExceptionNotice(d) {
  const { code, message: messageText } = d;
  const c = errorCustomData();

  const lastCustomMessage = window.lastCustomMessage || {
    code: -1,
    message: '',
    time: new Date().getTime(),
  };

  if (code !== c.code) {
    if ((messageText || '') !== '') {
      const currentTime = new Date().getTime();
      if (code === lastCustomMessage.code) {
        if (currentTime - lastCustomMessage.time > 800) {
          requestAnimationFrame(() => {
            message.error(messageText);
          });

          window.lastCustomMessage = {
            code,
            message: messageText,
            time: currentTime,
          };
        }
      } else {
        requestAnimationFrame(() => {
          message.error(messageText);
        });

        window.lastCustomMessage = {
          code,
          message: messageText,
          time: currentTime,
        };
      }
    }

    const entrancePath = defaultSettingsLayoutCustom.getEntrancePath();
    const authenticationFailCode =
      defaultSettingsLayoutCustom.getAuthenticationFailCode();

    if (code === authenticationFailCode) {
      if (stringIsNullOrWhiteSpace(entrancePath)) {
        throw new Error('缺少登录页面路径配置');
      }

      requestAnimationFrame(() => {
        redirectToPath(entrancePath);
      });
    }
  }
}

/**
 * 预处理单项数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRemoteSingleData(d) {
  const { code, message: messageText } = d || errorCustomData();
  let v = {};

  const apiSuccessCode = defaultSettingsLayoutCustom.getApiSuccessCode();

  if (code === apiSuccessCode) {
    const { data, extra } = d;
    v = {
      code,
      message: messageText,
      data: data || {},
      extra: extra || {},
      dataSuccess: true,
    };
  } else {
    v = {
      code,
      message: messageText || '网络异常',
      data: null,
      extra: null,
      dataSuccess: false,
    };

    dataExceptionNotice(v);
  }

  return v;
}

/**
 * 预处理集合数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRemoteListData(d, itemHandler) {
  const { code, message: messageText } = d || errorCustomData();
  let v = {};

  if (code === defaultSettingsLayoutCustom.getApiSuccessCode()) {
    const { list: listData, extra: extraData } = d;
    const list = (listData || []).map((item, index) => {
      let o = item;

      if ((o.key || null) == null) {
        o.key = `list-${index}`;
      }

      if (typeof itemHandler === 'function') {
        o = itemHandler(o);
      }
      return o;
    });

    v = {
      code,
      message: messageText,
      count: (list || []).length,
      list,
      extra: extraData,
      dataSuccess: true,
    };
  } else {
    v = {
      code,
      message: messageText || '网络异常',
      count: 0,
      list: [],
      extra: null,
      dataSuccess: false,
    };

    dataExceptionNotice(v);
  }

  return v;
}

/**
 * 预处理分页数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRemotePageListData(d, listItemHandler) {
  const { code, message: messageText } = d || errorCustomData();
  let v = {};

  if (code === defaultSettingsLayoutCustom.getApiSuccessCode()) {
    const { list: listData, extra: extraData } = d;
    const { pageNo } = extraData;
    const list = (listData || []).map((item, index) => {
      let o = item;

      if ((o.key || null) == null) {
        o.key = `${pageNo}-${index}`;
      }

      if (typeof listItemHandler === 'function') {
        o = listItemHandler(o);
      }
      return o;
    });

    v = {
      code,
      message: messageText,
      count: (list || []).length,
      list,
      pagination: {
        total: extraData.total,
        pageSize: extraData.pageSize,
        current: parseInt(pageNo || 1, 10) || 1,
      },
      extra: extraData,
      dataSuccess: true,
    };
  } else {
    v = {
      code,
      message: messageText || '网络异常',
      count: 0,
      list: [],
      extra: null,
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
      },
      dataSuccess: false,
    };

    dataExceptionNotice(v);
  }
  return v;
}

/**
 * 预处理数据请求
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRequestParams(params, customHandle) {
  let submitData = params || {};

  if (typeof customHandle === 'function') {
    submitData = customHandle(submitData);
  }

  return submitData;
}

/**
 * 常规数据出库辅助方法
 * @param {*} state
 * @param {*} action
 * @param {*} callback
 * @returns
 */
export function handleCommonDataAssist(state, action, callback = null) {
  const { payload: d, alias } = action;

  let v = pretreatmentRemoteSingleData(d);

  if (isFunction(callback)) {
    v = callback(v);
  }

  if (isUndefined(alias)) {
    return {
      ...state,
      data: v,
      fromRemote: true,
    };
  }

  const aliasData = {};
  aliasData[alias] = v;

  return {
    ...state,
    ...aliasData,
    fromRemote: true,
  };
}

/**
 * handleListDataAssist
 * @param {*} state
 * @param {*} action
 * @param {*} pretreatment
 * @param {*} callback
 * @returns
 */
export function handleListDataAssist(
  state,
  action,
  pretreatment = null,
  callback = null,
) {
  const { payload: d, alias } = action;

  let v = pretreatmentRemoteListData(d, pretreatment);

  if (isFunction(callback)) {
    v = callback(v);
  }

  if (isUndefined(alias)) {
    return {
      ...state,
      data: v,
      fromRemote: true,
    };
  }

  const aliasData = {};
  aliasData[alias] = v;

  return {
    ...state,
    ...aliasData,
    fromRemote: true,
  };
}

export function handlePageListDataAssist(
  state,
  action,
  pretreatment = null,
  callback = null,
) {
  const { payload: d, alias } = action;

  let v = pretreatmentRemotePageListData(d, pretreatment);

  if (isFunction(callback)) {
    v = callback(v);
  }

  if (isUndefined(alias)) {
    return {
      ...state,
      data: v,
      fromRemote: true,
    };
  }

  const aliasData = {};
  aliasData[alias] = v;

  return {
    ...state,
    ...aliasData,
    fromRemote: true,
  };
}

/**
 * begin request（remote request / local virtual requests）
 * @param {*} api [string]: request address
 * @param {*} params [object]: request params
 * @param {*} method [string]: ’GET‘ or ’POST‘, default is ’POST‘
 * @param {*} useVirtualRequest [bool]: whether to apply virtual requests
 * @param {*} showUseVirtualRequestMessage [bool]: whether display virtual request message prompt
 * @param {*} virtualSuccessResponse [object]: virtual request success response data
 * @param {*} virtualFailResponse [object]: virtual request fail response data
 * @param {*} virtualRequestResult [object]:mandatory set virtual request result, generally used to debug
 * @param {*} virtualNeedAuthorize [object]:set virtual request whether check token， only check mull or empty, generally used to debug
 * @returns
 */
export async function request({
  api,
  urlParams = null,
  params = {},
  method = 'POST',
  useVirtualRequest = defaultSettingsLayoutCustom.getUseVirtualRequest(),
  showUseVirtualRequestMessage = defaultSettingsLayoutCustom.getShowUseVirtualRequestMessage(),
  showUseVirtualRequestMessageDelay = 500,
  virtualRequestDelay = 0,
  virtualSuccessResponse = {},
  virtualFailResponse = {
    code: 1001,
    message: '虚拟未知错误',
  },
  virtualRequestResult = true,
  virtualNeedAuthorize = true,
}) {
  let apiVersion = defaultSettingsLayoutCustom.getApiVersion();

  if (!isString(apiVersion)) {
    recordObject(apiVersion);

    throw new Error('apiVersion is not string');
  }

  if (!isString(api)) {
    recordObject(api);

    throw new Error('api is not string');
  }

  if (!stringIsNullOrWhiteSpace(apiVersion)) {
    apiVersion = `/${apiVersion}/`;
  }

  let url = `${apiVersion}${api}`.replace('//', '/');

  if ((urlParams || null) != null) {
    if (isString(urlParams)) {
      url = `${url}?${urlParams}`;
    }

    if (isObject(urlParams)) {
      url = `${url}?${queryStringify(urlParams)}`;
    }
  }

  const showRequestInfo = defaultSettingsLayoutCustom.getShowRequestInfo();

  if (useVirtualRequest) {
    if (showUseVirtualRequestMessage) {
      setTimeout(
        () => {
          const text = '由虚拟访问返回';

          notifyInfo(text);
        },
        showUseVirtualRequestMessageDelay > 0
          ? showUseVirtualRequestMessageDelay
          : 0,
      );
    }

    let result = {};
    let verifyToken = false;

    if (virtualNeedAuthorize) {
      const token = getToken();

      if (!stringIsNullOrWhiteSpace(token)) {
        verifyToken = true;
      }
    }

    if (virtualNeedAuthorize && !verifyToken) {
      const entrancePath = defaultSettingsLayoutCustom.getEntrancePath();

      if (stringIsNullOrWhiteSpace(entrancePath)) {
        throw new Error('缺少登录页面路径配置');
      }

      setTimeout(() => {
        clearCustomData();

        message.info('登陆超时，请重新登录！', 0.6);

        redirectToPath(entrancePath);
      }, 400);
    } else {
      result = await apiVirtualAccess({
        virtualRequestDelay,
        dataBuild: (resolve) => {
          if (virtualRequestResult) {
            resolve(
              apiVirtualSuccessData({
                remoteResponse: virtualSuccessResponse,
                needAuthorize: virtualNeedAuthorize,
              }),
            );
          } else {
            resolve(
              apiVirtualFailData({
                ...(virtualFailResponse || {}),
                ...{ needAuthorize: virtualNeedAuthorize },
              }),
            );
          }
        },
      });
    }

    if (showRequestInfo) {
      recordObject({
        url,
        useVirtualRequest,
        virtualResponse: result,
        params,
      });
    }

    return result;
  }

  if (showRequestInfo) {
    recordObject({
      api,
      apiVersion,
      apiChange: url,
      params,
    });
  }

  return remoteRequest(url, {
    method,
    data: params,
  });
}

/**
 * 获取配置的 api 版本号
 */
export function getApiVersion() {
  const version = defaultSettingsLayoutCustom.getApiVersion();

  return version;
}

/**
 * 构建跨域请求域前缀
 */
export function corsTargetWithApiVersion() {
  let apiVersion = getApiVersion();

  if (!stringIsNullOrWhiteSpace(apiVersion)) {
    apiVersion = `/${apiVersion}`;
  }

  const path = `${corsTarget()}${apiVersion}`;

  return path;
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
