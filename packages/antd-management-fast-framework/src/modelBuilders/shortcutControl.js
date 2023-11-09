import {
  filter,
  getTacitlyState,
  isArray,
  isEmptyArray,
  logTrace,
  mergeArrowText,
  reducerDefaultParameters,
  uniqBy,
} from 'easy-soft-utility';

function flatTreeData(listSource) {
  let list = [];

  listSource.map((o) => {
    const l = flatTreeItemData(o);

    list = [...list, ...l];
  });

  return list;
}

function flatTreeItemData(item) {
  let list = [];

  const { key, locale, name, path, children } = {
    key: '',
    locale: '',
    name: '',
    path: '',
    ...item,
  };

  list.push({
    key,
    locale,
    name,
    path,
  });

  if (!isArray(children)) {
    return list;
  }

  if (isEmptyArray(children)) {
    return list;
  }

  children.map((o) => {
    const l = flatTreeItemData(o);

    list = [...list, ...l];
  });

  return list;
}

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
          {},
          mergeArrowText(
            ...message,
            'shortcutControl::pushLatestKey',
            `key "${key}"`,
          ),
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

        logTrace({}, mergeArrowText('shortcutControl::pushLatestData'));

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

        logTrace(
          {
            latestKey: key,
          },
          mergeArrowText('shortcutControl.latestKey'),
        );

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

        const listSourceAdjust = flatTreeData(listSource);

        const listSourceFiltered = filter(
          listSourceAdjust,
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

          logTrace(
            {
              listData: [...listDataAdjust],
            },
            mergeArrowText('shortcutControl.listData'),
          );

          let result = {
            ...state,
            listData: [...listDataAdjust],
          };

          return result;
        } else {
          logTrace(
            {
              payload: listSource,
              latestKey,
            },
            mergeArrowText('shortcutControl::reducerLatestData', 'ignore'),
          );
        }

        return state;
      },
    },
  };
}
