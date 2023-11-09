import { getDispatch } from 'easy-soft-dva';
import { checkObjectIsNullOrEmpty, throttle } from 'easy-soft-utility';

function setLatestData(listData) {
  const dispatch = getDispatch();

  dispatch({
    type: 'shortcutControl/pushLatestData',
    payload: listData,
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
