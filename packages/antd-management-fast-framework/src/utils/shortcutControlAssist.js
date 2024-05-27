import { getDispatch } from 'easy-soft-dva';
import { isNull, throttle } from 'easy-soft-utility';

import { orientRoute } from 'antd-management-fast-common';

function setLatest(key) {
  const dispatch = getDispatch();

  const pathData = orientRoute({ path: key });

  if (isNull(pathData)) {
    return;
  }

  const { path, menu, name } = {
    path: '',
    menu: '',
    name: '',
    ...pathData,
  };

  dispatch({
    type: 'shortcutControl/pushLatest',
    payload: {
      pathData: {
        key: path,
        locale: menu,
        name,
        path,
      },
    },
  });
}

const throttleSetLatest = throttle(setLatest, 400, {
  trailing: false,
});

/**
 * shortcut control assist
 */
export const shortcutControlAssist = {
  /**
   * set shortcut latest data
   * @param {string} key  shortcut latest data
   */
  pushLatest(key) {
    throttleSetLatest(key);
  },
};
