import { g as getDefaultExportFromCjs, _ as _objectSpread, h as listViewConfig, m as messageTypeCollection, i as datetimeFormat, j as _typeof, k as emptyDatetime, n as convertCollection, o as formatCollection, p as notificationTypeCollection, l as logLevel, s as sortOperate } from '../constants.js';
import { message, notification } from 'antd';
import { arrayMoveImmutable, arrayMoveMutable } from 'array-move';
import copy from 'copy-to-clipboard';
import { isEmpty, split as split$1, sortedUniq, get, endsWith as endsWith$1, isEqual as isEqual$1, difference as difference$1, filter as filter$1, sortBy as sortBy$1, findIndex as findIndex$1, find as find$1, reverse as reverse$1, remove, toLower } from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import nzh from 'nzh';
import { stringify, parse } from 'qs';
import queue from 'queue';
import randomColor from 'randomcolor';
import { history } from 'umi';
import { v4 } from 'uuid';
import { getAppInitConfigData, inCollection as inCollection$1, trim as trim$1, replace as replace$1, upperFirst as upperFirst$1, lowerFirst as lowerFirst$1, stringIsNullOrWhiteSpace as stringIsNullOrWhiteSpace$1, decodeBase64 as decodeBase64$1, encodeBase64 as encodeBase64$1, isBrowser } from './core.js';
import { getNearestLocalhostNotifyCache, setNearestLocalhostNotifyCache } from './developAssist.js';
import { recordLog as recordLog$1, recordWarn as recordWarn$1, recordInfo as recordInfo$1, recordDebug as recordDebug$1, recordError as recordError$1, recordText as recordText$1, recordObject as recordObject$1 } from './log.js';
import { isNumber as isNumber$1, isFunction as isFunction$1, isArray as isArray$1, isObject as isObject$1, isBoolean as isBoolean$1, isUndefined as isUndefined$1, isString as isString$1 } from './typeCheck.js';
import { toNumber as toNumber$1, toString as toString$1 } from './typeConvert.js';
import '@ant-design/icons';
import 'react';
import './mediaDefault.js';
import 'path-to-regexp';
import './localStorageAssist.js';

var toConsumableArrayExports = {};
var toConsumableArray = {
  get exports(){ return toConsumableArrayExports; },
  set exports(v){ toConsumableArrayExports = v; },
};

var arrayWithoutHolesExports = {};
var arrayWithoutHoles = {
  get exports(){ return arrayWithoutHolesExports; },
  set exports(v){ arrayWithoutHolesExports = v; },
};

var arrayLikeToArrayExports = {};
var arrayLikeToArray = {
  get exports(){ return arrayLikeToArrayExports; },
  set exports(v){ arrayLikeToArrayExports = v; },
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
  get exports(){ return iterableToArrayExports; },
  set exports(v){ iterableToArrayExports = v; },
};

