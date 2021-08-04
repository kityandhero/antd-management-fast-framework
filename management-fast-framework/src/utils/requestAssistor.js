import { recordObject, stringIsNullOrWhiteSpace } from './tools';
import remoteRequest from './request';
import { defaultSettingsLayoutCustom } from './defaultSettingsSpecial';
import {
  apiVirtualAccess,
  apiVirtualSuccessData,
  apiVirtualFailData,
} from './virtualRequest';

export async function request({
  api,
  params = {},
  method = 'POST',
  virtualSuccessResponse = {},
  virtualFailResponse = {
    code: 1001,
    message: '虚拟未知错误',
  },
  virtualRequestResult = true,
  virtualNeedAuthorize = true,
}) {
  let apiVersion = defaultSettingsLayoutCustom.getApiVersion();

  if (!stringIsNullOrWhiteSpace(apiVersion)) {
    apiVersion = `/${apiVersion}`;
  }

  const url = `${apiVersion}${api}`;

  const showRequestInfo = defaultSettingsLayoutCustom.getShowRequestInfo();
  const useVirtualRequest = defaultSettingsLayoutCustom.getUseVirtualRequest();

  if (useVirtualRequest) {
    const result = await apiVirtualAccess({
      dataBuild: (resolve) => {
        setTimeout(() => {
          if (virtualRequestResult) {
            resolve(
              apiVirtualSuccessData({
                data: virtualSuccessResponse,
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
        }, 800);
      },
    });

    if (showRequestInfo) {
      recordObject({
        url,
        useVirtualRequest,
        virtualResponse: result,
      });
    }

    return result;
  }

  if (showRequestInfo) {
    recordObject({
      url,
    });
  }

  return remoteRequest(url, {
    method,
    data: params,
  });
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
