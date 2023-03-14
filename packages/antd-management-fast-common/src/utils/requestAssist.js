import axios from 'axios';

import {
  checkStringIsNullOrWhiteSpace,
  getToken,
  isString,
  logException,
  logObject,
  requestMethod,
  setRequestHandler as setRequestHandlerCore,
  setRequestInfoDisplaySwitch,
  trySendNearestLocalhostNotify,
} from 'easy-soft-utility';

import {
  getCorsDomain,
  getShowRequestInfo,
  getTokenName,
} from './settingAssist';

export async function request({
  url,
  method = requestMethod.post,
  data = {},
  header = [],
  option = {},
}) {
  const token = getToken() || 'anonymous';

  const corsUrl = getCorsDomain();

  if (!isString(corsUrl)) {
    logObject(corsUrl);

    throw new Error('corsUrl is not string');
  }

  if (!isString(url)) {
    logObject({ url });

    throw new Error('url is not string');
  }

  let urlChange = url;

  if (!checkStringIsNullOrWhiteSpace(corsUrl)) {
    urlChange = url.includes(corsUrl) ? url : `${corsUrl}${url}`;
  }

  trySendNearestLocalhostNotify({ text: corsUrl });

  if (!isString(urlChange)) {
    logObject({ urlChange });

    throw new Error('urlChange is not string');
  }

  const headers = {};

  if (token) {
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';
    headers[`${getTokenName()}`] = token;
  }

  try {
    const response = await axios.request({
      url: urlChange,
      headers: { ...headers, ...header },
      method,
      params: {},
      data: data,
      ...option,
    });

    const { data: responseData } = response;

    return responseData;
  } catch (error) {
    logException(error);
  }
}

/**
 * 设置 Request 处理器
 */
export function setRequestHandler() {
  setRequestInfoDisplaySwitch(getShowRequestInfo());
  setRequestHandlerCore(request);
}
