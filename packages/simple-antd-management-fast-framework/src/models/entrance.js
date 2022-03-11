import { history } from 'umi';
import { message } from 'antd';

import { queryStringify } from 'antd-management-fast-framework/es/utils/tools';
import { pretreatmentRemoteSingleData } from 'antd-management-fast-framework/es/utils/requestAssistor';
import {
  setToken,
  clearCustomData,
} from 'antd-management-fast-framework/es/utils/globalStorageAssist';
import { getPageQuery } from 'antd-management-fast-framework/es/utils/utils';
import { setAuthority } from 'antd-management-fast-framework/es/utils/authority';

import { setDataFlag } from '@/utils/storageAssist';
import { signInData, getCaptchaData } from '@/services/entrance';
import { defaultSettings } from '@/defaultSettings';

const entrancePath = defaultSettings.getEntrancePath();

export default {
  namespace: 'entrance',

  state: {},

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

        history.replace(redirect || '/');
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getCaptchaData, payload);
    },

    signOut() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      console.log({
        entrancePath,
        redirect,
      });

      if (window.location.pathname !== entrancePath && !redirect) {
        clearCustomData();

        message.info('退出登录成功！', 0.6).then(() => {
          history.replace({
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
  },
};
