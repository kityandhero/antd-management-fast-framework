import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  getTacitlyState,
  logDebug,
  logDevelop,
  pretreatmentRemoteSingleData,
  reducerCollection,
  reducerDefaultParameters,
  reducerNameCollection,
  removeToken,
  setAuthority,
  setToken,
  showSimpleWarnMessage,
} from 'easy-soft-utility';

import {
  getSignInApi,
  getSignInCaptchaApi,
  getSignOutApi,
  getTokenName,
} from 'antd-management-fast-common';

import {
  getCaptchaData,
  getCaptchaDataSimulation,
  signInData,
  signInDataSimulation,
} from '../services/entrance';

export function buildModel() {
  return {
    namespace: 'entrance',

    state: {
      ...getTacitlyState(),
      remoteLoading: false,
    },

    effects: {
      *signIn({ payload, alias }, { call, put }) {
        const signInApi = getSignInApi();

        if (checkStringIsNullOrWhiteSpace(signInApi)) {
          showSimpleWarnMessage(
            'signInApi has not set, please set it in applicationConfig with key "signInApi", it must be absolute or relative http url like "/user/signIn"',
            'use simulation mode',
          );
        }

        const response = yield call(
          checkStringIsNullOrWhiteSpace(signInApi)
            ? signInDataSimulation
            : signInData,
          payload,
        );

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        if (!checkInCollection(Object.keys(dataAdjust), getTokenName())) {
          logDevelop(dataAdjust, 'signIn data');

          throw new Error(
            `token key name "${getTokenName()}" not exist in signIn data`,
          );
        }

        const { currentAuthority } = {
          currentAuthority: [],
          ...dataAdjust,
        };

        const token = dataAdjust[getTokenName()];

        logDebug(currentAuthority, 'current authority collection');

        setAuthority(currentAuthority);
        setToken(token);

        return dataAdjust;
      },
      *getCaptcha({ payload, alias }, { call, put }) {
        const signInCaptchaApi = getSignInCaptchaApi();

        if (checkStringIsNullOrWhiteSpace(signInCaptchaApi)) {
          showSimpleWarnMessage(
            'signInCaptchaApi has not set, please set it in applicationConfig with key "signInCaptchaApi", it must be absolute or relative http url like "/entrance/getCaptcha"',
            'use simulation mode',
          );
        }

        const response = yield call(
          checkStringIsNullOrWhiteSpace(signInCaptchaApi)
            ? getCaptchaDataSimulation
            : getCaptchaData,
          payload,
        );

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        return dataAdjust;
      },
      *signOut({ payload, alias }, { call, put }) {
        const signOutApi = getSignOutApi();

        if (checkStringIsNullOrWhiteSpace(signOutApi)) {
          showSimpleWarnMessage(
            'signOutApi has not set, please set it in applicationConfig with key "signOutApi", it must be absolute or relative http url like "/user/signOut"',
            'use simulation mode',
          );
        }

        const response = yield call(
          checkStringIsNullOrWhiteSpace(signOutApi)
            ? signInDataSimulation
            : signInData,
          payload,
        );

        const dataAdjust = pretreatmentRemoteSingleData({ source: response });

        yield put({
          type: reducerNameCollection.reducerRemoteData,
          payload: dataAdjust,
          alias,
          ...reducerDefaultParameters,
        });

        removeToken();

        return dataAdjust;
      },
    },

    reducers: {
      ...reducerCollection,
    },
  };
}
