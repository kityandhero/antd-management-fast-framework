import { getDispatch } from 'easy-soft-dva';
import { checkObjectIsNullOrEmpty, throttle } from 'easy-soft-utility';

function setLatestData(listData) {
  const dispatch = getDispatch();

  const listDataAdjust = listData.map((o) => {
    const { key, locale, name, path } = {
      key: '',
      locale: '',
      name: '',
      path: '',
      ...o,
    };

    return { key, locale, name, path };
  });

  dispatch({
    type: 'shortcutControl/pushLatestData',
    payload: listDataAdjust,
  });
}

const throttleSetLatestData = throttle(setLatestData, 400, {
  trailing: false,
});

/**
 * shortcut control assist
 */
export const shortcutControlAssist = {
  /**
   * set shortcut latest key
   * @param {string} key shortcut key
   */
  pushLatestKey(key, ...message) {
    const dispatch = getDispatch();

    dispatch({
      type: 'shortcutControl/pushLatestKey',
      payload: {
        key: checkObjectIsNullOrEmpty(key) ? '' : key,
        message,
      },
    });
  },

  /**
   * set shortcut latest data
   * @param {Array} listData  menu list Data
   */
  pushLatestData(listData) {
    throttleSetLatestData(listData);
  },
};
