import axios from 'axios';

import {
  buildPromptModuleInfo,
  checkStringIsNullOrWhiteSpace,
  checkWhetherDevelopmentEnvironment,
  getToken,
  isString,
  logDebug,
  logException,
  logExecute,
  logObject,
  logTrace,
  mergeArrowText,
  mergeTextMessage,
  requestMethod,
  setRequestHandler as setRequestHandlerCore,
  trySendNearestLocalhostNotify,
} from 'easy-soft-utility';

import { modulePackageName } from './definition';
import { getCorsDomain, getTokenName } from './settingAssist';

/**
 * Module Name.
 * @private
 */
const moduleName = 'requestAssist';

function buildPromptModuleInfoText(text, ancillaryInformation = '') {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, ancillaryInformation),
    moduleName,
  );
}

export async function request({
  url,
  method = requestMethod.post,
  data = {},
  header = [],
  option = {},
}) {
  logExecute(
    {
      url,
      method,
      data,
      header,
      option,
    },
    buildPromptModuleInfoText('request'),
  );

  logTrace({}, mergeArrowText('request with axios', 'prepare request'));

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

  if (checkWhetherDevelopmentEnvironment()) {
    trySendNearestLocalhostNotify({ text: corsUrl });
  }

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
    const requestConfig = {
      url: urlChange,
      headers: { ...headers, ...header },
      method,
      params: {},
      data: data,
      ...option,
    };

    logTrace(
      {
        requestConfig,
      },
      mergeArrowText('request with axios', 'request start'),
    );

    const response = await axios.request(requestConfig);

    logTrace(
      {
        response,
      },
      mergeArrowText('request with axios', 'request success'),
    );

    const { data: responseData } = response;

    return responseData;
  } catch (error) {
    logDebug({}, mergeArrowText('request with axios', 'request fail'));

    logException(error);
  }
}

/**
 * 设置 Request 处理器
 */
export function setRequestHandler() {
  setRequestHandlerCore(request);
}
