import { getDvaApp } from 'umi';

import { setCache } from './cacheAssist';
import { defaultSettingsLayoutCustom } from './defaultSettingsSpecial';
import { recordDebug } from './log';
import { isString, isUndefined } from './typeCheck';

export function getDispatch() {
  const app = getDvaApp();

  return app._store.dispatch;
}

export function getStore() {
  const app = getDvaApp();

  return app._store;
}

export function getModelRemoteData(name) {
  const m = getModel(name);

  const { data } = {
    ...{
      data: {},
    },
    ...m.state,
  };

  return data || {};
}

export function getModelState(name) {
  // recordExecute(`getModelState(${name})`);

  const m = getModel(name);

  return m.state;
}

export function getModelNameList() {
  const app = getDvaApp();

  const models = app._models;

  return models.map((o) => o.namespace);
}

export function getModel(name) {
  const app = getDvaApp();

  const models = app._models;

  const list = models.filter((o) => o.namespace === name);

  if (list.length > 0) {
    return list[0];
  }

  throw new Error(
    `${name} not in dva models, current models is ${models
      .map((o) => o.namespace)
      .join()}`,
  );
}

export const reducerNameCollection = {
  reducerData: 'reducerData',
};

export const reducerCollection = {
  reducerData(state, action, namespace) {
    return reducerDataAssist(state, action, namespace);
  },
};

function reducerDataAssist(state, action, namespace) {
  const {
    payload: v,
    alias,
    cacheData: cacheData,
  } = {
    ...{
      callback: null,
      pretreatment: null,
      alias: null,
      cacheData: false,
    },
    ...action,
  };

  let result = null;

  if (isUndefined(alias) || !isString(alias)) {
    result = {
      ...state,
      data: v,
      fromRemote: true,
    };
  } else {
    result = {
      ...state,
      fromRemote: true,
    };

    result[alias] = v;
  }

  if (cacheData) {
    const key = `${namespace}_${alias || 'data'}`;

    const cacheResult = setCache({
      key,
      value: v,
    });

    recordDebug(
      `modal ${namespace} cache data, key is ${namespace}_${alias || 'data'}, ${
        cacheResult ? 'cache success' : 'cache fail'
      }.`,
    );
  }

  return result;
}

/**
 * 初始化state
 */
export const tacitlyState = {
  data: {
    code: defaultSettingsLayoutCustom.getApiSuccessCode(),
    message: 'success',
    dataSuccess: true,
    data: {},
    list: [],
    extra: {},
  },
};

export const reducerDefaultParams = {
  cacheData: false,
};

export const handleDefaultParams = {
  callback: null,
  pretreatment: null,
};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
