import { message } from 'antd';

import { setAuthority } from 'antd-management-fast-common/es/utils/authority';
import { getPageQuery } from 'antd-management-fast-common/es/utils/core';
import {
  reducerCommonCollection,
  tacitlyState,
} from 'antd-management-fast-common/es/utils/dva';
import {
  clearCustomData,
  setToken,
} from 'antd-management-fast-common/es/utils/globalStorageAssist';
import { pretreatmentRemoteSingleData } from 'antd-management-fast-common/es/utils/requestAssistor';
import {
  queryStringify,
  redirectToPath,
} from 'antd-management-fast-common/es/utils/tools';

import { defaultSettings } from '@/defaultSettings';
import { getCaptchaData, signInData } from '@/services/entrance';
import { setDataFlag } from '@/utils/storageAssist';

const entrancePath = defaultSettings.getEntrancePath();

export default {
  namespace: 'entrance',

  state: {
    ...tacitlyState,
  },

  effects: {
    *signIn({ payload }, { call, put }) {
      const response = yield call(signInData, payload);

      const data = pretreatmentRemoteSingleData(response);

      if (data.dataSuccess) {
        yield put({
          type: 'changeEntranceStatus',
          payload: data,
        });

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        redirectToPath(redirect || '/');
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getCaptchaData, payload);
    },

    signOut() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== entrancePath && !redirect) {
        clearCustomData();

        message.info('退出登录成功！', 0.6).then(() => {
          redirectToPath({
            pathname: entrancePath,
            search: queryStringify({
              redirect: window.location.href,
            }),
          });
        });
      }
    },
  },

  reducers: {
    changeEntranceStatus(state, { payload }) {
      const d = payload;
      const v = pretreatmentRemoteSingleData(d);

      const { data } = v;
      const { currentAuthority, token: tokenValue, code, dataFlag } = data;

      setAuthority(currentAuthority);
      setToken(tokenValue);
      setDataFlag(dataFlag || '');

      return {
        ...state,
        status: code,
      };
    },
    ...reducerCommonCollection,
  },
};
