import { request as requestInner } from '@umijs/max';

import {
  checkStringIsNullOrWhiteSpace,
  getToken,
  getTokenKeyName,
  isString,
  logObject,
  requestMethod,
  trySendNearestLocalhostNotify,
} from 'easy-soft-utility';

import { corsTarget } from './common';
import { getShowRequestInfo } from './settingAssist';

export async function request({
  url,
  method = requestMethod.post,
  data = {},
  header = [],
  option = {},
}) {
  const token = getToken() || 'anonymous';

  const corsUrl = corsTarget();

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

  const showRequestInfo = getShowRequestInfo();

  const headers = {};

  if (token) {
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';
    headers[`${getTokenKeyName()}`] = token;
  }

  if (showRequestInfo) {
    logObject({ corsUrl, api: url, urlChange, option });
  }

  return requestInner(urlChange, {
    headers: { ...headers, ...header },
    method,
    params: {},
    body: data,
    ...option,
  });
}

/**
 * 设置 Request 处理器
 */
export function setRequestHandler() {
  setRequestHandler(request);
}
