"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultBaseState = defaultBaseState;
exports.defaultCoreState = defaultCoreState;
exports.defaultCommonState = defaultCommonState;
exports.defaultListState = defaultListState;
exports.defaultPageListState = defaultPageListState;
exports.defaultFormState = defaultFormState;
exports.getValue = getValue;
exports.copyToClipboard = copyToClipboard;
exports.stringIsEmpty = stringIsEmpty;
exports.replaceTargetText = replaceTargetText;
exports.checkDevelopment = checkDevelopment;
exports.corsTarget = corsTarget;
exports.showRuntimeErrorMessage = showRuntimeErrorMessage;
exports.showRuntimeError = showRuntimeError;
exports.showSuccessMessage = showSuccessMessage;
exports.showErrorMessage = showErrorMessage;
exports.showWarnMessage = showWarnMessage;
exports.showWarningMessage = showWarningMessage;
exports.showInfoMessage = showInfoMessage;
exports.showLoadingMessage = showLoadingMessage;
exports.showOpenMessage = showOpenMessage;
exports.showMessage = showMessage;
exports.recordLog = recordLog;
exports.recordText = recordText;
exports.recordObject = recordObject;
exports.getGuid = getGuid;
exports.inCollection = inCollection;
exports.isInvalid = isInvalid;
exports.toDatetime = toDatetime;
exports.formatDatetime = formatDatetime;
exports.numeralFormat = numeralFormat;
exports.stringToMoment = stringToMoment;
exports.getMomentNow = getMomentNow;
exports.dateToMoment = dateToMoment;
exports.isDatetime = isDatetime;
exports.isNumber = isNumber;
exports.toNumber = toNumber;
exports.split = split;
exports.toString = toString;
exports.roundToTarget = roundToTarget;
exports.isMoney = isMoney;
exports.toMoney = toMoney;
exports.getPathValue = getPathValue;
exports.formatDecimal = formatDecimal;
exports.formatMoney = formatMoney;
exports.toPercentage = toPercentage;
exports.formatMoneyToChinese = formatMoneyToChinese;
exports.getRandomColor = getRandomColor;
exports.getBrowserInfo = getBrowserInfo;
exports.refitFieldDecoratorOption = refitFieldDecoratorOption;
exports.refitCommonData = refitCommonData;
exports.evil = evil;
exports.searchFromList = searchFromList;
exports.buildFieldHelper = buildFieldHelper;
exports.buildFieldDescription = buildFieldDescription;
exports.pretreatmentRemoteSingleData = pretreatmentRemoteSingleData;
exports.pretreatmentRemoteListData = pretreatmentRemoteListData;
exports.pretreatmentRemotePageListData = pretreatmentRemotePageListData;
exports.pretreatmentRequestParams = pretreatmentRequestParams;
exports.getStringFromSessionStorage = getStringFromSessionStorage;
exports.getStringFromLocalStorage = getStringFromLocalStorage;
exports.getJsonFromSessionStorage = getJsonFromSessionStorage;
exports.getJsonFromLocalStorage = getJsonFromLocalStorage;
exports.saveStringToSessionStorage = saveStringToSessionStorage;
exports.saveStringToLocalStorage = saveStringToLocalStorage;
exports.saveJsonToSessionStorage = saveJsonToSessionStorage;
exports.saveJsonToLocalStorage = saveJsonToLocalStorage;
exports.removeSessionStorage = removeSessionStorage;
exports.removeLocalStorage = removeLocalStorage;
exports.clearSessionStorage = clearSessionStorage;
exports.clearLocalStorage = clearLocalStorage;
exports.getQueue = getQueue;
exports.getDerivedStateFromPropsForUrlParamsCore = getDerivedStateFromPropsForUrlParamsCore;
exports.getDerivedStateFromPropsForUrlParams = getDerivedStateFromPropsForUrlParams;
exports.arrayMove = arrayMove;
exports.arrayMoveMutate = arrayMoveMutate;
exports.isEqual = isEqual;
exports.isEqualBySerialize = isEqualBySerialize;
exports.cloneWithoutMethod = cloneWithoutMethod;
exports.isFunction = isFunction;
exports.isArray = isArray;
exports.isObject = isObject;
exports.difference = difference;
exports.filter = filter;
exports.sortBy = sortBy;
exports.findIndex = findIndex;
exports.find = find;
exports.checkExist = checkExist;
exports.reverse = reverse;
exports.trim = trim;
exports.replace = replace;
exports.isBoolean = isBoolean;
exports.isUndefined = isUndefined;
exports.isNull = isNull;
exports.isDate = isDate;
exports.isString = isString;
exports.removeFromArray = removeFromArray;
exports.stringIsNullOrWhiteSpace = stringIsNullOrWhiteSpace;
exports.decodeBase64 = decodeBase64;
exports.encodeBase64 = encodeBase64;
exports.fixedZero = fixedZero;
exports.getTimeDistance = getTimeDistance;
exports.handleCommonDataAssist = handleCommonDataAssist;
exports.handleListDataAssist = handleListDataAssist;
exports.handlePageListDataAssist = handlePageListDataAssist;
exports.formatMessage = formatMessage;
exports.checkLocalhost = checkLocalhost;
exports.getNearestLocalhostNotifyCache = getNearestLocalhostNotifyCache;
exports.setNearestLocalhostNotifyCache = setNearestLocalhostNotifyCache;
exports.removeNearestLocalhostNotifyCache = removeNearestLocalhostNotifyCache;
exports.trySendNearestLocalhostNotify = trySendNearestLocalhostNotify;
exports.ellipsis = ellipsis;
exports.notifySuccess = notifySuccess;
exports.notify = notify;
exports.requestAnimFrame = void 0;

