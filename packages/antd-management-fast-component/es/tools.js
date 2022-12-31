import { l as logShowMode, c as logLevel, m as messageTypeCollection, d as _typeof, f as emptyDatetime, g as getDefaultExportFromCjs, h as datetimeFormat } from './constants.js';
import { message } from 'antd';
import 'array-move';
import copy from 'copy-to-clipboard';
import { toString as toString$2, toNumber as toNumber$2, isEqual as isEqual$1, sortBy as sortBy$1 } from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import 'nzh';
import 'qs';
import 'queue';
import randomColor from 'randomcolor';
import { history } from 'umi';
import { v4 } from 'uuid';
import { i as isString$1, s as stringIsNullOrWhiteSpace$1, a as inCollection$1, g as getAppInitConfigData, b as isNumber$1, c as isFunction$1, d as isArray$1, e as isObject$1, f as isBoolean$1, t as trim$1, r as replace$1, l as lowerFirst$1, h as isBrowser } from './core.js';
import '@ant-design/icons';
import 'react';
import 'path-to-regexp';

/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
function recordLog(record, showMode) {
  var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : logLevel.debug;
  var showModeModified = (showMode || null) == null || stringIsNullOrWhiteSpace$1(showMode) ? logShowMode.unknown : showMode;
  if (!inCollection$1([logShowMode.unknown, logShowMode.text, logShowMode.object], showModeModified)) {
    throw new Error("\u65E0\u6548\u7684\u65E5\u5FD7\u663E\u793A\u6A21\u5F0F:".concat(showModeModified));
  }
  if (showModeModified === logShowMode.unknown) {
    if (isString$1(record)) {
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
function recordDebug$1(record) {
  if (isString$1(record)) {
    recordText$1(record, logLevel.debug);
  } else {
    recordObject$1(record, logLevel.debug);
  }
}

/**
 * 记录错误信息
 */
function recordError$1(record) {
  if (isString$1(record)) {
    recordText$1(record, logLevel.error);
  } else {
    recordObject$1(record, logLevel.error);
  }
}

/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
function recordText$1(record) {
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
function recordObject$1(record) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : logLevel.trace;
  recordLog(record, logShowMode.object, level);
}
function logShowInConsole() {
  var appInit = getAppInitConfigData();
  var result = !!(appInit.showLogInConsole || false);
  return result;
}

/**
 * 转换为文本
 *
 * @export
 * @param {*} str
 * @returns
 */
function toString$1(value) {
  return toString$2(value);
}

/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */
function toNumber$1(v) {
  var value = toNumber$2(v);
  return Number.isNaN(value) ? 0 : value;
}

var toConsumableArrayExports = {};
var toConsumableArray = {
  get exports() {
    return toConsumableArrayExports;
  },
  set exports(v) {
    toConsumableArrayExports = v;
  }
};
var arrayWithoutHolesExports = {};
var arrayWithoutHoles = {
  get exports() {
    return arrayWithoutHolesExports;
  },
  set exports(v) {
    arrayWithoutHolesExports = v;
  }
};
var arrayLikeToArrayExports = {};
var arrayLikeToArray = {
  get exports() {
    return arrayLikeToArrayExports;
  },
  set exports(v) {
    arrayLikeToArrayExports = v;
  }
};
(function (module) {
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(arrayLikeToArray);
(function (module) {
  var arrayLikeToArray = arrayLikeToArrayExports;
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr);
  }
  module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(arrayWithoutHoles);
var iterableToArrayExports = {};
var iterableToArray = {
  get exports() {
    return iterableToArrayExports;
  },
  set exports(v) {
    iterableToArrayExports = v;
  }
};
(function (module) {
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(iterableToArray);
var unsupportedIterableToArrayExports = {};
var unsupportedIterableToArray = {
  get exports() {
    return unsupportedIterableToArrayExports;
  },
  set exports(v) {
    unsupportedIterableToArrayExports = v;
  }
};
(function (module) {
  var arrayLikeToArray = arrayLikeToArrayExports;
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
  }
  module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(unsupportedIterableToArray);
var nonIterableSpreadExports = {};
var nonIterableSpread = {
  get exports() {
    return nonIterableSpreadExports;
  },
  set exports(v) {
    nonIterableSpreadExports = v;
  }
};
(function (module) {
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(nonIterableSpread);
(function (module) {
  var arrayWithoutHoles = arrayWithoutHolesExports;
  var iterableToArray = iterableToArrayExports;
  var unsupportedIterableToArray = unsupportedIterableToArrayExports;
  var nonIterableSpread = nonIterableSpreadExports;
  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
  }
  module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(toConsumableArray);
var _toConsumableArray = /*@__PURE__*/getDefaultExportFromCjs(toConsumableArrayExports);
function defaultBaseState() {
  return {
    dataLoading: false,
    processing: false,
    reloading: false,
    searching: false,
    refreshing: false,
    paging: false,
    firstLoadSuccess: false,
    loadSuccess: false,
    urlParams: null,
    externalData: null
  };
}

/**
 * 复制到剪贴板
 * @param {*} text
 * @param {*} showText
 */
function copyToClipboard(text) {
  var showCopyText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var otherShowText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  copy(text);
  if (showCopyText) {
    message.success("\u5DF2\u7ECF\u5C06 ".concat(text, " \u590D\u5236\u5230\u526A\u8D34\u677F\uFF01"));
  } else if (stringIsNullOrWhiteSpace(otherShowText)) {
    message.success('已经复制到剪贴板！');
  } else {
    message.success("\u5DF2\u7ECF\u5C06".concat(otherShowText, "\u590D\u5236\u5230\u526A\u8D34\u677F\uFF01"));
  }
}

/**
 *替换指定字符串
 *
 * @export
 * @param {*} text
 * @param {*} replaceText
 * @param {*} beforeKeepNumber
 * @param {*} afterKeepNumber
 * @returns
 */
function replaceTargetText(text, replaceText, beforeKeepNumber, afterKeepNumber) {
  var result = toString(text);
  var textLength = (text || '').length;
  if (textLength > 0 && (beforeKeepNumber >= 0 || afterKeepNumber >= 0)) {
    if (beforeKeepNumber >= textLength || afterKeepNumber >= textLength || (beforeKeepNumber || 0) + (afterKeepNumber || 0) >= textLength) {
      result = text;
    } else {
      var beforeKeep = text.substr(0, beforeKeepNumber);
      var afterKeep = text.substr(textLength - afterKeepNumber, afterKeepNumber);

      // const replaceTargetLength = textLength - (beforeKeepNumber || 0) - (afterKeepNumber || 0);

      // const replaceTarget = text.substring(
      //   (beforeKeepNumber || 0) <= 0 ? 0 : beforeKeepNumber - 1,
      //   textLength - (beforeKeepNumber || 0) - (afterKeepNumber || 0)
      // );

      // const replaced = [];

      // let i = 1;
      // while (i <= replaceTargetLength) {
      //   replaced.push(replaceText);
      //   i += 1;
      // }

      result = beforeKeep + replaceText + afterKeep;
    }
  }
  return result || '';
}
function goToPath(path) {
  history.push(path);
}
function redirectToPath(path) {
  history.replace(path);
}
function showRuntimeError(_ref) {
  var messageText = _ref.message,
    _ref$showStack = _ref.showStack,
    showStack = _ref$showStack === void 0 ? true : _ref$showStack;
  try {
    if (!stringIsNullOrWhiteSpace(messageText || '')) {
      showErrorMessage({
        message: messageText
      });
    }
    if (showStack) {
      throw new Error("".concat(stringIsNullOrWhiteSpace(messageText || '') ? '' : "".concat(toString(messageText), ","), "\u8C03\u7528\u5806\u6808:"));
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.stack);
  }
}
function showErrorMessage(_ref3) {
  var _ref3$duration = _ref3.duration,
    duration = _ref3$duration === void 0 ? 3 : _ref3$duration,
    messageText = _ref3.message,
    _ref3$onClose = _ref3.onClose,
    onClose = _ref3$onClose === void 0 ? function () {} : _ref3$onClose;
  showMessage({
    type: messageTypeCollection.error,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
}

/**
 * 显示警告信息框
 */
function showWarningMessage(_ref5) {
  var _ref5$duration = _ref5.duration,
    duration = _ref5$duration === void 0 ? 3 : _ref5$duration,
    messageText = _ref5.message,
    _ref5$onClose = _ref5.onClose,
    onClose = _ref5$onClose === void 0 ? function () {} : _ref5$onClose;
  showMessage({
    type: messageTypeCollection.warning,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
}

/**
 * 显示消息信息
 */
function showInfoMessage(_ref6) {
  var _ref6$duration = _ref6.duration,
    duration = _ref6$duration === void 0 ? 3 : _ref6$duration,
    messageText = _ref6.message,
    _ref6$onClose = _ref6.onClose,
    onClose = _ref6$onClose === void 0 ? function () {} : _ref6$onClose;
  showMessage({
    type: messageTypeCollection.info,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
}
function showMessage(_ref9) {
  var type = _ref9.type,
    _ref9$duration = _ref9.duration,
    duration = _ref9$duration === void 0 ? 3 : _ref9$duration,
    messageText = _ref9.message,
    _ref9$onClose = _ref9.onClose,
    onClose = _ref9$onClose === void 0 ? function () {} : _ref9$onClose;
  requestAnimationFrame(function () {
    switch (type) {
      case messageTypeCollection.success:
        message.success(messageText, duration, onClose);
        break;
      case messageTypeCollection.error:
        message.warn(messageText, duration, onClose);
        break;
      case messageTypeCollection.info:
        message.info(messageText, duration, onClose);
        break;
      case messageTypeCollection.warning:
        message.warning(messageText, duration, onClose);
        break;
      case messageTypeCollection.warn:
        message.warn(messageText, duration, onClose);
        break;
      case messageTypeCollection.loading:
        message.loading(messageText, duration, onClose);
        break;
      default:
        message.open(messageText, duration, onClose);
        break;
    }
  });
}

/**
 * 获取Guid
 *
 * @export
 * @param {*} v
 * @returns
 */
function getGuid() {
  return v4();
}

/**
 * 检测目标是否在数组址之中
 */
function inCollection(collection, value) {
  return inCollection$1(collection, value);
}

/**
 * 格式化时间
 *
 * @export
 * @param {*} v
 * @returns
 */
function isInvalid(v) {
  return typeof v === 'undefined';
}

/**
 * 格式化时间
 *
 * @export
 * @param {*} v
 * @returns
 */
function formatDatetime(_ref10) {
  var data = _ref10.data,
    _ref10$format = _ref10.format,
    format = _ref10$format === void 0 ? datetimeFormat.yearMonthDayHourMinuteSecond : _ref10$format,
    _ref10$defaultValue = _ref10.defaultValue,
    defaultValue = _ref10$defaultValue === void 0 ? '' : _ref10$defaultValue,
    _ref10$timeZone = _ref10.timeZone,
    timeZone = _ref10$timeZone === void 0 ? 8 : _ref10$timeZone;
  if ((data || '') === '') {
    return defaultValue;
  }
  var m = moment(_typeof(data) === 'object' ? data : new Date(data.replace('/', '-'))).utcOffset(timeZone);
  if (m.isSame(emptyDatetime)) {
    return defaultValue;
  }
  return m.format(format);
}

/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
function isNumber(v) {
  return isNumber$1(v);
}

/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */
function toNumber(v) {
  return toNumber$1(v);
}

/**
 * 转换为文本
 *
 * @export
 * @param {*} str
 * @returns
 */
function toString(value) {
  return toString$1(value);
}

/**
 *
 *@param  val 值 len保留小数位数
 *
 */
function roundToTarget(v, len) {
  if (!isMoney(v)) {
    return 0;
  }
  var temp = Math.pow(10, len);
  return Math.round(toMoney(v) * temp) / temp;
}

/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
function isMoney(v) {
  var str = "".concat(typeof v === 'undefined' ? null : v);
  if (str === '') {
    return false;
  }
  var regular = /^([1-9][\d]{0,15}|0)(\.[\d]{1,2})?$/;
  var re = new RegExp(regular);
  return re.test(str);
}

/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */
function toMoney(v) {
  if (isMoney(v)) {
    return parseFloat(v, 10);
  }
  return 0;
}

/**
 * 格式化货币
 *
 * @export
 * @param {*} str
 * @returns
 */
function formatMoney(numberSource) {
  var symbolSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '￥';
  var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0,0.00';
  return "".concat(symbolSource).concat(numeral(numberSource).format(format));
}

/**
 * 通过种子等配置返回随机颜色值
 *
 * @export
 * @param {*} seed
 * @returns
 */
function getRandomColor(_ref19) {
  var seed = _ref19.seed,
    _ref19$hue = _ref19.hue,
    hue = _ref19$hue === void 0 ? null : _ref19$hue,
    _ref19$luminosity = _ref19.luminosity,
    luminosity = _ref19$luminosity === void 0 ? null : _ref19$luminosity,
    _ref19$count = _ref19.count,
    count = _ref19$count === void 0 ? null : _ref19$count,
    _ref19$format = _ref19.format,
    format = _ref19$format === void 0 ? null : _ref19$format,
    _ref19$alpha = _ref19.alpha,
    alpha = _ref19$alpha === void 0 ? null : _ref19$alpha;
  return randomColor({
    seed: seed,
    hue: hue,
    luminosity: luminosity,
    count: count,
    format: format,
    alpha: alpha
  });
}

/**
 * 封装公共数据
 *
 * @export 数据集合
 * @param {*} listData 源数据集合
 * @param {*} empty 要添加的首个数据
 * @param {*} otherListData 要添加的其他数据集合
 * @returns 封装后的数据集合
 */
function refitCommonData(listData, empty, otherListData) {
  var result = [];
  if (typeof listData !== 'undefined') {
    if (listData !== null) {
      result = _toConsumableArray(listData);
    }
  }
  if (typeof otherListData !== 'undefined') {
    if (otherListData !== null) {
      result = [].concat(_toConsumableArray(result), _toConsumableArray(otherListData));
    }
  }
  if (typeof empty !== 'undefined') {
    if (empty !== null) {
      result = [empty].concat(_toConsumableArray(result));
    }
  }
  return result;
}

/**
 * 搜索集合中的匹配项
 *
 * @export
 * @param {*} itemKey
 * @param {*} itemValue
 * @param {*} sourceData
 * @returns
 */
function searchFromList(itemKey, itemValue, sourceData) {
  var d = sourceData || [];
  var result = null;
  if (itemValue == null) {
    return result;
  }
  d.forEach(function (o) {
    if (o[itemKey] === itemValue) {
      result = o;
    }
  });
  return result;
}

/**
 * 转换列表数据
 */
function transformListData(_ref20) {
  var _ref20$list = _ref20.list,
    list = _ref20$list === void 0 ? [] : _ref20$list,
    _ref20$convert = _ref20.convert,
    convert = _ref20$convert === void 0 ? null : _ref20$convert,
    _ref20$recursiveKey = _ref20.recursiveKey,
    recursiveKey = _ref20$recursiveKey === void 0 ? 'children' : _ref20$recursiveKey;
  var listData = isArray(list) ? list : [list];
  var l = listData.map(function (one) {
    return transformData({
      data: one,
      convert: convert,
      target: recursiveKey
    });
  });
  return l;
}

/**
 * 转换数据
 */
function transformData(_ref21) {
  var data = _ref21.data,
    _ref21$convert = _ref21.convert,
    convert = _ref21$convert === void 0 ? null : _ref21$convert,
    _ref21$recursiveKey = _ref21.recursiveKey,
    recursiveKey = _ref21$recursiveKey === void 0 ? 'children' : _ref21$recursiveKey;
  if (!isFunction(convert)) {
    return data;
  }
  var d = convert(data);
  var children = data[recursiveKey];
  var listData = [];
  if (isArray(children)) {
    listData = children.map(function (one) {
      return transformData({
        data: one,
        convert: convert,
        target: recursiveKey
      });
    });
  }
  d[recursiveKey] = listData;
  return d;
}

/**
 * 构建描述文本
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */
function buildFieldDescription(v, op, other) {
  var o = (other || '') === '' ? '' : ",".concat(other);
  return "\u8BF7".concat(op || '输入').concat(v).concat(o);
}

/**
 * 获取本地数据
 * @export
 * @param {value} 对比源
 * @param {other} 对比对象
 * 执行深比较来确定两者的值是否相等。
 * 这个方法支持比较 arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, 以及 typed arrays. Object 对象值比较自身的属性，不包括继承的和可枚举的属性。 不支持函数和DOM节点比较。
 */
function isEqual(value, other) {
  return isEqual$1(value, other);
}
function cloneWithoutMethod(value) {
  if (value == null) {
    return null;
  }
  return JSON.parse(JSON.stringify(value));
}
function isFunction(value) {
  return isFunction$1(value);
}
function isArray(value) {
  return isArray$1(value);
}
function isObject(o) {
  return isObject$1(o);
}
function isBoolean(o) {
  return isBoolean$1(o);
}

/**
 * 创建一个元素数组。 以 iteratee 处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。 iteratees 调用1个参数： (value)。
 * @param {collection}  (Array|Object), 用来迭代的集合。
 * @param {predicateFunction} 这个函数决定排序
 */
function sortBy(collection, predicateFunction) {
  return sortBy$1(collection, predicateFunction);
}
function trim(source) {
  return trim$1(source);
}
function replace(source, pattern, replacement) {
  return replace$1(source, pattern, replacement);
}

/**
 * check value is string
 */
function isString(value) {
  return isString$1(value);
}
function lowerFirst(value) {
  return lowerFirst$1(value);
}
function stringIsNullOrWhiteSpace(value) {
  return stringIsNullOrWhiteSpace$1(value);
}

/**
 * 构建描述文本
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */
function buildFieldHelper(v) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '注：';
  return "".concat(prefix).concat(v, "\u3002");
}
function recordDebug(record) {
  recordDebug$1(record);
}
function recordError(record) {
  recordError$1(record);
}
function recordText(record) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : logLevel.debug;
  recordText$1(record, level);
}
function recordObject(record) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : logLevel.debug;
  recordObject$1(record, level);
}
function checkFromConfig(_ref24) {
  var label = _ref24.label,
    name = _ref24.name,
    helper = _ref24.helper;
  var labelText = 'object';
  var nameText = 'object';
  var helperText = 'object';
  if (isObject(label)) {
    var text = 'label必须为文本';
    showRuntimeError({
      message: text
    });
    recordObject(label);
  } else {
    labelText = label;
  }
  if (isObject(name)) {
    var _text = 'name必须为文本';
    showRuntimeError({
      message: _text
    });
    recordObject(name);
  } else {
    nameText = name;
  }
  if (isObject(helper)) {
    var _text2 = 'helper必须为文本';
    showRuntimeError({
      message: _text2
    });
    recordObject(helper);
  } else {
    helperText = helper;
  }
  return {
    label: labelText,
    name: nameText,
    helper: helperText
  };
}
var requestAnimFrameCustom = function () {
  if (isBrowser()) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
      window.setTimeout(a, 1e3 / 60);
    };
  }
  return function () {};
}();
var requestAnimFrame = requestAnimFrameCustom;

export { buildFieldHelper as A, transformListData as B, recordText as C, replaceTargetText as D, formatMoney as E, isString as F, getRandomColor as G, trim as H, replace as I, cloneWithoutMethod as J, showWarningMessage as K, isMoney as L, roundToTarget as M, requestAnimFrame as N, refitCommonData as O, isInvalid as P, searchFromList as Q, isFunction as a, recordDebug as b, redirectToPath as c, getGuid as d, isEqual as e, defaultBaseState as f, goToPath as g, stringIsNullOrWhiteSpace as h, isObject as i, showErrorMessage as j, showRuntimeError as k, copyToClipboard as l, isArray as m, isBoolean as n, recordObject as o, lowerFirst as p, inCollection as q, recordError as r, showInfoMessage as s, toString as t, isNumber as u, toNumber as v, sortBy as w, formatDatetime as x, buildFieldDescription as y, checkFromConfig as z };
