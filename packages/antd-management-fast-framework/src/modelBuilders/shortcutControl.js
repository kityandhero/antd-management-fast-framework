import {
  filter,
  getTacitlyState,
  isArray,
  isEmptyArray,
  logTrace,
  mergeArrowText,
  reducerDefaultParameters,
  reverse,
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
      *pushLatest({ payload, alias }, { put }) {
        yield put({
          type: 'reducerLatest',
          payload,
          alias,
          ...reducerDefaultParameters,
        });

        return payload;
      },
    },

    reducers: {
      reducerLatest(state, action) {
        const { payload } = {
          payload: {},
          ...action,
        };

        const { pathData } = {
          pathData: null,
          ...payload,
        };

        const { path: currentPath } = {
          path: '',
          ...pathData,
        };

        const { latestKey, listData } = state;

        const listDataFiltered = reverse(
          filter(uniqBy(listData, 'path'), (o) => o.path !== currentPath),
        ).slice(0, 7);

        const listSourceFiltered = flatTreeData([pathData]);

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
            ...reverse(listDataFiltered),
            {
              key,
              locale,
              name,
              path,
            },
          ];

          const result = {
            ...state,
            listData: [...listDataAdjust],
            latestKey: path,
          };

          logTrace(
            {
              listData: [...listDataAdjust],
              latestKey: path,
            },
            mergeArrowText('shortcutControl::reducerLatestData'),
          );

          return result;
        } else {
          logTrace(
            {
              listData: listData,
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