require("antd/es/notification/style");

function _notification2() {
  const data = _interopRequireDefault(require("antd/es/notification"));

  _notification2 = function _notification2() {
    return data;
  };

  return data;
}

require("antd/es/message/style");

function _message2() {
  const data = _interopRequireDefault(require("antd/es/message"));

  _message2 = function _message2() {
    return data;
  };

  return data;
}

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _umi() {
  const data = require("umi");

  _umi = function _umi() {
    return data;
  };

  return data;
}

function _antd() {
  const data = require("antd");

  _antd = function _antd() {
    return data;
  };

  return data;
}

function _moment() {
  const data = _interopRequireDefault(require("moment"));

  _moment = function _moment() {
    return data;
  };

  return data;
}

function _uuid() {
  const data = require("uuid");

  _uuid = function _uuid() {
    return data;
  };

  return data;
}

function _copyToClipboard() {
  const data = _interopRequireDefault(require("copy-to-clipboard"));

  _copyToClipboard = function _copyToClipboard() {
    return data;
  };

  return data;
}

function _queue() {
  const data = _interopRequireDefault(require("queue"));

  _queue = function _queue() {
    return data;
  };

  return data;
}

function _numeral() {
  const data = _interopRequireDefault(require("numeral"));

  _numeral = function _numeral() {
    return data;
  };

  return data;
}

function _arrayMove() {
  const data = _interopRequireDefault(require("array-move"));

  _arrayMove = function _arrayMove() {
    return data;
  };

  return data;
}

function _lodash() {
  const data = require("lodash");

  _lodash = function _lodash() {
    return data;
  };

  return data;
}

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const storageKeyCollection = {
  nearestLocalhostNotify: 'nearestLocalhostNotify'
};

function getConfigData() {
  let corsTargetDomain = '';

  if (_constants.appInitCustom != null) {
    if (_constants.appInitCustom.apiPrefix != null) {
      if (_constants.appInitCustom.apiPrefix.corsTargetDomain != null) {
        const corsTargetDomainRemote = _constants.appInitCustom.apiPrefix.corsTargetDomain;
        corsTargetDomain = corsTargetDomainRemote;
      }
    }
  } else {
    _message2().default.warn('未配置跨域域名');
  }

  return {
    corsTargetDomain
  };
}

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
  const data = _objectSpread(_objectSpread({}, defaultBaseState()), {
    dataLoading: true
  });

  return data;
}

