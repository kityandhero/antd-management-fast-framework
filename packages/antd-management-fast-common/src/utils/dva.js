import { setCache } from './cacheAssist';
import { defaultSettingsLayoutCustom } from './defaultSettingsSpecial';
import { recordDebug } from './tools';
import { isString, isUndefined } from './typeCheck';

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
