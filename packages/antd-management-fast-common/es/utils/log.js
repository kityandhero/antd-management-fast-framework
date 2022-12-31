import { l as logLevel, d as logShowMode } from '../constants.js';
import { stringIsNullOrWhiteSpace, inCollection, getAppInitConfigData } from './core.js';
import { isString } from './typeCheck.js';
import '@ant-design/icons';
import 'react';
import './mediaDefault.js';
import 'lodash';
import 'path-to-regexp';
import 'qs';

/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
function recordLog(record, showMode) {
  var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : logLevel.debug;
  var showModeModified = (showMode || null) == null || stringIsNullOrWhiteSpace(showMode) ? logShowMode.unknown : showMode;
  if (!inCollection([logShowMode.unknown, logShowMode.text, logShowMode.object], showModeModified)) {
    throw new Error("\u65E0\u6548\u7684\u65E5\u5FD7\u663E\u793A\u6A21\u5F0F:".concat(showModeModified));
  }
  if (showModeModified === logShowMode.unknown) {
    if (isString(record)) {
      showModeModified = logShowMode.text;
    } else {
      showModeModified = logShowMode.object;
    }
  }
  if (logShowInConsole() && level === logLevel.trace) {
    if (showModeModified === logShowMode.text) {
      var data = {
        trace: record
      };
      console.log('%c%s', 'color:#596032;', JSON.stringify(data));
    }
    if (showModeModified === logShowMode.object) {
      console.log({
        trace: record
      });
    }
  }
  if (logShowInConsole() && level === logLevel.debug) {
    if (showModeModified === logShowMode.text) {
      var _data = {
        debug: record
      };
      console.log('%c%s', 'color:#00768f;', JSON.stringify(_data));
    }
    if (showModeModified === logShowMode.object) {
      console.log({
        debug: record
      });
    }
  }
  if (logShowInConsole() && level === logLevel.warn) {
    if (showModeModified === logShowMode.text) {
      var _data2 = {
        warn: record
      };
      console.log('%c%s', 'color:#ff4f49;', JSON.stringify(_data2));
    }
    if (showModeModified === logShowMode.object) {
      console.log({
        warn: record
      });
    }
  }
  if (logShowInConsole() && level === logLevel.info) {
    if (showModeModified === logShowMode.text) {
      var _data3 = {
        info: record
      };
      console.log('%c%s', 'color:#89ca78;', JSON.stringify(_data3));
    }
    if (showModeModified === logShowMode.object) {
      console.log({
        info: record
      });
    }
  }
  if (logShowInConsole() && level === logLevel.execute) {
    if (showModeModified === logShowMode.text) {
      var _data4 = {
        execute: record
      };
      console.log('%c%s', 'color:#C39BD3;', JSON.stringify(_data4));
    }
    if (showModeModified === logShowMode.object) {
      console.log({
        execute: record
      });
    }
  }
  if (logShowInConsole() && level === logLevel.config) {
    if (showModeModified === logShowMode.text) {
      var _data5 = {
        config: record
      };
      console.log('%c%s', 'color:#F8C471;', JSON.stringify(_data5));
    }
    if (showModeModified === logShowMode.object) {
      console.log({
        config: record
      });
    }
  }
  if (level === logLevel.error) {
    if (showModeModified === logShowMode.text) {
      var _data6 = {
        error: record
      };
      console.error(JSON.stringify(_data6));
    }
    if (showModeModified === logShowMode.object) {
      console.error({
        error: record
      });
    }
  }
}
function recordWarn(record) {
  if (isString(record)) {
    recordText(record, logLevel.warn);
  } else {
    recordObject(record, logLevel.warn);
  }
}
function recordInfo(record) {
  if (isString(record)) {
    recordText(record, logLevel.info);
  } else {
    recordObject(record, logLevel.info);
  }
}
function recordConfig(record) {
  if (isString(record)) {
    recordText(record, logLevel.config);
  } else {
    recordObject(record, logLevel.config);
  }
}
function recordTrace(record) {
  if (isString(record)) {
    recordText(record, logLevel.trace);
  } else {
    recordObject(record, logLevel.trace);
  }
}
function recordDebug(record) {
  if (isString(record)) {
    recordText(record, logLevel.debug);
  } else {
    recordObject(record, logLevel.debug);
  }
}
function recordExecute(record) {
  if (isString(record)) {
    recordText(record, logLevel.execute);
  } else {
    recordObject(record, logLevel.execute);
  }
}

/**
 * 记录错误信息
 */
function recordError(record) {
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
function recordText(record) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : logLevel.trace;
  recordLog(record, logShowMode.text, level);
}

/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
function recordObject(record) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : logLevel.trace;
  recordLog(record, logShowMode.object, level);
}
function logShowInConsole() {
  var appInit = getAppInitConfigData();
  var result = !!(appInit.showLogInConsole || false);
  return result;
}

export { recordConfig, recordDebug, recordError, recordExecute, recordInfo, recordLog, recordObject, recordText, recordTrace, recordWarn };
