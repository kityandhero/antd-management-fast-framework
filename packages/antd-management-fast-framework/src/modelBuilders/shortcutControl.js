import {
  filter,
  getTacitlyState,
  logTrace,
  mergeArrowText,
  reducerDefaultParameters,
  uniqBy,
} from 'easy-soft-utility';

export function buildModel() {
  return {
    namespace: 'shortcutControl',

    state: {
      ...getTacitlyState(),
      latestKey: '',
      listData: [],
    },

    effects: {
      *pushLatestKey({ payload, alias }, { put }) {
        const { key, message } = { key: '', message: [], ...payload };

        yield put({
          type: 'reducerLatestKey',
          payload: { key },
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(
          mergeArrowText(...message, 'shortcutControl::pushLatestKey'),
          `key "${key}"`,
        );

        return key;
      },
      *pushLatestData({ payload, alias }, { put }) {
        yield put({
          type: 'reducerLatestData',
          payload,
          alias,
          ...reducerDefaultParameters,
        });

        logTrace(mergeArrowText('shortcutControl::pushLatestData'));

        return payload;
      },
    },

    reducers: {
      reducerLatestKey(state, action) {
        const { payload: v } = {
          payload: {},
          ...action,
        };

        const { key } = { key: '', ...v };

        let result = {
          ...state,
          latestKey: key,
        };

        return result;
      },
      reducerLatestData(state, action) {
        const { payload: listSource } = {
          payload: {},
          ...action,
        };

        const { latestKey, listData } = state;

        const listDataFiltered = filter(
          uniqBy(listData, 'key'),
          (o) => o.key !== latestKey,
        ).slice(0, 7);

        const listSourceFiltered = filter(
          listSource,
          (o) => o.key === latestKey,
        );

        if (listSourceFiltered.length > 0) {
          const menu = listSourceFiltered[0];

          const { key, locale, name, path } = {
            key: '',
            locale: '',
            name: '',
            path: '',
            ...menu,
          };

          const listDataAdjust = [
            ...listDataFiltered,
            {
              key,
              locale,
              name,
              path,
            },
          ];

          let result = {
            ...state,
            listData: [...listDataAdjust],
          };

          return result;
        }

        return state;
      },
    },
  };
}
