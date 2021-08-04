import { message } from 'antd';
import { history } from 'umi';
import { recordObject, stringIsNullOrWhiteSpace } from './tools';
import { getToken, clearCustomData } from './globalStorageAssist';
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
    let result = {};
    let verifyToken = false;

    if (virtualNeedAuthorize) {
      const token = getToken();

      if (!stringIsNullOrWhiteSpace(token)) {
        verifyToken = true;
      }
    }

    if (virtualNeedAuthorize && !verifyToken) {
      const loginPath = defaultSettingsLayoutCustom.getLoginPath();

      if (stringIsNullOrWhiteSpace(loginPath)) {
        throw new Error('缺少登录页面路径配置');
      }

      setTimeout(() => {
        clearCustomData();

        message.info('登陆超时，请重新登录！', 0.6);

        history.replace({
          pathname: loginPath,
        });
      }, 800);
    } else {
      result = await apiVirtualAccess({
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
    }

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
