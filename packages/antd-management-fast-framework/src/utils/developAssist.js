import { logShowInConsole } from './appConfiguration';
import { logLevel, logShowMode } from './constants';
import { inCollection, stringIsNullOrWhiteSpace } from './core';
import {
  getJsonFromLocalStorage,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from './localStorageAssist';
import { isString } from './typeCheck';

const storageKeyCollection = {
  nearestLocalhostNotify: 'nearestLocalhostNotify',
};

/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordLog(record, showMode, level = logLevel.debug) {
  let showModeModified =
    (showMode || null) == null || stringIsNullOrWhiteSpace(showMode)
      ? logShowMode.unknown
      : showMode;

  if (
    !inCollection(
      [logShowMode.unknown, logShowMode.text, logShowMode.object],
      showModeModified,
    )
  ) {
    throw new Error(`无效的日志显示模式:${showModeModified}`);
  }

  if (showModeModified === logShowMode.unknown) {
    if (isString(record)) {
      showModeModified = logShowMode.text;
    } else {
      showModeModified = logShowMode.object;
    }
  }

  if (logShowInConsole() && level === logLevel.debug) {
    if (showModeModified === logShowMode.text) {
      const data = { record, level };

      console.log('%c%s', 'color:#00768f;', JSON.stringify(data));
    }

    if (showModeModified === logShowMode.object) {
      console.log({ record, level });
    }
  }

  if (logShowInConsole() && level === logLevel.warn) {
    if (showModeModified === logShowMode.text) {
      const data = { record, level };

      console.log('%c%s', 'color:#ff4f49;', JSON.stringify(data));
    }

    if (showModeModified === logShowMode.object) {
      console.log({ record, level });
    }
  }

  if (logShowInConsole() && level === logLevel.info) {
    if (showModeModified === logShowMode.text) {
      const data = { record, level };

      console.log('%c%s', 'color:#89ca78;', JSON.stringify(data));
    }

    if (showModeModified === logShowMode.object) {
      console.log({ record, level });
    }
  }

  if (level === logLevel.error) {
    if (showModeModified === logShowMode.text) {
      const data = { record, level };

      console.error(JSON.stringify(data));
    }

    if (showModeModified === logShowMode.object) {
      console.error({ record, level });
    }
  }
}

export function recordWarn(record) {
  if (isString(record)) {
    recordText(record, logLevel.warn);
  } else {
    recordObject(record, logLevel.warn);
  }
}

export function recordInfo(record) {
  if (isString(record)) {
    recordText(record, logLevel.info);
  } else {
    recordObject(record, logLevel.info);
  }
}

export function recordDebug(record) {
  if (isString(record)) {
    recordText(record, logLevel.debug);
  } else {
    recordObject(record, logLevel.debug);
  }
}

/**
 * 记录错误信息
 */
export function recordError(record) {
  if (isString(record)) {
    recordText(record, logLevel.error);
  } else {
    recordObject(record, logLevel.error);
  }
}

/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordText(record, level = logLevel.debug) {
  recordLog(record, logShowMode.text, level);
}

/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordObject(record, level = logLevel.debug) {
  recordLog(record, logShowMode.object, level);
}

export function getNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  if ((d.nearestTime || null) == null) {
    return null;
  }

  return d || null;
}

export function setNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;

  const now = parseInt(new Date().getTime() / 1000, 10);

  const d = {
    nearestTime: now,
  };

  return saveJsonToLocalStorage(key, d);
}

export function removeNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;
  removeLocalStorage(key);
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