function defaultCommonState() {
  const data = _objectSpread(_objectSpread({}, defaultCoreState()), {
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
  const data = _objectSpread(_objectSpread({}, defaultCommonState()), {
    dateRangeFieldName: '发生时间',
    tableScroll: {
      x: 1520
    },
    formValues: {},
    startTimeAlias: '',
    endTimeAlias: '',
    startTime: '',
    endTime: '',
    listViewMode: _constants.listViewModeCollection.table,
    showSelect: false,
    selectedDataTableDataRows: []
  });

  return data;
}

function defaultPageListState() {
  const data = _objectSpread(_objectSpread({}, defaultCommonState()), {
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
    listViewMode: _constants.listViewModeCollection.table,
    showSelect: false,
    selectedDataTableDataRows: []
  });

  return data;
}

function defaultFormState() {
  const data = _objectSpread(_objectSpread({}, defaultCommonState()), {
    errorFieldName: '',
    submitApiPath: ''
  });

  return data;
}

function getValue(obj) {
  return Object.keys(obj).map(key => obj[key]).join(',');
}
/**
 * 复制到剪贴板
 * @param {*} text
 * @param {*} showText
 */


function copyToClipboard(text, showCopyText = true, otherShowText = '') {
  (0, _copyToClipboard().default)(text);

  if (showCopyText) {
    _message2().default.success(`已经将 ${text} 复制到剪贴板！`);
  } else if (stringIsNullOrWhiteSpace(otherShowText)) {
    _message2().default.success('已经复制到剪贴板！');
  } else {
    _message2().default.success(`已经将${otherShowText}复制到剪贴板！`);
  }
}
/**
 * 复制到剪贴板
 * @param {*} text
 */


function stringIsEmpty(text) {
  return (0, _lodash().isEmpty)(toString(text || '').replace(' ', ''));
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
  let result = toString(text);
  const textLength = (text || '').length;

  if (textLength > 0 && (beforeKeepNumber >= 0 || afterKeepNumber >= 0)) {
    if (beforeKeepNumber >= textLength || afterKeepNumber >= textLength || (beforeKeepNumber || 0) + (afterKeepNumber || 0) >= textLength) {
      result = text;
    } else {
      const beforeKeep = text.substr(0, beforeKeepNumber);
      const afterKeep = text.substr(textLength - afterKeepNumber, afterKeepNumber); // const replaceTargetLength = textLength - (beforeKeepNumber || 0) - (afterKeepNumber || 0);
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
  const c = getConfigData();
  return c.corsTargetDomain;
}

function showRuntimeErrorMessage(text, showStack = true) {
  showRuntimeError({
    text: toString(text)
  }, showStack);
}

function showRuntimeError({
  text
}, showStack = true) {
  try {
    if (!stringIsNullOrWhiteSpace(text || '')) {
      showErrorMessage({
        message: text
      });
    }

    if (showStack) {
      throw new Error(`${stringIsNullOrWhiteSpace(text || '') ? '' : `${toString(text)},`}调用堆栈:`);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.stack);
  }
}

function showSuccessMessage({
  duration = 3,
  message: messageText,
  onClose = () => {}
}) {
  showMessage({
    type: _constants.messageTypeCollection.success,
    message: messageText,
    duration,
    onClose
  });
}

function showErrorMessage({
  duration = 3,
  message: messageText,
  onClose = () => {}
}) {
  showMessage({
    type: _constants.messageTypeCollection.error,
    message: messageText,
    duration,
    onClose
  });
}

function showWarnMessage({
  duration = 3,
  message: messageText,
  onClose = () => {}
}) {
  showMessage({
    type: _constants.messageTypeCollection.warn,
    message: messageText,
    duration,
    onClose
  });
}

function showWarningMessage({
  duration = 3,
  message: messageText,
  onClose = () => {}
}) {
  showMessage({
    type: _constants.messageTypeCollection.warning,
    message: messageText,
    duration,
    onClose
  });
}

function showInfoMessage({
  duration = 3,
  message: messageText,
  onClose = () => {}
}) {
  showMessage({
    type: _constants.messageTypeCollection.info,
    message: messageText,
    duration,
    onClose
  });
}

function showLoadingMessage({
  duration = 3,
  message: messageText,
  onClose = () => {}
}) {
  showMessage({
    type: _constants.messageTypeCollection.loading,
    message: messageText,
    duration,
    onClose
  });
}

function showOpenMessage({
  duration = 3,
  message: messageText,
  onClose = () => {}
}) {
  showMessage({
    type: _constants.messageTypeCollection.open,
    message: messageText,
    duration,
    onClose
  });
}

function showMessage({
  type,
  duration = 3,
  message: messageText,
  onClose = () => {}
}) {
  requestAnimationFrame(() => {
    switch (type) {
      case _constants.messageTypeCollection.success:
        _message2().default.success(messageText, duration, onClose);

        break;

      case _constants.messageTypeCollection.error:
        _message2().default.warn(messageText, duration, onClose);

        break;

      case _constants.messageTypeCollection.info:
        _message2().default.info(messageText, duration, onClose);

        break;

      case _constants.messageTypeCollection.warning:
        _message2().default.warning(messageText, duration, onClose);

        break;

      case _constants.messageTypeCollection.warn:
        _message2().default.warn(messageText, duration, onClose);

        break;

      case _constants.messageTypeCollection.loading:
        _message2().default.loading(messageText, duration, onClose);

        break;

      default:
        _message2().default.open(messageText, duration, onClose);

        break;
    }
  });
}
/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */


function recordLog(record, showMode, level = _constants.logLevel.debug) {
  if (logShowInConsole()) {
    if (showMode === _constants.logShowMode.text) {
      const data = {
        level,
        record
      }; // eslint-disable-next-line no-console

      console.log(JSON.stringify(data));
    }

    if (showMode === _constants.logShowMode.object) {
      // eslint-disable-next-line no-console
      console.log({
        level,
        record
      });
    }
  }
}
/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */


function recordText(record, level = _constants.logLevel.debug) {
  recordLog(record, _constants.logShowMode.text, level);
}
/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */


function recordObject(record, level = _constants.logLevel.debug) {
  recordLog(record, _constants.logShowMode.object, level);
}

function logShowInConsole() {
  const NODE_ENV = process.env.NODE_ENV;

  if (NODE_ENV === 'development') {
    return true;
  }

  return false;
}
/**
 * 获取Guid
 *
 * @export
 * @param {*} v
 * @returns
 */


function getGuid() {
  return (0, _uuid().v4)();
}
/**
 * 检测目标是否在数组址之中
 */


function inCollection(collection, value) {
  let result = false;

  if (!isArray(collection)) {
    return result;
  }

  collection.some(o => {
    if (o === value) {
      result = true;
      return true;
    }

    return false;
  });
  return result;
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
    const i = v.indexOf('T');

    if (i < 0) {
      // eslint-disable-next-line no-useless-escape
      const value = v.replace(/\-/g, '/');
      const result = new Date(value);
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


function formatDatetime(v, formatString = 'YYYY-MM-DD', defaultValue = '') {
  if ((v || '') === '') {
    return defaultValue;
  }

  const m = (0, _moment().default)(typeof v === 'object' ? v : new Date(v.replace('/', '-')));

  if (m.isSame(_constants.emptyDatetime)) {
    return defaultValue;
  }

  return m.format(formatString);
}

function numeralFormat(v, formatString) {
  return (0, _numeral().default)(v).format(formatString);
}
/**
 * 转化为Moment时间
 *
 * @export
 * @param {*} v
 * @returns
 */


function stringToMoment(v) {
  if (_moment().default.isMoment(v)) return v;
  const d = (v || '').toString();

  if (stringIsNullOrWhiteSpace(d)) {
    return null;
  }

  return (0, _moment().default)(new Date(d.replace('/', '-')));
}
/**
 * 当前Moment时间
 *
 * @export
 * @param {*} v
 * @returns
 */


function getMomentNow() {
  return (0, _moment().default)();
}
/**
 * 转化为Moment时间
 *
 * @export
 * @param {*} v
 * @returns
 */


function dateToMoment(v) {
  const m = (0, _moment().default)(v);

  if (m.isSame(_constants.emptyDatetime)) {
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
  const date = `${typeof v === 'undefined' ? null : v}`;
  const result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);

  if (result == null) {
    return false;
  }

  const d = new Date(result[1], result[3] - 1, result[4]);
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
  const str = `${typeof v === 'undefined' ? null : v}`;

  if (str === '') {
    return false;
  }

  const regular = /^[0-9]*$/;
  const re = new RegExp(regular);
  return re.test(str);
}
/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */


function toNumber(v) {
  const value = (0, _lodash().toNumber)(v);
  return Number.isNaN(value) ? 0 : value;
}
/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */


function split(source, separator, limit = 1000) {
  return (0, _lodash().split)(source, separator, limit);
}
/**
 * 转换为文本
 *
 * @export
 * @param {*} str
 * @returns
 */


function toString(value) {
  return (0, _lodash().toString)(value);
}
/**
 *
 *@param  val 值 len保留小数位数
 *
 */


function roundToTarget(v, len) {
  const temp = Math.pow(10, len);
  return Math.round(v * temp) / temp;
}
/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */


function isMoney(v) {
  const str = `${typeof v === 'undefined' ? null : v}`;

  if (str === '') {
    return false;
  }

  const regular = /^([1-9][\d]{0,15}|0)(\.[\d]{1,2})?$/;
  const re = new RegExp(regular);
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

function getPathValue(o, path, defaultValue = null) {
  if (isUndefined(o)) {
    return null || defaultValue;
  }

  if (o == null) {
    return null || defaultValue;
  }

  if (!isString(path)) {
    showRuntimeErrorMessage('getPathValue Function param path must be string');
    return null;
  }

  const v = (0, _lodash().get)(o, path, defaultValue);

  if (isUndefined(defaultValue) || isNull(defaultValue)) {
    return v;
  }

  return v || defaultValue;
}
/**
 * 格式化货币
 *
 * @export
 * @param {*} str
 * @returns
 */


function formatDecimal(numberSource, placesSource = 2, thousandSource = ',', decimalSource = '.') {
  return formatMoney(numberSource, placesSource, '', thousandSource, decimalSource);
}
/**
 * 格式化货币
 *
 * @export
 * @param {*} str
 * @returns
 */


function formatMoney(numberSource, symbolSource = '￥', format = '0,0.00') {
  return `${symbolSource}${(0, _numeral().default)(numberSource).format(format)}`;
}

function toPercentage(val, format = '0,0.00') {
  (0, _numeral().default)(val);
  return `${(0, _numeral().default)(toNumber(val * 1000) / 10).format(format)}%`;
}
/**
 * 转换金额为人民币大写
 *
 * @export
 * @param {*} v
 * @returns
 */


function formatMoneyToChinese(v) {
  let money = v;
  const cnNumber = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']; // 汉字的数字

  const cnIntBasic = ['', '拾', '佰', '仟']; // 基本单位

  const cnIntUnits = ['', '万', '亿', '兆']; // 对应整数部分扩展单位

  const cnDecUnits = ['角', '分', '毫', '厘']; // 对应小数部分单位
  // var cnInteger = "整"; // 整数金额时后面跟的字符

  const cnIntLast = '元'; // 整型完以后的单位

  const maxNum = 999999999999999.9999; // 最大处理的数字

  let IntegerNum; // 金额整数部分

  let DecimalNum; // 金额小数部分

  let ChineseString = ''; // 输出的中文金额字符串

  let parts; // 分离金额后用的数组，预定义

  if (money === '') {
    return '';
  }

  money = parseFloat(money);

  if (money >= maxNum) {
    return '超出最大处理数字';
  }

  if (money === 0) {
    ChineseString = cnNumber[0] + cnIntLast;
    return ChineseString;
  }

  money = money.toString(); // 转换为字符串

  if (money.indexOf('.') === -1) {
    IntegerNum = money;
    DecimalNum = '';
  } else {
    parts = money.split('.');
    var _parts = parts;

    var _parts2 = _slicedToArray(_parts, 2);

    IntegerNum = _parts2[0];
    DecimalNum = _parts2[1];
    DecimalNum = parts[1].substr(0, 4);
  }

  if (parseInt(IntegerNum, 10) > 0) {
    // 获取整型部分转换
    let zeroCount = 0;
    const IntLen = IntegerNum.length;

    for (let i = 0; i < IntLen; i += 1) {
      const n = IntegerNum.substr(i, 1);
      const p = IntLen - i - 1;
      const q = p / 4;
      const m = p % 4;

      if (n === '0') {
        zeroCount += 1;
      } else {
        if (zeroCount > 0) {
          ChineseString += cnNumber[0];
        }

        zeroCount = 0; // 归零

        ChineseString += cnNumber[parseInt(n, 10)] + cnIntBasic[m];
      }

      if (m === 0 && zeroCount < 4) {
        ChineseString += cnIntUnits[q];
      }
    }

    ChineseString += cnIntLast; // 整型部分处理完毕
  }

  if (DecimalNum !== '') {
    // 小数部分
    const decLen = DecimalNum.length;

    for (let i = 0; i < decLen; i += 1) {
      const n = DecimalNum.substr(i, 1);

      if (n !== '0') {
        ChineseString += cnNumber[Number(n)] + cnDecUnits[i];
      }
    }
  }

  if (ChineseString === '') {
    ChineseString += cnNumber[0] + cnIntLast;
  }

  return ChineseString;
}

function seededRandom(seed, min, max) {
  const maxValue = max || 1;
  const minValue = min || 0;
  const seedValue = (seed * 9301 + 49297) % 233280;
  const rnd = seedValue / 233280.0;
  return minValue + rnd * (maxValue - minValue);
}
/**
 * 通过种子返回随机颜色值
 *
 * @export
 * @param {*} seed
 * @returns
 */


function getRandomColor(seed) {
  // eslint-disable-next-line
  return `#${`00000${(seededRandom(seed) * 0x1000000 << 0).toString(16)}`.substr(-6)}`;
}

function getBrowserInfoCore() {
  const getBrowserVersion = () => {
    const u = navigator.userAgent;
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
  const result = originalOption;
  const justiceV = typeof justice !== 'undefined' && justice !== null;
  const defaultV = typeof defaultValue === 'undefined' ? null : defaultValue;

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
  let result = [];

  if (typeof listData !== 'undefined') {
    if (listData !== null) {
      result = [...listData];
    }
  }

  if (typeof otherListData !== 'undefined') {
    if (otherListData !== null) {
      result = [...result, ...otherListData];
    }
  }

  if (typeof empty !== 'undefined') {
    if (empty !== null) {
      result = [empty, ...result];
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
  const Fn = Function;
  return new Fn(`return ${fn}`)();
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
  const d = sourceData || [];
  let result = null;

  if (itemValue == null) {
    return result;
  }

  d.forEach(o => {
    if (o[itemKey] === itemValue) {
      result = o;
    }
  });
  return result;
}

function errorCustomData() {
  return {
    code: -1,
    message: '',
    data: null,
    list: [],
    extra: null
  };
}

function dataExceptionNotice(d) {
  const code = d.code,
        messageText = d.message;
  const c = errorCustomData();
  const lastCustomMessage = window.lastCustomMessage || {
    code: -1,
    message: '',
    time: new Date().getTime()
  };

  if (code !== c.code) {
    if ((messageText || '') !== '') {
      const currentTime = new Date().getTime();

      if (code === lastCustomMessage.code) {
        if (currentTime - lastCustomMessage.time > 800) {
          requestAnimationFrame(() => {
            _message2().default.error(messageText);
          });
          window.lastCustomMessage = {
            code,
            message: messageText,
            time: currentTime
          };
        }
      } else {
        requestAnimationFrame(() => {
          _message2().default.error(messageText);
        });
        window.lastCustomMessage = {
          code,
          message: messageText,
          time: currentTime
        };
      }
    }

    if (code === _constants.authenticationFailCode) {
      requestAnimationFrame(() => {
        _umi().history.replace('/user/login');
      });
    }
  }
}
/**
 * 构建描述文本
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */


function buildFieldHelper(v, prefix = '注：') {
  return `${prefix}${v}。`;
}
/**
 * 构建描述文本
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */


function buildFieldDescription(v, op, other) {
  const o = (other || '') === '' ? '' : `,${other}`;
  return `请${op || '输入'}${v}${o}`;
}
/**
 * 预处理单项数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */


function pretreatmentRemoteSingleData(d) {
  const _ref = d || errorCustomData(),
        code = _ref.code,
        messageText = _ref.message;

  let v = {};

  if (code === 200) {
    const data = d.data,
          extra = d.extra;
    v = {
      code,
      message: messageText,
      data: data || {},
      extra: extra || {},
      dataSuccess: true
    };
  } else {
    v = {
      code,
      message: messageText || '网络异常',
      data: null,
      extra: null,
      dataSuccess: false
    };
    dataExceptionNotice(v);
  }

  return v;
}
/**
 * 预处理集合数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */


function pretreatmentRemoteListData(d, listItemHandler) {
  const _ref2 = d || errorCustomData(),
        code = _ref2.code,
        messageText = _ref2.message;

  let v = {};

  if (code === 200) {
    const listData = d.list,
          extraData = d.extra;
    const list = (listData || []).map((item, index) => {
      let o = item;

      if ((o.key || null) == null) {
        o.key = `list-${index}`;
      }

      if (typeof listItemHandler === 'function') {
        o = listItemHandler(o);
      }

      return o;
    });
    v = {
      code,
      message: messageText,
      count: (list || []).length,
      list,
      extra: extraData,
      dataSuccess: true
    };
  } else {
    v = {
      code,
      message: messageText || '网络异常',
      count: 0,
      list: [],
      extra: null,
      dataSuccess: false
    };
    dataExceptionNotice(v);
  }

  return v;
}
/**
 * 预处理分页数据返回
 *
 * @export
 * @param {*} d
 * @returns
 */


function pretreatmentRemotePageListData(d, listItemHandler) {
  const _ref3 = d || errorCustomData(),
        code = _ref3.code,
        messageText = _ref3.message;

  let v = {};

  if (code === 200) {
    const listData = d.list,
          extraData = d.extra;
    const pageNo = extraData.pageNo;
    const list = (listData || []).map((item, index) => {
      let o = item;

      if ((o.key || null) == null) {
        o.key = `${pageNo}-${index}`;
      }

      if (typeof listItemHandler === 'function') {
        o = listItemHandler(o);
      }

      return o;
    });
    v = {
      code,
      message: messageText,
      count: (list || []).length,
      list,
      pagination: {
        total: extraData.total,
        pageSize: extraData.pageSize,
        current: parseInt(pageNo || 1, 10) || 1
      },
      extra: extraData,
      dataSuccess: true
    };
  } else {
    v = {
      code,
      message: messageText || '网络异常',
      count: 0,
      list: [],
      extra: null,
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1
      },
      dataSuccess: false
    };
    dataExceptionNotice(v);
  }

  return v;
}
/**
 * 预处理数据请求
 *
 * @export
 * @param {*} d
 * @returns
 */


function pretreatmentRequestParams(params, customHandle) {
  let submitData = params || {};

  if (typeof customHandle === 'function') {
    submitData = customHandle(submitData);
  }

  return submitData;
}
/**
 * 获取SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */


function getStringFromSessionStorage(key) {
  const storage = window.sessionStorage;
  const value = storage.getItem(key);

  if (process.env.NODE_ENV === 'development') {
    return value;
  }

  const decode = decodeBase64(value);
  const v = encodeBase64(decode);

  if (value !== v) {
    return null;
  }

  return decode;
}
/**
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */


function getStringFromLocalStorage(key) {
  const storage = window.localStorage;
  const value = storage.getItem(key);

  if (process.env.NODE_ENV === 'development') {
    return value;
  }

  const decode = decodeBase64(value);
  const v = encodeBase64(decode);

  if (value !== v) {
    return null;
  }

  return decode;
}
/**
 * 获取SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */


function getJsonFromSessionStorage(key) {
  const jsonString = getStringFromSessionStorage(key);

  if (jsonString) {
    return JSON.parse(jsonString || '{}');
  }

  return null;
}
/**
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */


function getJsonFromLocalStorage(key) {
  const jsonString = getStringFromLocalStorage(key);

  if (jsonString) {
    return JSON.parse(jsonString || '{}');
  }

  return null;
}
/**
 * 存储SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */


function saveStringToSessionStorage(key, value) {
  const storage = window.sessionStorage;

  if (process.env.NODE_ENV === 'development') {
    storage.setItem(key, value);
  } else {
    storage.setItem(key, encodeBase64(value));
  }
}
/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */


function saveStringToLocalStorage(key, value) {
  const storage = window.localStorage;

  if (process.env.NODE_ENV === 'development') {
    storage.setItem(key, value);
  } else {
    storage.setItem(key, encodeBase64(value));
  }
}
/**
 * 存储SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */


function saveJsonToSessionStorage(key, json) {
  saveStringToSessionStorage(key, JSON.stringify(json || {}));
}
/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */


function saveJsonToLocalStorage(key, json) {
  saveStringToLocalStorage(key, JSON.stringify(json || {}));
}
/**
 * 移除SessionStorage数据
 * @export
 * @param {*} key
 */


function removeSessionStorage(key) {
  const storage = window.sessionStorage;
  storage.removeItem(key);
}
/**
 * 移除LocalStorage数据
 * @export
 * @param {*} key
 */


function removeLocalStorage(key) {
  const storage = window.localStorage;
  storage.removeItem(key);
}
/**
 * 清空SessionStorage数据
 * @export
 * @param {*} key
 */


function clearSessionStorage() {
  const storage = window.sessionStorage;
  storage.clear();
}
/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */


function clearLocalStorage() {
  const storage = window.localStorage;
  storage.clear();
}
/**
 * 获取工作队列
 * @export
 */


function getQueue() {
  if (typeof window.queue === 'undefined') {
    window.queueCustom = (0, _queue().default)({
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars


function getDerivedStateFromPropsForUrlParamsCore(nextProps, prevState) {
  const match = nextProps.match;

  if ((match || null) != null) {
    const params = match.params;

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


function getDerivedStateFromPropsForUrlParams(nextProps, prevState, defaultUrlParams = {
  id: ''
}, parseUrlParamsForSetState = null) {
  let stateUrlParams = getDerivedStateFromPropsForUrlParamsCore(nextProps, prevState);
  stateUrlParams = stateUrlParams || {
    urlParams: defaultUrlParams
  };
  const urlParamsPrev = prevState.urlParams;
  const _stateUrlParams = stateUrlParams,
        urlParams = _stateUrlParams.urlParams;

  if (isEqualBySerialize(_objectSpread(_objectSpread({}, urlParamsPrev || {}), {}), _objectSpread(_objectSpread({}, urlParams || {}), {}))) {
    return prevState;
  }

  if (isFunction(parseUrlParamsForSetState)) {
    const data = parseUrlParamsForSetState(stateUrlParams);
    return _objectSpread(_objectSpread(_objectSpread({}, prevState), stateUrlParams), data);
  }

  return _objectSpread(_objectSpread({}, prevState), stateUrlParams);
}

function arrayMove(array, from, to) {
  return (0, _arrayMove().default)(array, from, to);
}

function arrayMoveMutate(array, from, to) {
  return _arrayMove().default.mutate(array, from, to);
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
  return (0, _lodash().isEqual)(value, other);
}

function isEqualBySerialize(value, other) {
  const d1 = JSON.stringify(value || {});
  const d2 = JSON.stringify(other || {});
  return d1 === d2;
}

function cloneWithoutMethod(value) {
  if (value == null) {
    return null;
  }

  return JSON.parse(JSON.stringify(value));
}

function isFunction(value) {
  return (0, _lodash().isFunction)(value);
}

function isArray(value) {
  return (0, _lodash().isArray)(value);
}

function isObject(o) {
  return (0, _lodash().isObject)(o);
}

function difference(array, values) {
  return (0, _lodash().difference)(array, values);
}
/**
 * 筛选需要的集合
 * @param {collection} 可筛选的对象，例如数组
 * @param {predicateFunction} 每次迭代调用的筛选函数
 */


function filter(collection, predicateFunction) {
  return (0, _lodash().filter)(collection, predicateFunction);
}
/**
 * 创建一个元素数组。 以 iteratee 处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。 iteratees 调用1个参数： (value)。
 * @param {collection}  (Array|Object), 用来迭代的集合。
 * @param {predicateFunction} 这个函数决定排序
 */


function sortBy(collection, predicateFunction) {
  return (0, _lodash().sortBy)(collection, predicateFunction);
}
/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index），而不是元素本身。
 * @param {array} (Array): 要搜索的数组。
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */


function findIndex(array, predicateFunction, fromIndex = 0) {
  return (0, _lodash().findIndex)(array, predicateFunction, fromIndex);
}
/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index），而不是元素本身,返回匹配元素，否则返回 undefined。。
 * @param {array} (Array): 要搜索的数组。
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */


function find(array, predicateFunction, fromIndex = 0) {
  return (0, _lodash().find)(array, predicateFunction, fromIndex);
}

function checkExist(array, predicateFunction, fromIndex = 0) {
  const result = find(array, predicateFunction, fromIndex);
  return !isUndefined(result);
}

function reverse(array) {
  return (0, _lodash().reverse)(array);
}

function trim(source) {
  return (0, _lodash().trim)(source);
}

function replace(source, pattern, replacement) {
  return (0, _lodash().replace)(source, pattern, replacement);
}

function isBoolean(value) {
  return (0, _lodash().isBoolean)(value);
}

function isUndefined(value) {
  return (0, _lodash().isUndefined)(value);
}

function isNull(value) {
  return (0, _lodash().isNull)(value);
}

function isDate(value) {
  return (0, _lodash().isDate)(value);
}

function isString(value) {
  return (0, _lodash().isString)(value);
}
/**
 * 移除数组中predicate（断言）返回为真值的所有元素，并返回移除元素组成的数组。predicate（断言） 会传入3个参数： (value, index, array)。
 * @param {*} array
 * @param {*} predicate (Array|Function|Object|string): 每次迭代调用的函数
 */


function removeFromArray(array, predicate) {
  return (0, _lodash().remove)(array, predicate);
}

function stringIsNullOrWhiteSpace(value) {
  return trim(replace(value || '', ' ', '')) === '';
}
/**
 * base64解码
 */


function decodeBase64(target) {
  let commonContent = (target || '').replace(/\s/g, '+');
  commonContent = Buffer.from(commonContent, 'base64').toString();
  return commonContent;
}
/**
 * base64编码
 */


function encodeBase64(target) {
  const base64Content = Buffer.from(target).toString('base64');
  return base64Content;
}

function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [(0, _moment().default)(now), (0, _moment().default)(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;
    return [(0, _moment().default)(beginTime), (0, _moment().default)(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = (0, _moment().default)(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();
    return [(0, _moment().default)(`${year}-${fixedZero(month + 1)}-01 00:00:00`), (0, _moment().default)((0, _moment().default)(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)];
  }

  const year = now.getFullYear();
  return [(0, _moment().default)(`${year}-01-01 00:00:00`), (0, _moment().default)(`${year}-12-31 23:59:59`)];
}

function handleCommonDataAssist(state, action, callback = null) {
  const d = action.payload,
        alias = action.alias;
  let v = pretreatmentRemoteSingleData(d);

  if (isFunction(callback)) {
    v = callback(v);
  }

  if (isUndefined(alias)) {
    return _objectSpread(_objectSpread({}, state), {}, {
      data: v
    });
  }

  const aliasData = {};
  aliasData[alias] = v;
  return _objectSpread(_objectSpread({}, state), aliasData);
}

function handleListDataAssist(state, action, pretreatment = null, callback = null) {
  const d = action.payload,
        alias = action.alias;
  let v = pretreatmentRemoteListData(d, pretreatment);

  if (isFunction(callback)) {
    v = callback(v);
  }

  if (isUndefined(alias)) {
    return _objectSpread(_objectSpread({}, state), {}, {
      data: v
    });
  }

  const aliasData = {};
  aliasData[alias] = v;
  return _objectSpread(_objectSpread({}, state), aliasData);
}

function handlePageListDataAssist(state, action, pretreatment = null, callback = null) {
  const d = action.payload,
        alias = action.alias;
  let v = pretreatmentRemotePageListData(d, pretreatment);

  if (isFunction(callback)) {
    v = callback(v);
  }

  if (isUndefined(alias)) {
    return _objectSpread(_objectSpread({}, state), {}, {
      data: v
    });
  }

  const aliasData = {};
  aliasData[alias] = v;
  return _objectSpread(_objectSpread({}, state), aliasData);
}

function FormatMessageWrapper(o) {
  const _useIntl = (0, _umi().useIntl)(),
        formatMessageUseIntl = _useIntl.formatMessage;

  return formatMessageUseIntl(o);
}

function formatMessage(o) {
  return FormatMessageWrapper(o);
}

function checkLocalhost() {
  const hostname = (0, _lodash().toLower)(window.location.hostname);
  return hostname === '127.0.0.1' || hostname === 'localhost';
}

function getNearestLocalhostNotifyCache() {
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

function setNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;
  const now = parseInt(new Date().getTime() / 1000, 10);
  const d = {
    nearestTime: now
  };
  return saveJsonToLocalStorage(key, d);
}

function removeNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;
  removeLocalStorage(key);
}

function trySendNearestLocalhostNotify({
  text
}) {
  let needSend = false;
  let nearestTime = 0;

  if (checkLocalhost()) {
    const nearestLocalhostNotify = getNearestLocalhostNotifyCache() || null;

    if (nearestLocalhostNotify == null) {
      needSend = true;
    } else {
      nearestTime = nearestLocalhostNotify.nearestTime || 0;
    }

    const now = parseInt(new Date().getTime() / 1000, 10);

    try {
      if (nearestTime + 30 < now) {
        needSend = true;
      }

      if (needSend) {
        _notification2().default.open({
          placement: 'bottomLeft',
          message: '开发提示',
          description: `当前接口域名：${text}。`
        });

        setNearestLocalhostNotifyCache();
      }
    } catch (error) {
      recordLog(error);
    }
  }
}

function ellipsis(value, length) {
  if (value && value.length > length) {
    return `${toString(value).substr(0, length)}...`;
  }

  return toString(value);
}

function notifySuccess(text) {
  const description = text || '数据已经操作成功，请进行后续操作。';
  notify({
    type: _constants.notificationTypeCollection.success,
    placement: 'bottomRight',
    message: '操作结果',
    description
  });
}

function notify({
  type,
  placement: placementValue,
  message: messageValue,
  description: descriptionValue
}) {
  const _placement$message$de = _objectSpread(_objectSpread({}, {
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

  requestAnimationFrame(() => {
    switch (type) {
      case _constants.notificationTypeCollection.success:
        _notification2().default.success({
          placement,
          message: messageText,
          description
        });

        break;

      case _constants.notificationTypeCollection.warning:
        _notification2().default.warning({
          placement,
          message: messageText,
          description
        });

        break;

      case _constants.notificationTypeCollection.error:
        _notification2().default.error({
          placement,
          message: messageText,
          description
        });

        break;

      case _constants.notificationTypeCollection.info:
        _notification2().default.info({
          placement,
          message: messageText,
          description
        });

        break;

      case _constants.notificationTypeCollection.warn:
        _notification2().default.warn({
          placement,
          message: messageText,
          description
        });

        break;

      default:
        _notification2().default.open({
          placement,
          message: messageText,
          description
        });

        break;
    }
  });
}

const requestAnimFrameCustom = (() => {
  if ((0, _umi().isBrowser)()) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || (a => {
      window.setTimeout(a, 1e3 / 60);
    });
  }

  return () => {};
})();

const requestAnimFrame = requestAnimFrameCustom; // /**
//  * 无用占位函数
//  *
//  * @export
//  * @returns
//  */
// export default {
//   getStringFromLocalStorage,
// };

exports.requestAnimFrame = requestAnimFrame;