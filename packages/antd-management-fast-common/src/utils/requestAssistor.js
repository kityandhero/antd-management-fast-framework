import { runtimeSettings } from './dynamicSetting';
import { getToken } from './globalStorageAssist';
import { request as remoteRequest } from './request';
import {
  corsTarget,
  logDebug,
  logObject,
  logText,
  queryStringify,
  recordTrace,
  recordWarn,
  redirectToPath,
  showErrorMessage,
  showInfoMessage,
  trim,
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

  const codeAdjust = toNumber(code);

  if (codeAdjust !== c.code) {
    const currentTime = new Date().getTime();

    if (codeAdjust !== authenticationFailCode) {
      recordWarn(
        `api call failed, code: ${codeAdjust}, message: ${messageText}`,
      );

      if (codeAdjust === toNumber(lastCustomMessage.code)) {
        if (currentTime - lastCustomMessage.time > 800) {
          showErrorMessage({
            message: messageText,
          });

          taroGlobalData.lastCustomMessage = {
            code: codeAdjust,
            message: messageText,
            time: currentTime,
          };
        }
      } else {
        showErrorMessage({
          message: messageText,
        });

        taroGlobalData.lastCustomMessage = {
          code: codeAdjust,
          message: messageText,
          time: currentTime,
        };
      }
    } else {
      logDebug(`api call failed, authentication fail`);
    }

    const signInPath = runtimeSettings.getSignInPath();
    const authenticationFailCode = runtimeSettings.getAuthenticationFailCode();

    if (codeAdjust === authenticationFailCode) {
      if (checkStringIsNullOrWhiteSpace(signInPath)) {
        throw new Error('缺少登录页面路径配置');
      }

      redirectToPath(signInPath);
    }
  }
}

/**
 * 预处理单项数据返回
 *
 * @export
 * @param {*} source 源数据
 * @param {*} pretreatment 源数据预处理
 * @param {*} successCallback 请求成功后的可回调函数
 * @param {*} failCallback 请求失败后的可回调函数
 * @returns
 */
export function pretreatmentRemoteSingleData({
  source,
  pretreatment = null,
  successCallback = null,
  failCallback = null,
}) {
  const { code, message: messageText } = source || errorCustomData();
  let v = {};

  const apiSuccessCode = runtimeSettings.getApiSuccessCode();

  if (code === apiSuccessCode) {
    const { data, extra } = source;

    if (isFunction(pretreatment)) {
      v = pretreatment(source);
    }

    v = {
      code,
      message: messageText,
      data: data || {},
      extra: extra || {},
      dataSuccess: true,
    };

    if (isFunction(successCallback)) {
      successCallback(v);
    }
  } else {
    v = {
      code,
      message: messageText || '网络异常',
      data: null,
      extra: null,
      dataSuccess: false,
    };

    if (isFunction(failCallback)) {
      failCallback(v);
    }

    dataExceptionNotice(v);
  }

  return v;
}

/**
 * 预处理集合数据返回
 *
 * @export
 * @param {*} source
 * @param {*} pretreatment 源数据预处理
 * @param {*} itemPretreatment 源数据项预处理
 * @param {*} successCallback 请求成功后的可回调函数
 * @param {*} failCallback 请求失败后的可回调函数
 * @returns
 */
