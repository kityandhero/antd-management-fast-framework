import { request as requestInner } from '@umijs/max';

import { requestMethod } from './constants';
import { runtimeSettings } from './dynamicSetting';
import { getToken, getTokenKeyName } from './globalStorageAssist';
import {
  corsTarget,
  isString,
  recordObject,
  stringIsNullOrWhiteSpace,
  trySendNearestLocalhostNotify,
} from './tools';

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

  const showRequestInfo = runtimeSettings.getShowRequestInfo();

  const headers = {};

  if (token) {
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';
    headers[`${getTokenKeyName()}`] = token;
  }

  if (showRequestInfo) {
    recordObject({ corsUrl, api: url, urlChange, option });
  }

  return requestInner(urlChange, {
    headers: { ...headers, ...header },
    method,
    params: {},
    body: data,
    ...(option || {}),
  });
}