(function (module) {
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(iterableToArray);

var unsupportedIterableToArrayExports = {};
var unsupportedIterableToArray = {
  get exports(){ return unsupportedIterableToArrayExports; },
  set exports(v){ unsupportedIterableToArrayExports = v; },
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
  get exports(){ return nonIterableSpreadExports; },
  set exports(v){ nonIterableSpreadExports = v; },
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
function defaultCoreState() {
  var data = _objectSpread(_objectSpread({}, defaultBaseState()), {
    dataLoading: true
  });
  return data;
}
function defaultCommonState() {
  var data = _objectSpread(_objectSpread({}, defaultCoreState()), {
    loadApiPath: '',
    pageName: '',
    metaData: null,
    metaExtra: null,
    metaListData: [],
    metaOriginalData: null
  });
  return data;
}
function defaultListState() {
  var data = _objectSpread(_objectSpread({}, defaultCommonState()), {
    dateRangeFieldName: '发生时间',
    tableScroll: {
      x: 1520
    },
    formValues: {},
    pageNo: 1,
    pageSize: 10,
    startTimeAlias: '',
    endTimeAlias: '',
    startTime: '',
    endTime: '',
    listViewMode: listViewConfig.viewMode.table,
    showSelect: false,
    selectedDataTableDataRows: []
  });
  return data;
}
function defaultPageListState() {
  var data = _objectSpread(_objectSpread({}, defaultCommonState()), {
    paramsKey: '',
    loadApiPath: '',
    dateRangeFieldName: '发生时间',
    tableScroll: {
      x: 1520
    },
    formValues: {},
    pageNo: 1,
    pageSize: 10,
    startTime: '',
    endTime: '',
    listViewMode: listViewConfig.viewMode.table,
    showSelect: false,
    selectedDataTableDataRows: []
  });
  return data;
}
function defaultFormState() {
  var data = _objectSpread(_objectSpread({}, defaultCommonState()), {
    errorFieldName: '',
    submitApiPath: ''
  });
  return data;
}
function getValue(obj) {
  return Object.keys(obj).map(function (key) {
    return obj[key];
  }).join(',');
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
 * 复制到剪贴板
 * @param {*} text
 */
function stringIsEmpty(text) {
  return isEmpty(toString(text || '').replace(' ', ''));
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
function checkDevelopment() {
  return process.env.NODE_ENV === 'development';
}

/**
 * corsTarget
 * 跨域域名配置
 * @export
 * @param {*} v
 * @returns
 */
function corsTarget() {
  var appInit = getAppInitConfigData();
  var corsTargetDomain = '';
  if (appInit.apiPrefix != null) {
    if (appInit.apiPrefix.corsTargetDomain != null) {
      var corsTargetDomainRemote = appInit.apiPrefix.corsTargetDomain;
      corsTargetDomain = corsTargetDomainRemote;
    }
  }
  return corsTargetDomain;
}
function goToPath(path) {
  history.push(path);
}
function redirectToPath(path) {
  history.replace(path);
}
function showError(text) {
  showErrorMessage({
    message: text
  });
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
function showSuccessMessage(_ref2) {
  var _ref2$duration = _ref2.duration,
    duration = _ref2$duration === void 0 ? 3 : _ref2$duration,
    messageText = _ref2.message,
    _ref2$onClose = _ref2.onClose,
    onClose = _ref2$onClose === void 0 ? function () {} : _ref2$onClose;
  showMessage({
    type: messageTypeCollection.success,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
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
function showWarnMessage(_ref4) {
  var _ref4$duration = _ref4.duration,
    duration = _ref4$duration === void 0 ? 3 : _ref4$duration,
    messageText = _ref4.message,
    _ref4$onClose = _ref4.onClose,
    onClose = _ref4$onClose === void 0 ? function () {} : _ref4$onClose;
  showMessage({
    type: messageTypeCollection.warn,
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
function showLoadingMessage(_ref7) {
  var _ref7$duration = _ref7.duration,
    duration = _ref7$duration === void 0 ? 3 : _ref7$duration,
    messageText = _ref7.message,
    _ref7$onClose = _ref7.onClose,
    onClose = _ref7$onClose === void 0 ? function () {} : _ref7$onClose;
  showMessage({
    type: messageTypeCollection.loading,
    message: messageText,
    duration: duration,
    onClose: onClose
  });
}
function showOpenMessage(_ref8) {
  var _ref8$duration = _ref8.duration,
    duration = _ref8$duration === void 0 ? 3 : _ref8$duration,
    messageText = _ref8.message,
    _ref8$onClose = _ref8.onClose,
    onClose = _ref8$onClose === void 0 ? function () {} : _ref8$onClose;
  showMessage({
    type: messageTypeCollection.open,
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
function toDatetime(v) {
  if ((v || null) == null) {
    return null;
  }
  if (isDate(v)) {
    return v;
  }
  if (isString(v)) {
    var i = v.indexOf('T');
    if (i < 0) {
      // eslint-disable-next-line no-useless-escape
      var value = v.replace(/\-/g, '/');
      var result = new Date(value);
      return result;
    }
  }
  return new Date(v);
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
 * 格式化数字
 */
function numeralFormat(v, formatString) {
  return numeral(v).format(formatString);
}

/**
 * 当前Moment时间
 *
 * @export
 * @param {*} v
 * @returns
 */
function getMomentNow() {
  var timeZone = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
  return moment().utcOffset(timeZone);
}

/**
 * 转化为Moment时间
 *
 * @export
 * @param {*} v
 * @returns
 */
function toMoment(_ref11) {
  var data = _ref11.data,
    _ref11$timeZone = _ref11.timeZone,
    timeZone = _ref11$timeZone === void 0 ? 8 : _ref11$timeZone;
  if (isString(data)) {
    return stringToMoment({
      data: data,
      timeZone: timeZone
    });
  }
  if (isDate(data)) {
    return dateToMoment({
      data: data,
      timeZone: timeZone
    });
  }
  throw new Error('toMoment only support string and date');
}

/**
 * 转化为Moment时间
 *
 * @export
 * @param {*} v
 * @returns
 */
function stringToMoment(_ref12) {
  var data = _ref12.data,
    _ref12$timeZone = _ref12.timeZone,
    timeZone = _ref12$timeZone === void 0 ? 8 : _ref12$timeZone;
  if (moment.isMoment(data)) return data;
  var d = (data || '').toString();
  if (stringIsNullOrWhiteSpace(d)) {
    return null;
  }
  return moment(new Date(d.replace('/', '-'))).utcOffset(timeZone);
}

/**
 * 转化为Moment时间
 *
 * @export
 * @param {*} v
 * @returns
 */
function dateToMoment(_ref13) {
  var data = _ref13.data,
    _ref13$timeZone = _ref13.timeZone,
    timeZone = _ref13$timeZone === void 0 ? 8 : _ref13$timeZone;
  var m = moment(data).utcOffset(timeZone);
  if (m.isSame(emptyDatetime)) {
    return null;
  }
  return m;
}

/**
 * 判断是否是时间字符串
 *
 * @export
 * @param {*} v
 * @returns
 */
function isDatetime(v) {
  var date = "".concat(typeof v === 'undefined' ? null : v);
  var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
  if (result == null) {
    return false;
  }
  var d = new Date(result[1], result[3] - 1, result[4]);
  return d.getFullYear() === parseInt(result[1], 10) && d.getMonth() + 1 === parseInt(result[3], 10) && d.getDate() === parseInt(result[4], 10);
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
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */
function split(source, separator) {
  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
  return split$1(source, separator, limit);
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
 * 去除重复数据并排序（升序）
 */
function sortedUnique(array) {
  return sortedUniq(array);
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
 * 通过 key 获取对应得值
 */
function getValueByKey(_ref14) {
  var data = _ref14.data,
    key = _ref14.key,
    _ref14$defaultValue = _ref14.defaultValue,
    defaultValue = _ref14$defaultValue === void 0 ? null : _ref14$defaultValue,
    _ref14$convert = _ref14.convert,
    convert = _ref14$convert === void 0 ? null : _ref14$convert,
    _ref14$convertBuilder = _ref14.convertBuilder,
    convertBuilder = _ref14$convertBuilder === void 0 ? null : _ref14$convertBuilder,
    _ref14$format = _ref14.format,
    format = _ref14$format === void 0 ? null : _ref14$format,
    _ref14$formatBuilder = _ref14.formatBuilder,
    formatBuilder = _ref14$formatBuilder === void 0 ? null : _ref14$formatBuilder;
  var v = getPathValue(data, key, defaultValue);
  var result = v;
  if ((convertBuilder || null) != null || (convert || null) != null) {
    if (isFunction(convertBuilder)) {
      result = convertTarget({
        target: v,
        convert: convertBuilder
      });
    } else {
      result = convertTarget({
        target: v,
        convert: convert
      });
    }
  }
  if ((formatBuilder || null) != null || (format || null) != null) {
    if (isFunction(formatBuilder)) {
      result = formatTarget({
        target: result,
        format: formatBuilder
      });
    } else {
      result = formatTarget({
        target: result,
        format: format
      });
    }
  }
  return result;
}

/**
 * convertTarget
 * @param {*} param0
 * @returns
 */
function convertTarget(_ref15) {
  var target = _ref15.target,
    convert = _ref15.convert;
  if (isFunction(convert)) {
    return convert(target);
  }
  if (isString(convert)) {
    switch (convert) {
      case convertCollection.number:
        return toNumber(target);
      case convertCollection.datetime:
        return toDatetime(target);
      case convertCollection.string:
        return toString(target);
      case convertCollection.moment:
        return toMoment({
          data: toString(target)
        });
      case convertCollection.money:
        return toMoney(target);
      case convertCollection.array:
        return (target || null) == null ? [] : isArray(target) ? target : [target];
      default:
        return target;
    }
  }
  return target;
}
function formatTarget(_ref16) {
  var target = _ref16.target,
    format = _ref16.format,
    _ref16$option = _ref16.option,
    option = _ref16$option === void 0 ? {} : _ref16$option;
  if (isFunction(format)) {
    return format(target);
  }
  if (isString(format)) {
    switch (format) {
      case formatCollection.money:
        return formatMoney(target);
      case formatCollection.datetime:
        return formatDatetime({
          data: target
        });
      case formatCollection.chineseMoney:
        return formatMoneyToChinese({
          target: target,
          option: option
        });
      case formatCollection.percentage:
        return "".concat(roundToTarget(target * 100, 1), "%");
      default:
        return target;
    }
  }
  return target;
}

/**
 * 通过 path 获取对应得值
 */
function getPathValue(o, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (isUndefined(o)) {
    return defaultValue;
  }
  if (o == null) {
    return defaultValue;
  }
  if (!isString(path)) {
    recordError({
      path: path
    });
    var text = 'getPathValue Function param path must be string';
    showRuntimeError({
      message: text
    });
    return null;
  }
  var v = get(o, path, defaultValue);
  if (isUndefined(defaultValue) || isNull(defaultValue)) {
    return v;
  }
  return v || defaultValue;
}

/**
 *计算时间间隔
 * @param {startTime} 起始时间
 * @param {endTime} 结束时间
 */
function calculateTimeInterval(startTime, endTime) {
  var timeBegin = startTime.getTime();
  var timeEnd = endTime.getTime();
  var total = (timeEnd - timeBegin) / 1000;
  var day = parseInt(total / (24 * 60 * 60)); //计算整数天数
  var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
  var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
  var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
  var min = parseInt(afterHour / 60); //计算整数分
  var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数

  return {
    day: day,
    hour: hour,
    minute: min,
    second: afterMin
  };
}

/**
 * 格式化货币
 *
 * @export
 * @param {*} str
 * @returns
 */
function formatDecimal(numberSource) {
  var placesSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  var thousandSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
  var decimalSource = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';
  return formatMoney(numberSource, placesSource, '', thousandSource, decimalSource);
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
function toPercentage(val) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0,0.00';
  return "".concat(numeral(toNumber(numeral(val).value() * 1000) / 10).format(format), "%");
}

/**
 * 检查字符串string是否以给定的target字符串结尾
 */
function endsWith(source, target, position) {
  return endsWith$1(source, target, position);
}

/**
 * 如果字符串末尾匹配目标字符串，则从源字符串末尾移除匹配项
 */
function removeEndMatch(source, target) {
  if (!isString(source)) {
    throw new Error('removeEndMatch only use for string source');
  }
  if (!isString(target)) {
    throw new Error('removeEndMatch only use for string target');
  }
  if (stringIsNullOrWhiteSpace(source)) {
    return source;
  }
  if (stringIsNullOrWhiteSpace(target)) {
    return source;
  }
  var lastIndex = source.lastIndexOf(target);
  if (lastIndex >= 0 && source.length === lastIndex + target.length) {
    return source.substr(lastIndex, target.length);
  }
  return source;
}

/**
 * 从源字符串移除最后一个匹配项
 */
function removeLastMatch(source, target) {
  if (!isString(source)) {
    throw new Error('removeEndMatch only use for string source');
  }
  if (!isString(target)) {
    throw new Error('removeEndMatch only use for string target');
  }
  if (stringIsNullOrWhiteSpace(source)) {
    return source;
  }
  if (stringIsNullOrWhiteSpace(target)) {
    return source;
  }
  var lastIndex = source.lastIndexOf(target);
  if (lastIndex >= 0) {
    return source.substr(lastIndex, target.length);
  }
  return source;
}

/**
 * 转换金额为人民币大写
 *
 * @export
 * @param {*} target 转换的目标
 * @param {*} option 转换配置, 参看Nzh包
 * @returns
 */
function formatMoneyToChinese(_ref17) {
  var target = _ref17.target,
    _ref17$option = _ref17.option,
    option = _ref17$option === void 0 ? {} : _ref17$option;
  var o = _objectSpread(_objectSpread({}, {
    mode: 'cn',
    complete: false,
    outSymbol: true
  }), option || {});
  var mode = o.mode;
  var nzhLocal = nzh.cn;
  switch (mode) {
    case 'hk':
      nzhLocal = nzh.hk;
      break;
  }
  return nzhLocal.toMoney(target, o);
}
function seededRandom(_ref18) {
  var seed = _ref18.seed,
    min = _ref18.min,
    max = _ref18.max;
  var maxValue = max || 1;
  var minValue = min || 0;
  var seedValue = (seed * 9301 + 49297) % 233280;
  var rnd = seedValue / 233280.0;
  return minValue + rnd * (maxValue - minValue);
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
function getBrowserInfoCore() {
  var getBrowserVersion = function getBrowserVersion() {
    var u = navigator.userAgent;
    return {
      // 移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1,
      // IE内核
      presto: u.indexOf('Presto') > -1,
      // opera内核
      webKit: u.indexOf('AppleWebKit') > -1,
      // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
      // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      // android 终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1,
      // 是否为 iPhone 或者 QQHD 浏览器
      iPad: u.indexOf('iPad') > -1,
      // 是否iPad
      webApp: u.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
    };
  };

  return {
    versions: getBrowserVersion(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  };
}

/**
 * 获取浏览器信息
 *
 * @export
 * @returns
 */
function getBrowserInfo() {
  return getBrowserInfoCore();
}

/**
 * 封装表单项配置
 *
 * @export
 * @param {*} v
 * @param {*} justice
 * @param {*} defaultValue
 * @param {*} originalOption
 * @param {*} convertCallback
 */
function refitFieldDecoratorOption(v, justice, defaultValue, originalOption, convertCallback) {
  var result = originalOption;
  var justiceV = typeof justice !== 'undefined' && justice !== null;
  var defaultV = typeof defaultValue === 'undefined' ? null : defaultValue;
  if (justiceV) {
    if (typeof convertValue === 'function') {
      result.initialValue = convertCallback(v) || defaultV;
    } else {
      result.initialValue = v || defaultV;
    }
  }
  return result;
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
 * 计算表达式的值
 *
 * @export
 * @param {*} fn
 * @returns
 */
function evil(fn) {
  // 一个变量指向Function，防止有些前端编译工具报错
  var Fn = Function;
  return new Fn("return ".concat(fn))();
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
 * 清空SessionStorage数据
 * @export
 * @param {*} key
 */
function clearSessionStorage() {
  var storage = window.sessionStorage;
  storage.clear();
}

/**
 * 获取工作队列
 * @export
 */
function getQueue() {
  if (typeof window.queue === 'undefined') {
    window.queueCustom = queue({
      concurrency: 3
    });
    window.queueCustom.start();
  }
  return window.queueCustom;
}

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state，
 * @export
 */
function getDerivedStateFromPropsForUrlParamsCore(nextProps) {
  var match = nextProps.match;
  if ((match || null) != null) {
    var params = match.params;
    if ((params || null) != null) {
      return {
        urlParams: params
      };
    }
  }
  return null;
}

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,如果值重复，则返回null，
 * @export
 */
function getDerivedStateFromPropsForUrlParams(nextProps, prevState) {
  var defaultUrlParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    id: ''
  };
  var parseUrlParamsForSetState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var stateUrlParams = getDerivedStateFromPropsForUrlParamsCore(nextProps);
  stateUrlParams = stateUrlParams || {
    urlParams: defaultUrlParams
  };
  var urlParamsPrev = prevState.urlParams;
  var _stateUrlParams = stateUrlParams,
    urlParams = _stateUrlParams.urlParams;
  if (isEqualBySerialize(_objectSpread(_objectSpread({}, urlParamsPrev || {}), {}), _objectSpread(_objectSpread({}, urlParams || {}), {}))) {
    return prevState;
  }
  if (isFunction(parseUrlParamsForSetState)) {
    var data = parseUrlParamsForSetState(stateUrlParams);
    return _objectSpread(_objectSpread(_objectSpread({}, prevState), stateUrlParams), data);
  }
  return _objectSpread(_objectSpread({}, prevState), stateUrlParams);
}
function arrayMove(array, from, to) {
  return arrayMoveImmutable(array, from, to);
}
function arrayMoveMutate(array, from, to) {
  return arrayMoveMutable(array, from, to);
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
function isEqualBySerialize(value, other) {
  var d1 = JSON.stringify(value || {});
  var d2 = JSON.stringify(other || {});
  return d1 === d2;
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
function difference(array, values) {
  return difference$1(array, values);
}

/**
 * 筛选需要的集合
 * @param {collection} 可筛选的对象，例如数组
 * @param {predicateFunction} 每次迭代调用的筛选函数
 */
function filter(collection, predicateFunction) {
  return filter$1(collection, predicateFunction);
}

/**
 * 创建一个元素数组。 以 iteratee 处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。 iteratees 调用1个参数： (value)。
 * @param {collection}  (Array|Object), 用来迭代的集合。
 * @param {predicateFunction} 这个函数决定排序
 */
function sortBy(collection, predicateFunction) {
  return sortBy$1(collection, predicateFunction);
}

/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index），而不是元素本身。
 * @param {array} (Array): 要搜索的数组。
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */
function findIndex(array, predicateFunction) {
  var fromIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return findIndex$1(array, predicateFunction, fromIndex);
}

/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index），而不是元素本身,返回匹配元素，否则返回 undefined。。
 * @param {array} (Array): 要搜索的数组。
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */
function find(array, predicateFunction) {
  var fromIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return find$1(array, predicateFunction, fromIndex);
}
function checkExist(array, predicateFunction) {
  var fromIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var result = find(array, predicateFunction, fromIndex);
  return !isUndefined(result);
}
function reverse(array) {
  return reverse$1(array);
}
function trim(source) {
  return trim$1(source);
}
function isUndefined(source) {
  return isUndefined$1(source);
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
function upperFirst(value) {
  return upperFirst$1(value);
}
function lowerFirst(value) {
  return lowerFirst$1(value);
}

/**
 * 移除数组中predicate（断言）返回为真值的所有元素，并返回移除元素组成的数组。predicate（断言） 会传入3个参数： (value, index, array)。
 * @param {*} array
 * @param {*} predicate (Array|Function|Object|string): 每次迭代调用的函数
 */
function removeFromArray(array, predicate) {
  return remove(array, predicate);
}
function stringIsNullOrWhiteSpace(value) {
  return stringIsNullOrWhiteSpace$1(value);
}

/**
 * base64解码
 */
function decodeBase64(target) {
  return decodeBase64$1(target);
}

/**
 * base64编码
 */
function encodeBase64(target) {
  return encodeBase64$1(target);
}

/**
 * 补零
 * @param {*} val
 * @returns
 */
function fixedZero(val) {
  return val * 1 < 10 ? "0".concat(val) : val;
}

/**
 * getTimeDistance
 */
function getTimeDistance(type) {
  var now = new Date();
  var oneDay = 1000 * 60 * 60 * 24;
  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now).utcOffset(8), moment(now.getTime() + (oneDay - 1000)).utcOffset(8)];
  }
  if (type === 'week') {
    var day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }
    var beginTime = now.getTime() - day * oneDay;
    return [moment(beginTime).utcOffset(8), moment(beginTime + (7 * oneDay - 1000)).utcOffset(8)];
  }
  if (type === 'month') {
    var _year = now.getFullYear();
    var month = now.getMonth();
    var nextDate = moment(now).add(1, 'months');
    var nextYear = nextDate.year();
    var nextMonth = nextDate.month();
    return [moment("".concat(_year, "-").concat(fixedZero(month + 1), "-01 00:00:00")).utcOffset(8), moment(moment("".concat(nextYear, "-").concat(fixedZero(nextMonth + 1), "-01 00:00:00")).utcOffset(8).valueOf() - 1000).utcOffset(8)];
  }
  var year = now.getFullYear();
  return [moment("".concat(year, "-01-01 00:00:00")).utcOffset(8), moment("".concat(year, "-12-31 23:59:59")).utcOffset(8)];
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
function checkLocalhost() {
  var hostname = toLower(window.location.hostname);
  return hostname === '127.0.0.1' || hostname === 'localhost';
}

/**
 * 尝试发送最近一次本地调用通知（一般用于开发阶段，提示调用的接口域）
 */
function trySendNearestLocalhostNotify(_ref22) {
  var text = _ref22.text;
  var needSend = false;
  var nearestTime = 0;
  if (checkLocalhost()) {
    var nearestLocalhostNotify = getNearestLocalhostNotifyCache() || null;
    if (nearestLocalhostNotify == null) {
      needSend = true;
    } else {
      nearestTime = nearestLocalhostNotify.nearestTime || 0;
    }
    var now = parseInt(new Date().getTime() / 1000, 10);
    try {
      if (nearestTime + 30 < now) {
        needSend = true;
      }
      if (needSend) {
        notification.open({
          placement: 'bottomLeft',
          message: '开发提示',
          description: "\u5F53\u524D\u63A5\u53E3\u57DF\u540D\uFF1A".concat(text, "\u3002")
        });
        setNearestLocalhostNotifyCache();
      }
    } catch (error) {
      recordLog(error);
    }
  }
}

/**
 * 文本缩略
 */
function ellipsis(value, length) {
  var symbol = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '...';
  if (value && value.length > length) {
    return "".concat(toString(value).substr(0, length)).concat(symbol);
  }
  return toString(value);
}
function notifySuccess(text) {
  var description = text || '数据已经操作成功，请进行后续操作。';
  notify({
    type: notificationTypeCollection.success,
    placement: 'bottomRight',
    message: '操作结果',
    description: description
  });
}
function notifyInfo(text) {
  var description = text || '';
  if (stringIsNullOrWhiteSpace(description)) {
    return;
  }
  notify({
    type: notificationTypeCollection.info,
    placement: 'bottomRight',
    message: '操作结果',
    description: description
  });
}
function notifyWarn(text) {
  var description = text || '';
  if (stringIsNullOrWhiteSpace(description)) {
    return;
  }
  notify({
    type: notificationTypeCollection.warn,
    placement: 'bottomRight',
    message: '警告信息',
    description: description
  });
}
function notifyError(text) {
  var description = text || '';
  if (stringIsNullOrWhiteSpace(description)) {
    return;
  }
  notify({
    type: notificationTypeCollection.error,
    placement: 'bottomRight',
    message: '错误信息',
    description: description
  });
}

/**
 * 发送页面通知
 */
function notify(_ref23) {
  var type = _ref23.type,
    placementValue = _ref23.placement,
    messageValue = _ref23.message,
    descriptionValue = _ref23.description;
  var _placement$message$de = _objectSpread(_objectSpread({}, {
      placement: 'bottomRight',
      message: '操作结果',
      description: '操作结果描述'
    }), {
      placement: placementValue,
      message: messageValue,
      description: descriptionValue
    }),
    placement = _placement$message$de.placement,
    messageText = _placement$message$de.message,
    description = _placement$message$de.description;
  setTimeout(function () {
    switch (type) {
      case notificationTypeCollection.success:
        notification.success({
          placement: placement,
          message: messageText,
          description: description
        });
        break;
      case notificationTypeCollection.warning:
        notification.warning({
          placement: placement,
          message: messageText,
          description: description
        });
        break;
      case notificationTypeCollection.error:
        notification.error({
          placement: placement,
          message: messageText,
          description: description
        });
        break;
      case notificationTypeCollection.info:
        notification.info({
          placement: placement,
          message: messageText,
          description: description
        });
        break;
      case notificationTypeCollection.warn:
        notification.warn({
          placement: placement,
          message: messageText,
          description: description
        });
        break;
      default:
        notification.open({
          placement: placement,
          message: messageText,
          description: description
        });
        break;
    }
  }, 600);
}
function recordLog(record, showMode) {
  var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : logLevel.debug;
  recordLog$1(record, showMode, level);
}
function recordWarn(record) {
  recordWarn$1(record);
}
function recordInfo(record) {
  recordInfo$1(record);
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

/**
 * 依照某个键的值进行排序，请确保键的值为数字型
 */
function sortCollectionByKey(_ref25) {
  var operate = _ref25.operate,
    item = _ref25.item,
    list = _ref25.list,
    sortKey = _ref25.sortKey,
    _ref25$sortMin = _ref25.sortMin,
    sortMin = _ref25$sortMin === void 0 ? 0 : _ref25$sortMin;
  if ((item || null) == null) {
    return list;
  }
  var beforeList = [];
  var afterList = [];
  var result = [];
  if ((list || []).length <= 1) {
    var text = '无需排序!';
    showWarnMessage({
      message: text
    });
    return list;
  }
  var itemSort = getValueByKey({
    data: item,
    key: sortKey,
    convert: convertCollection.number
  });
  (list || []).forEach(function (o) {
    var sort = getValueByKey({
      data: o,
      key: sortKey,
      convert: convertCollection.number
    });
    if (sort < itemSort) {
      beforeList.push(o);
    }
    if (sort > itemSort) {
      afterList.push(o);
    }
  });
  switch (operate) {
    case sortOperate.moveUp:
      if (itemSort === sortMin) {
        var _text3 = '已经排在首位!';
        showWarnMessage({
          message: _text3
        });
        return list;
      }
      (beforeList || []).forEach(function (o, index) {
        if (index < beforeList.length - 1) {
          result.push(o);
        } else {
          var o1 = item;
          o1[sortKey] -= 1;
          result.push(o1);
          var o2 = o;
          o2[sortKey] += 1;
          result.push(o2);
        }
      });
      result = result.concat(afterList);
      break;
    case sortOperate.moveDown:
      if (itemSort === (list || []).length + sortMin - 1) {
        var _text4 = '已经排在末位!';
        showWarnMessage({
          message: _text4
        });
        return list;
      }
      result = result.concat(beforeList);
      (afterList || []).forEach(function (o, index) {
        if (index === 0) {
          var o2 = o;
          o2[sortKey] -= 1;
          result.push(o2);
          var o1 = item;
          o1[sortKey] += 1;
          result.push(o1);
        } else {
          result.push(o);
        }
      });
      break;
    default:
      {
        var _text5 = "\u4E0D\u7B26\u5408\u7684\u64CD\u4F5C\uFF0C\u5141\u8BB8\u7684\u64CD\u4F5C\u4E3A['".concat(sortOperate.moveUp, "','").concat(sortOperate.moveDown, "']!");
        showWarnMessage({
          message: _text5
        });
        break;
      }
  }
  return result;
}
function queryStringify(data) {
  return stringify(data);
}
function queryStringParse(data) {
  return parse(data);
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
function empty() {
  return {};
}

export { arrayMove, arrayMoveMutate, buildFieldDescription, buildFieldHelper, calculateTimeInterval, checkDevelopment, checkExist, checkFromConfig, checkLocalhost, clearSessionStorage, cloneWithoutMethod, convertTarget, copyToClipboard, corsTarget, dateToMoment, decodeBase64, defaultBaseState, defaultCommonState, defaultCoreState, defaultFormState, defaultListState, defaultPageListState, difference, ellipsis, empty, encodeBase64, endsWith, evil, filter, find, findIndex, fixedZero, formatDatetime, formatDecimal, formatMoney, formatMoneyToChinese, formatTarget, getBrowserInfo, getDerivedStateFromPropsForUrlParams, getDerivedStateFromPropsForUrlParamsCore, getGuid, getMomentNow, getPathValue, getQueue, getRandomColor, getTimeDistance, getValue, getValueByKey, goToPath, inCollection, isArray, isBoolean, isDatetime, isEqual, isEqualBySerialize, isFunction, isInvalid, isMoney, isNumber, isObject, isString, isUndefined, lowerFirst, notify, notifyError, notifyInfo, notifySuccess, notifyWarn, numeralFormat, queryStringParse, queryStringify, recordDebug, recordError, recordInfo, recordLog, recordObject, recordText, recordWarn, redirectToPath, refitCommonData, refitFieldDecoratorOption, removeEndMatch, removeFromArray, removeLastMatch, replace, replaceTargetText, requestAnimFrame, reverse, roundToTarget, searchFromList, seededRandom, showError, showErrorMessage, showInfoMessage, showLoadingMessage, showMessage, showOpenMessage, showRuntimeError, showSuccessMessage, showWarnMessage, showWarningMessage, sortBy, sortCollectionByKey, sortedUnique, split, stringIsEmpty, stringIsNullOrWhiteSpace, stringToMoment, toDatetime, toMoment, toMoney, toNumber, toPercentage, toString, transformData, transformListData, trim, trySendNearestLocalhostNotify, upperFirst };
