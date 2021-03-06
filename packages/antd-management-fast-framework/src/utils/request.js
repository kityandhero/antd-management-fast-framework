import { message, notification } from 'antd';
import { extend } from 'umi-request';

import { defaultSettingsLayoutCustom } from './defaultSettingsSpecial';
import {
  clearCustomData,
  getToken,
  getTokenKeyName,
} from './globalStorageAssist';
import {
  corsTarget,
  isString,
  recordError,
  recordObject,
  recordText,
  redirectToPath,
  stringIsNullOrWhiteSpace,
  trySendNearestLocalhostNotify,
} from './tools';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '不支持的访问请求。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    const data = {
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    };

    requestAnimationFrame(() => {
      notification.error(data);
    });

    recordText(data);
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie，跨域时不需要
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use(async (url, options) => {
  try {
    const token = getToken() || 'anonymous';

    const corsUrl = corsTarget();

    if (!isString(corsUrl)) {
      recordObject(corsUrl);

      throw new Error('corsUrl is not string');
    }

    if (!isString(url)) {
      recordObject({ url });

      throw new Error('url is not string');
    }

    let urlChange = url;

    if (!stringIsNullOrWhiteSpace(corsUrl)) {
      if (url.indexOf(corsUrl) >= 0) {
        urlChange = url;
      } else {
        urlChange = `${corsUrl}${url}`;
      }
    }

    trySendNearestLocalhostNotify({ text: corsUrl });

    if (!isString(urlChange)) {
      recordObject({ urlChange });

      throw new Error('urlChange is not string');
    }

    const showRequestInfo = defaultSettingsLayoutCustom.getShowRequestInfo();

    if (token) {
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      headers[`${getTokenKeyName()}`] = token;

      if (showRequestInfo) {
        recordObject({
          corsUrl,
          api: url,
          urlChange,
          options: { ...options, headers },
        });
      }

      return {
        url: urlChange,
        options: { ...options, headers },
      };
    }

    if (showRequestInfo) {
      recordObject({ corsUrl, api: url, urlChange, options });
    }

    return {
      url: urlChange,
      options: { ...options },
    };
  } catch (e) {
    recordError(e.stack);
  }
});

// response拦截器, 处理response
// request.interceptors.response.use((response, _options)
request.interceptors.response.use((response) => {
  response
    .clone()
    .json()
    .then((o) => {
      const { code } = o;

      if (code === defaultSettingsLayoutCustom.getAuthenticationFailCode()) {
        const entrancePath = defaultSettingsLayoutCustom.getEntrancePath();

        if (stringIsNullOrWhiteSpace(entrancePath)) {
          throw new Error('缺少登录页面路径配置');
        }

        setTimeout(() => {
          clearCustomData();

          message.info('登陆超时，请重新登录！', 0.6);

          redirectToPath(entrancePath);
        }, 200);
      }
    })
    .catch((o) => {
      recordText(o);
    });

  return response;
});

export default request;
