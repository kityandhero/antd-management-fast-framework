// import { message } from 'antd';

// import { getPageQuery } from 'antd-management-fast-common/es/utils/core';
import {
  reducerCollection,
  reducerNameCollection,
  tacitlyState,
} from 'antd-management-fast-common/es/utils/dva';
// import { clearCustomData } from 'antd-management-fast-common/es/utils/globalStorageAssist';
import { pretreatmentRemoteSingleData } from 'antd-management-fast-common/es/utils/requestAssistor';

// import {
//   queryStringify,
//   redirectToPath,
// } from 'antd-management-fast-common/es/utils/tools';
// import { defaultSettings } from '../defaultSettings';
import { getCaptchaData, signInData, signOutData } from '../services/entrance';

// const entrancePath = defaultSettings.getEntrancePath();

export default {
  namespace: 'entrance',

  state: {
    ...tacitlyState,
  },

  effects: {
    *signIn({ payload, alias }, { call, put }) {
      const response = yield call(signInData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;
    },
    *getCaptcha({ payload }, { call }) {
      yield call(getCaptchaData, payload);
    },
    *signOut() {
      const response = yield call(signOutData, payload);

      const dataAdjust = pretreatmentRemoteSingleData({ source: response });

      yield put({
        type: reducerNameCollection.reducerData,
        payload: dataAdjust,
        alias,
        ...reducerDefaultParams,
      });

      return dataAdjust;

      // const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      // if (window.location.pathname !== entrancePath && !redirect) {
      //   clearCustomData();

      //   message.info('退出登录成功！', 0.6).then(() => {
      //     redirectToPath({
      //       pathname: entrancePath,
      //       search: queryStringify({
      //         redirect: window.location.href,
      //       }),
      //     });
      //   });
      // }
    },
  },

  reducers: {
    ...reducerCollection,
  },
};