export function pretreatmentRemoteListData({
  source,
  pretreatment = null,
  itemPretreatment = null,
  successCallback = null,
  failCallback = null,
}) {
  const { code, message: messageText } = source || errorCustomData();
  let v = {};

  if (code === runtimeSettings.getApiSuccessCode()) {
    let sourceAdjust = source;

    if (isFunction(pretreatment)) {
      sourceAdjust = pretreatment(source);
    }

    const { list: listData, extra: extraData } = sourceAdjust;
    const list = (listData || []).map((item, index) => {
      let o = item;

      if ((o.key || null) == null) {
        o.key = `list-${index}`;
      }

      if (isFunction(itemPretreatment)) {
        o = itemPretreatment(o);
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

    if (isFunction(successCallback)) {
      successCallback(v);
    }
  } else {
    v = {
      code,
      message: messageText || '网络异常',
      count: 0,
      list: [],
      extra: null,
      dataSuccess: false,
    };

    if (isFunction(failCallback)) {
      failCallback(v);
    }

    dataExceptionNotice(v);
  }

  return v;
}

/**
 * 预处理分页数据返回
 *
 * @export
 * @param {*} source
 * @param {*} pretreatment 源数据预处理
 * @param {*} itemPretreatment 源数据项预处理
 * @param {*} successCallback 请求成功后的可回调函数
 * @param {*} failCallback 请求失败后的可回调函数
 * @returns
 */
export function pretreatmentRemotePageListData({
  source,
  pretreatment = null,
  itemPretreatment = null,
  successCallback = null,
  failCallback = null,
}) {
  const { code, message: messageText } = source || errorCustomData();
  let v = {};

  const codeAdjust = toNumber(code);

  if (codeAdjust === toNumber(runtimeSettings.getApiSuccessCode())) {
    let sourceAdjust = source;

    if (isFunction(pretreatment)) {
      sourceAdjust = pretreatment(source);
    }

    const { list: listData, extra: extraData } = sourceAdjust;
    const { pageNo } = extraData;
    const list = (listData || []).map((item, index) => {
      let o = item;

      if ((o.key || null) == null) {
        o.key = `${pageNo}-${index}`;
      }

      if (isFunction(itemPretreatment)) {
        o = itemPretreatment(o);
      }

      return o;
    });

    v = {
      code: codeAdjust,
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

    if (isFunction(successCallback)) {
      successCallback(v);
    }
  } else {
    v = {
      code: codeAdjust,
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

    if (isFunction(failCallback)) {
      failCallback(v);
    }

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
 * handleListDataAssist
 * @param {*} state
 * @param {*} action
 * @param {*} pretreatment
 * @param {*} callback
 * @returns
 */
export function handleListDataAssist(state, action, namespace) {
  const { payload: d, callback, pretreatment, alias, cacheData } = action;

  let v = pretreatmentRemoteListData(d, pretreatment);

  if (isFunction(callback)) {
    v = callback(v);
  }

  let result = null;

  if (isUndefined(alias) || !isString(alias)) {
    return {
      ...state,
      data: v,
      fromRemote: true,
    };
  } else {
    result = {
      ...state,
      fromRemote: true,
    };

    result[alias] = v;
  }

  if (cacheData) {
    const key = `${namespace}_${alias || 'data'}`;

    const cacheResult = setCache({
      key,
      value: v,
    });

    logDebug(
      `modal ${namespace} cache data, key is ${namespace}_${alias || 'data'}, ${
        cacheResult ? 'cache success' : 'cache fail'
      }.`,
    );
  }

  return result;
}

export function handlePageListDataAssist(state, action, namespace) {
  const { payload: d, callback, pretreatment, alias, cacheData } = action;

  let v = pretreatmentRemotePageListData(d, pretreatment);

  if (isFunction(callback)) {
    v = callback(v);
  }

  let result = null;

  if (isUndefined(alias) || !isString(alias)) {
    return {
      ...state,
      data: v,
      fromRemote: true,
    };
  } else {
    result = {
      ...state,
      fromRemote: true,
    };

    result[alias] = v;
  }

  if (cacheData) {
    const key = `${namespace}_${alias || 'data'}`;

    const cacheResult = setCache({
      key,
      value: v,
    });

    logDebug(
      `modal ${namespace} cache data, key is ${namespace}_${alias || 'data'}, ${
        cacheResult ? 'cache success' : 'cache fail'
      }.`,
    );
  }

  return result;
}

/**
 * begin request（remote request / local virtual requests）
 * @param {*} api [string]: request address
 * @param {*} params [object]: request params
 * @param {*} header [object]: request header
 * @param {*} method [string]: ’GET‘ or ’POST‘, default is ’POST‘
 * @param {*} useVirtualRequest [bool]: whether to apply virtual requests
 * @param {*} showUseVirtualRequestMessage [bool]: whether display virtual request message prompt
 * @param {*} virtualSuccessResponse [object]: virtual request success response data
 * @param {*} virtualFailResponse [object]: virtual request fail response data
 * @param {*} virtualRequestResult [object]:mandatory set virtual request result, generally used to debug
 * @param {*} virtualNeedAuthorize [object]:set virtual request whether check token,  only check mull or empty, generally used to debug
 * @returns
 */
export async function request({
  api,
  urlParams = null,
  params = {},
  header = {},
  method = 'POST',
  useVirtualRequest = runtimeSettings.getUseVirtualRequest(),
  showUseVirtualRequestMessage = runtimeSettings.getShowUseVirtualRequestMessage(),
  showUseVirtualRequestMessageDelay = 500,
  virtualRequestDelay = 0,
  virtualSuccessResponse = {},
  virtualFailResponse = {
    code: 1001,
    message: '虚拟未知错误',
  },
  virtualRequestResult = true,
  virtualNeedAuthorize = false,
}) {
  let apiVersion = runtimeSettings.getApiVersion();

  if (!isString(apiVersion)) {
    logText(apiVersion);

    throw new Error('apiVersion is not string');
  }

  if (!isString(api)) {
    logText(api);

    throw new Error('api is not string');
  }

  let url = api;

  if (
    toLower(url).startsWith('http://') ||
    toLower(url).startsWith('https://')
  ) {
    url = api;
  } else {
    if (!checkStringIsNullOrWhiteSpace(apiVersion)) {
      apiVersion = `/${apiVersion}/`;
    }

    url = `${apiVersion}${api}`.replace('//', '/');
  }

  if ((urlParams || null) != null) {
    if (isString(urlParams)) {
      url = `${url}?${urlParams}`;
    }

    if (isObject(urlParams)) {
      url = `${url}?${queryStringify(urlParams)}`;
    }
  }

  const showRequestInfo = runtimeSettings.getShowRequestInfo();

  if (useVirtualRequest) {
    recordTrace(
      `api request is virtual: simulation start,${
        virtualRequestDelay > 0 ? ` delay ${virtualRequestDelay}ms,` : ''
      } api is ${api}.`,
    );

    if (showUseVirtualRequestMessage) {
      setTimeout(
        () => {
          const text = '由虚拟访问返回';

          showInfoMessage({
            message: text,
          });
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

      if (!checkStringIsNullOrWhiteSpace(token)) {
        verifyToken = true;
      }
    }

    if (virtualNeedAuthorize && !verifyToken) {
      const signInPath = runtimeSettings.getSignInPath();

      if (checkStringIsNullOrWhiteSpace(signInPath)) {
        throw new Error('缺少登录页面路径配置');
      }

      redirectToPath(signInPath);
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
      logObject({
        url,
        useVirtualRequest,
        virtualResponse: result,
        params,
      });
    }

    return result;
  }

  if (showRequestInfo) {
    logObject({
      api,
      apiVersion,
      apiChange: url,
      params,
    });
  }

  if (trim(toUpper(method)) === 'POST') {
    return remoteRequest({
      url,
      data: params,
      header: {
        ...(header || {}),
      },
      option: {},
      method: requestMethod.post,
    });
  }

  if (trim(toUpper(method)) === 'GET') {
    return remoteRequest({
      url,
      data: params,
      header: {
        ...(header || {}),
      },
      option: {},
      method: requestMethod.get,
    });
  }

  throw new Error(`unsupported method:${method}`);
}

/**
 * 获取配置的 api 版本号
 */
export function getApiVersion() {
  const version = runtimeSettings.getApiVersion();

  return version;
}

/**
 * 构建跨域请求域前缀
 */
export function corsTargetWithApiVersion() {
  let apiVersion = getApiVersion();

  if (!checkStringIsNullOrWhiteSpace(apiVersion)) {
    apiVersion = `/${apiVersion}`;
  }

  const path = `${corsTarget()}${apiVersion}`;

  return path;
}
