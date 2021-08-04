import { recordLog, recordText } from './tools';
import remoteRequest from './request';
import { defaultSettingsLayoutCustom } from './defaultSettingsSpecial';
import {
  transferToVirtualAccess,
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
  virtualNeedAuthorize = false,
}) {
  const url = `${defaultSettingsLayoutCustom.getApiVersion()}${api}`;

  const showRequestInfo = defaultSettingsLayoutCustom.getShowRequestInfo();

  if (showRequestInfo) {
    const useVirtualRequest =
      defaultSettingsLayoutCustom.getUseVirtualRequest();

    if (useVirtualRequest) {
      recordLog({
        url,
        useVirtualRequest: defaultSettingsLayoutCustom.getUseVirtualRequest(),
      });
    } else {
      recordText(url);
    }
  }

  if (transferToVirtualAccess(url)) {
    const result = await apiVirtualAccess((resolve) => {
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
    });

    return result;
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