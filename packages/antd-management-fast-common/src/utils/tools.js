import { message, notification } from 'antd';
import { arrayMoveImmutable, arrayMoveMutable } from 'array-move';
import copy from 'copy-to-clipboard';
import {
  difference as differenceLodash,
  endsWith as endsWithLodash,
  filter as filterLodash,
  find as findLodash,
  findIndex as findIndexLodash,
  get as getLodash,
  isEmpty as isEmptyLodash,
  isEqual as isEqualLodash,
  remove as removeLodash,
  reverse as reverseLodash,
  sortBy as sortByLodash,
  sortedUniq as sortedUniqLodash,
  split as splitLodash,
  toLower,
} from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import nzh from 'nzh';
import { parse, stringify } from 'qs';
import queue from 'queue';
import randomColor from 'randomcolor';
import { v4 as uuidv4 } from 'uuid';
import { history, useIntl } from '@umijs/max';

import {
  convertCollection,
  datetimeFormat,
  emptyDatetime,
  formatCollection,
  listViewConfig,
  logLevel,
  messageTypeCollection,
  notificationTypeCollection,
  sortOperate,
} from '../utils/constants';

import {
  decodeBase64 as decodeBase64Core,
  encodeBase64 as encodeBase64Core,
  getAppInitConfigData,
  inCollection as inCollectionCore,
  isBrowser,
  lowerFirst as lowerFirstCore,
  replace as replaceCore,
  stringIsNullOrWhiteSpace as stringIsNullOrWhiteSpaceCore,
  trim as trimCore,
  upperFirst as upperFirstCore,
} from './core';
import {
  getNearestLocalhostNotifyCache,
  setNearestLocalhostNotifyCache,
} from './developAssist';
import {
  recordConfig as recordConfigCore,
  recordDebug as recordDebugCore,
  recordError as recordErrorCore,
  recordExecute as recordExecuteCore,
  recordInfo as recordInfoCore,
  recordLog as recordLogCore,
  recordObject as recordObjectCore,
  recordText as recordTextCore,
  recordTrace as recordTraceCore,
  recordWarn as recordWarnCore,
} from './log';
import {
  isArray as isArrayCore,
  isBoolean as isBooleanCore,
  isFunction as isFunctionCore,
  isNull as isNullCore,
  isNumber as isNumberCore,
  isObject as isObjectCore,
  isString as isStringCore,
  isUndefined as isUndefinedCore,
} from './typeCheck';
import {
  toNumber as toNumberCore,
  toString as toStringCore,
} from './typeConvert';

export function defaultBaseState() {
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
    externalData: null,
  };
}

export function defaultCoreState() {
  const data = { ...defaultBaseState(), ...{ dataLoading: true } };

  return data;
}

export function defaultCommonState() {
  const data = {
    ...defaultCoreState(),
    ...{
      loadApiPath: '',
      pageName: '',
      metaData: null,
      metaExtra: null,
      metaListData: [],
      metaOriginalData: null,
    },
  };

  return data;
}

export function defaultListState() {
  const data = {
    ...defaultCommonState(),
    ...{
      dateRangeFieldName: '发生时间',
      tableScroll: { x: 1520 },
      formValues: {},
      pageNo: 1,
      pageSize: 10,
      startTimeAlias: '',
      endTimeAlias: '',
      startTime: '',
      endTime: '',
      listViewMode: listViewConfig.viewMode.table,
      showSelect: false,
      selectedDataTableDataRows: [],
    },
  };

  return data;
}

export function defaultPageListState() {
  const data = {
    ...defaultCommonState(),
    ...{
      paramsKey: '',
      loadApiPath: '',
      dateRangeFieldName: '发生时间',
      tableScroll: { x: 1520 },
      formValues: {},
      pageNo: 1,
      pageSize: 10,
      startTime: '',
      endTime: '',
      listViewMode: listViewConfig.viewMode.table,
      showSelect: false,
      selectedDataTableDataRows: [],
    },
  };

  return data;
}

export function defaultFormState() {
  const data = {
    ...defaultCommonState(),
    ...{ errorFieldName: '', submitApiPath: '' },
  };

  return data;
}

export function getValue(obj) {
  return Object.keys(obj)
    .map((key) => obj[key])
    .join(',');
}

/**
 * 复制到剪贴板
 * @param {*} text
 * @param {*} showText
 */
export function copyToClipboard(text, showCopyText = true, otherShowText = '') {
  copy(text);

  if (showCopyText) {
    showSuccessMessage({
      message: `已经将 ${text} 复制到剪贴板！`,
    });
  } else if (stringIsNullOrWhiteSpace(otherShowText)) {
    showSuccessMessage({
      message: '已经复制到剪贴板！',
    });
  } else {
    showSuccessMessage({
      message: `已经将${otherShowText}复制到剪贴板！`,
    });
  }
}

/**
 * 复制到剪贴板
 * @param {*} text
 */
export function stringIsEmpty(text) {
  return isEmptyLodash(toString(text || '').replace(' ', ''));
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
export function replaceTargetText(
  text,
  replaceText,
  beforeKeepNumber,
  afterKeepNumber,
) {
  let result = toString(text);

  const textLength = (text || '').length;
  if (textLength > 0 && (beforeKeepNumber >= 0 || afterKeepNumber >= 0)) {
    if (
      beforeKeepNumber >= textLength ||
      afterKeepNumber >= textLength ||
      (beforeKeepNumber || 0) + (afterKeepNumber || 0) >= textLength
    ) {
      result = text;
    } else {
      const beforeKeep = text.substr(0, beforeKeepNumber);

      const afterKeep = text.substr(
        textLength - afterKeepNumber,
        afterKeepNumber,
      );

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

export function checkDevelopment() {
  return process.env.NODE_ENV === 'development';
}

/**
 * corsTarget
 * 跨域域名配置
 * @export
 * @param {*} v
 * @returns
 */
export function corsTarget() {
  const appInit = getAppInitConfigData();
  let corsTargetDomain = '';

  if (appInit.apiPrefix != null) {
    if (appInit.apiPrefix.corsTargetDomain != null) {
      const {
        apiPrefix: { corsTargetDomain: corsTargetDomainRemote },
      } = appInit;

      corsTargetDomain = corsTargetDomainRemote;
    }
  }

  return corsTargetDomain;
}

export function goToPath(path) {
  history.push(path);
}

export function redirectToPath(path) {
  history.replace(path);
}

export function showError(text) {
  showErrorMessage({
    message: text,
  });
}

export function showRuntimeError({ message: messageText, showStack = true }) {
  try {
    if (!stringIsNullOrWhiteSpace(messageText || '')) {
      showErrorMessage({
        message: messageText,
      });
    }

    if (showStack) {
      throw new Error(
        `${
          stringIsNullOrWhiteSpace(messageText || '')
            ? ''
            : `${toString(messageText)},`
        }调用堆栈:`,
      );
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.stack);
  }
}

export function showSuccessMessage({
  duration = 3,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.success,
    message: messageText,
    duration,
    onClose,
  });
}

export function showErrorMessage({
  duration = 3,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.error,
    message: messageText,
    duration,
    onClose,
  });
}

export function showWarnMessage({
  duration = 3,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.warn,
    message: messageText,
    duration,
    onClose,
  });
}

/**
 * 显示警告信息框
 */
export function showWarningMessage({
  duration = 3,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.warning,
    message: messageText,
    duration,
    onClose,
  });
}

/**
 * 显示消息信息
 */
export function showInfoMessage({
  duration = 3,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.info,
    message: messageText,
    duration,
    onClose,
  });
}

export function showLoadingMessage({
  duration = 3,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.loading,
    message: messageText,
    duration,
    onClose,
  });
}

export function showOpenMessage({
  duration = 3,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.open,
    message: messageText,
    duration,
    onClose,
  });
}

export function showMessage({
  type,
  duration = 3,
  message: messageText,
  onClose = () => {},
}) {
  requestAnimationFrame(() => {
    switch (type) {
      case messageTypeCollection.success:
        message.success(messageText, duration, onClose);

        break;

      case messageTypeCollection.error:
        message.error(messageText, duration, onClose);

        break;

      case messageTypeCollection.info:
        message.info(messageText, duration, onClose);

        break;

      case messageTypeCollection.warning:
        message.warning(messageText, duration, onClose);

        break;

      case messageTypeCollection.warn:
        message.warning(messageText, duration, onClose);

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
export function getGuid() {
  return uuidv4();
}

/**
 * 检测目标是否在数组址之中
 */
export function inCollection(collection, value) {
  return inCollectionCore(collection, value);
}

/**
 * 格式化时间
 *
 * @export
 * @param {*} v
 * @returns
 */
export function isInvalid(v) {
  return typeof v === 'undefined';
}

export function toDatetime(v) {
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
export function formatDatetime({
  data,
  format = datetimeFormat.yearMonthDayHourMinuteSecond,
  defaultValue = '',
  timeZone = 8,
}) {
  if ((data || '') === '') {
    return defaultValue;
  }

  const m = moment(
    typeof data === 'object' ? data : new Date(data.replace('/', '-')),
  ).utcOffset(timeZone);

  if (m.isSame(emptyDatetime)) {
    return defaultValue;
  }

  return m.format(format);
}

/**
 * 格式化数字
 */
export function numeralFormat(v, formatString) {
  return numeral(v).format(formatString);
}

/**
 * 当前Moment时间
 *
 * @export
 * @param {*} v
 * @returns
 */
export function getMomentNow(timeZone = 8) {
  return moment().utcOffset(timeZone);
}

/**
 * 转化为Moment时间
 *
 * @export
 * @param {*} v
 * @returns
 */
export function toMoment({ data, timeZone = 8 }) {
  if (isString(data)) {
    return stringToMoment({ data, timeZone });
  }

  if (isDate(data)) {
    return dateToMoment({ data, timeZone });
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
export function stringToMoment({ data, timeZone = 8 }) {
  if (moment.isMoment(data)) return data;

  const d = (data || '').toString();

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
export function dateToMoment({ data, timeZone = 8 }) {
  const m = moment(data).utcOffset(timeZone);

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
export function isDatetime(v) {
  const date = `${typeof v === 'undefined' ? null : v}`;
  const result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);

  if (result == null) {
    return false;
  }

  const d = new Date(result[1], result[3] - 1, result[4]);
  return (
    d.getFullYear() === parseInt(result[1], 10) &&
    d.getMonth() + 1 === parseInt(result[3], 10) &&
    d.getDate() === parseInt(result[4], 10)
  );
}

export function isNull(v) {
  return isNullCore(v);
}

/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isNumber(v) {
  return isNumberCore(v);
}

/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */
export function toNumber(v) {
  return toNumberCore(v);
}

/**
 * 转换为数字
 *
 * @export
 * @param {*} str
 * @returns
 */
export function split(source, separator, limit = 1000) {
  return splitLodash(source, separator, limit);
}

/**
 * 转换为文本
 *
 * @export
 * @param {*} str
 * @returns
 */
export function toString(value) {
  return toStringCore(value);
}

/**
 * 去除重复数据并排序（升序）
 */
export function sortedUnique(array) {
  return sortedUniqLodash(array);
}

/**
 *
 *@param  val 值 len保留小数位数
 *
 */
export function roundToTarget(v, len) {
  if (!isMoney(v)) {
    return 0;
  }

  const temp = 10 ** len;

  return Math.round(toMoney(v) * temp) / temp;
}

/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isMoney(v) {
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
export function toMoney(v) {
  if (isMoney(v)) {
    return parseFloat(v, 10);
  }

  return 0;
}

/**
 * 通过 key 获取对应得值
 */
export function getValueByKey({
  data,
  key,
  defaultValue = null,
  convert = null,
  convertBuilder = null,
  format = null,
  formatBuilder = null,
}) {
  const v = getPathValue(data, key, defaultValue);

  let result = v;

  if ((convertBuilder || null) != null || (convert || null) != null) {
    if (isFunction(convertBuilder)) {
      result = convertTarget({
        target: v,
        convert: convertBuilder,
      });
    } else {
      result = convertTarget({
        target: v,
        convert,
      });
    }
  }

  if ((formatBuilder || null) != null || (format || null) != null) {
    if (isFunction(formatBuilder)) {
      result = formatTarget({
        target: result,
        format: formatBuilder,
      });
    } else {
      result = formatTarget({
        target: result,
        format,
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
export function convertTarget({ target, convert }) {
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
        return toMoment({ data: toString(target) });

      case convertCollection.money:
        return toMoney(target);

      case convertCollection.array:
        return (target || null) == null
          ? []
          : isArray(target)
          ? target
          : [target];

      default:
        return target;
    }
  }

  return target;
}

export function formatTarget({ target, format, option = {} }) {
  if (isFunction(format)) {
    return format(target);
  }

  if (isString(format)) {
    switch (format) {
      case formatCollection.money:
        return formatMoney(target);

      case formatCollection.datetime:
        return formatDatetime({
          data: target,
        });

      case formatCollection.chineseMoney:
        return formatMoneyToChinese({ target, option });

      case formatCollection.percentage:
        return `${roundToTarget(target * 100, 1)}%`;

      default:
        return target;
    }
  }

  return target;
}

/**
 * 通过 path 获取对应得值
 */
export function getPathValue(o, path, defaultValue = null) {
  if (isUndefined(o)) {
    return null || defaultValue;
  }

  if (o == null) {
    return null || defaultValue;
  }

  if (!isString(path)) {
    recordError({
      path,
    });

    const text = 'getPathValue Function param path must be string';

    showRuntimeError({
      message: text,
    });

    return null;
  }

  const v = getLodash(o, path, defaultValue);

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
export function calculateTimeInterval(startTime, endTime) {
  const timeBegin = startTime.getTime();
  const timeEnd = endTime.getTime();
  const total = (timeEnd - timeBegin) / 1000;

  const day = parseInt(total / (24 * 60 * 60)); //计算整数天数
  const afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
  const hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
  const afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
  const min = parseInt(afterHour / 60); //计算整数分
  const afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数

  return {
    day,
    hour: hour,
    minute: min,
    second: afterMin,
  };
}

export function addHour(datetime, value) {
  const t = toDatetime(datetime);

  return t.setHours(t.getHours() + value);
}

export function addMinute(datetime, value) {
  const t = toDatetime(datetime);

  return t.setMinutes(t.getMinutes() + value);
}

export function addSecond(datetime, value) {
  const t = toDatetime(datetime);

  return t.setSeconds(t.getSeconds() + value);
}

export function getNow() {
  return new Date();
}

/**
 * 格式化货币
 *
 * @export
 * @param {*} str
 * @returns
 */
export function formatDecimal(
  numberSource,
  placesSource = 2,
  thousandSource = ',',
  decimalSource = '.',
) {
  return formatMoney(
    numberSource,
    placesSource,
    '',
    thousandSource,
    decimalSource,
  );
}

/**
 * 格式化货币
 *
 * @export
 * @param {*} str
 * @returns
 */
export function formatMoney(
  numberSource,
  symbolSource = '￥',
  format = '0,0.00',
) {
  return `${symbolSource}${numeral(numberSource).format(format)}`;
}

export function toPercentage(val, format = '0,0.00') {
  return `${numeral(toNumber(numeral(val).value() * 1000) / 10).format(
    format,
  )}%`;
}

/**
 * 检查字符串string是否以给定的target字符串结尾
 */
export function endsWith(source, target, position) {
  return endsWithLodash(source, target, position);
}

/**
 * 如果字符串末尾匹配目标字符串，则从源字符串末尾移除匹配项
 */
export function removeEndMatch(source, target) {
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

  const lastIndex = source.lastIndexOf(target);

  if (lastIndex >= 0 && source.length === lastIndex + target.length) {
    return source.substr(lastIndex, target.length);
  }

  return source;
}

/**
 * 从源字符串移除最后一个匹配项
 */
export function removeLastMatch(source, target) {
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

  const lastIndex = source.lastIndexOf(target);

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
export function formatMoneyToChinese({ target, option = {} }) {
  const o = {
    ...{
      mode: 'cn',
      complete: false,
      outSymbol: true,
    },
    ...(option || {}),
  };

  const { mode } = o;

  let nzhLocal = nzh.cn;

  switch (mode) {
    case 'hk':
      nzhLocal = nzh.hk;
      break;

    default:
      break;
  }

  return nzhLocal.toMoney(target, o);
}

export function seededRandom({ seed, min, max }) {
  const maxValue = max || 1;
  const minValue = min || 0;
  const seedValue = (seed * 9301 + 49297) % 233280;
  const rnd = seedValue / 233280.0;

  return minValue + rnd * (maxValue - minValue);
}

/**
 * 通过种子等配置返回随机颜色值
 *
 * @export
 * @param {*} seed
 * @returns
 */
export function getRandomColor({
  seed,
  hue = null,
  luminosity = null,
  count = null,
  format = null,
  alpha = null,
}) {
  return randomColor({
    seed,
    hue,
    luminosity,
    count,
    format,
    alpha,
  });
}

function getBrowserInfoCore() {
  const getBrowserVersion = () => {
    const u = navigator.userAgent;
    return {
      // 移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android 终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, // 是否为 iPhone 或者 QQHD 浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
    };
  };

  return {
    versions: getBrowserVersion(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  };
}

/**
 * 获取浏览器信息
 *
 * @export
 * @returns
 */
export function getBrowserInfo() {
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
export function refitFieldDecoratorOption(
  v,
  justice,
  defaultValue,
  originalOption,
  convertCallback,
) {
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
export function refitCommonData(listData, empty, otherListData) {
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
export function evil(fn) {
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
export function searchFromList(itemKey, itemValue, sourceData) {
  const d = sourceData || [];
  let result = null;

  if (itemValue == null) {
    return result;
  }

  d.forEach((o) => {
    if (o[itemKey] === itemValue) {
      result = o;
    }
  });

  return result;
}

/**
 * 转换列表数据
 */
export function transformListData({
  list = [],
  convert = null,
  recursiveKey = 'children',
}) {
  const listData = isArray(list) ? list : [list];

  const l = listData.map((one) => {
    return transformData({ data: one, convert, target: recursiveKey });
  });

  return l;
}

/**
 * 转换数据
 */
export function transformData({
  data,
  convert = null,
  recursiveKey = 'children',
}) {
  if (!isFunction(convert)) {
    return data;
  }

  const d = convert(data);

  const children = data[recursiveKey];

  let listData = [];

  if (isArray(children)) {
    listData = children.map((one) => {
      return transformData({ data: one, convert, target: recursiveKey });
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
export function buildFieldDescription(v, op, other) {
  const o = (other || '') === '' ? '' : `,${other}`;
  return `请${op || '输入'}${v}${o}`;
}

/**
 * 清空SessionStorage数据
 * @export
 * @param {*} key
 */
export function clearSessionStorage() {
  const storage = window.sessionStorage;
  storage.clear();
}

/**
 * 获取工作队列
 * @export
 */
export function getQueue() {
  if (typeof window.queue === 'undefined') {
    window.queueCustom = queue({ concurrency: 3 });
    window.queueCustom.start();
  }

  return window.queueCustom;
}

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state，
 * @export
 */
export function getDerivedStateFromPropsForUrlParamsCore(nextProps) {
  const { match } = nextProps;

  if ((match || null) != null) {
    const { params } = match;

    if ((params || null) != null) {
      return { urlParams: params };
    }
  }

  return null;
}

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,如果值重复，则返回null，
 * @export
 */
export function getDerivedStateFromPropsForUrlParams(
  nextProps,
  prevState,
  defaultUrlParams = { id: '' },
  parseUrlParamsForSetState = null,
) {
  let stateUrlParams = getDerivedStateFromPropsForUrlParamsCore(
    nextProps,
    prevState,
  );

  stateUrlParams = stateUrlParams || { urlParams: defaultUrlParams };

  const { urlParams: urlParamsPrev } = prevState;

  const { urlParams } = stateUrlParams;

  if (
    isEqualBySerialize(
      { ...(urlParamsPrev || {}), ...{} },
      { ...(urlParams || {}), ...{} },
    )
  ) {
    return prevState;
  }

  if (isFunction(parseUrlParamsForSetState)) {
    const data = parseUrlParamsForSetState(stateUrlParams);

    return { ...prevState, ...stateUrlParams, ...data };
  }

  return { ...prevState, ...stateUrlParams };
}

export function arrayMove(array, from, to) {
  return arrayMoveImmutable(array, from, to);
}

export function arrayMoveMutate(array, from, to) {
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
export function isEqual(value, other) {
  return isEqualLodash(value, other);
}

export function isEqualBySerialize(value, other) {
  const d1 = JSON.stringify(value || {});
  const d2 = JSON.stringify(other || {});

  return d1 === d2;
}

export function cloneWithoutMethod(value) {
  if (value == null) {
    return null;
  }

  return JSON.parse(JSON.stringify(value));
}

export function isFunction(value) {
  return isFunctionCore(value);
}

export function isArray(value) {
  return isArrayCore(value);
}

export function isObject(o) {
  return isObjectCore(o);
}

export function isBoolean(o) {
  return isBooleanCore(o);
}

export function difference(array, values) {
  return differenceLodash(array, values);
}

/**
 * 筛选需要的集合
 * @param {collection} 可筛选的对象，例如数组
 * @param {predicateFunction} 每次迭代调用的筛选函数
 */
export function filter(collection, predicateFunction) {
  return filterLodash(collection, predicateFunction);
}

/**
 * 创建一个元素数组。 以 iteratee 处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。 iteratees 调用1个参数： (value)。
 * @param {collection}  (Array|Object), 用来迭代的集合。
 * @param {predicateFunction} 这个函数决定排序
 */
export function sortBy(collection, predicateFunction) {
  return sortByLodash(collection, predicateFunction);
}

/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index），而不是元素本身。
 * @param {array} (Array): 要搜索的数组。
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */
export function findIndex(array, predicateFunction, fromIndex = 0) {
  return findIndexLodash(array, predicateFunction, fromIndex);
}

/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index），而不是元素本身,返回匹配元素，否则返回 undefined。。
 * @param {array} (Array): 要搜索的数组。
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */
export function find(array, predicateFunction, fromIndex = 0) {
  return findLodash(array, predicateFunction, fromIndex);
}

export function checkExist(array, predicateFunction, fromIndex = 0) {
  const result = find(array, predicateFunction, fromIndex);

  return !isUndefined(result);
}

export function reverse(array) {
  return reverseLodash(array);
}

export function trim(source) {
  return trimCore(source);
}

export function isUndefined(source) {
  return isUndefinedCore(source);
}

export function replace(source, pattern, replacement) {
  return replaceCore(source, pattern, replacement);
}

/**
 * check value is string
 */
export function isString(value) {
  return isStringCore(value);
}

export function upperFirst(value) {
  return upperFirstCore(value);
}

export function lowerFirst(value) {
  return lowerFirstCore(value);
}

/**
 * 移除数组中predicate（断言）返回为真值的所有元素，并返回移除元素组成的数组。predicate（断言） 会传入3个参数： (value, index, array)。
 * @param {*} array
 * @param {*} predicate (Array|Function|Object|string): 每次迭代调用的函数
 */
export function removeFromArray(array, predicate) {
  return removeLodash(array, predicate);
}

export function stringIsNullOrWhiteSpace(value) {
  return stringIsNullOrWhiteSpaceCore(value);
}

/**
 * base64解码
 */
export function decodeBase64(target) {
  return decodeBase64Core(target);
}

/**
 * base64编码
 */
export function encodeBase64(target) {
  return encodeBase64Core(target);
}

/**
 * 补零
 * @param {*} val
 * @returns
 */
export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

/**
 * getTimeDistance
 */
export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [
      moment(now).utcOffset(8),
      moment(now.getTime() + (oneDay - 1000)).utcOffset(8),
    ];
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

    return [
      moment(beginTime).utcOffset(8),
      moment(beginTime + (7 * oneDay - 1000)).utcOffset(8),
    ];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`).utcOffset(8),
      moment(
        moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`)
          .utcOffset(8)
          .valueOf() - 1000,
      ).utcOffset(8),
    ];
  }

  const year = now.getFullYear();
  return [
    moment(`${year}-01-01 00:00:00`).utcOffset(8),
    moment(`${year}-12-31 23:59:59`).utcOffset(8),
  ];
}

/**
 * 构建描述文本
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */
export function buildFieldHelper(v, prefix = '注：') {
  return `${prefix}${v}。`;
}

export function checkLocalhost() {
  const hostname = toLower(window.location.hostname);

  return hostname === '127.0.0.1' || hostname === 'localhost';
}

/**
 * 尝试发送最近一次本地调用通知（一般用于开发阶段，提示调用的接口域）
 */
export function trySendNearestLocalhostNotify({ text }) {
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
        notification.open({
          placement: 'bottomLeft',
          message: '开发提示',
          description: `当前接口域名：${text}。`,
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
export function ellipsis(value, length, symbol = '...') {
  if (value && value.length > length) {
    return `${toString(value).substr(0, length)}${symbol}`;
  }

  return toString(value);
}

export function notifySuccess(text) {
  const description = text || '数据已经操作成功，请进行后续操作。';

  notify({
    type: notificationTypeCollection.success,
    placement: 'bottomRight',
    message: '操作结果',
    description,
  });
}

export function notifyInfo(text) {
  const description = text || '';

  if (stringIsNullOrWhiteSpace(description)) {
    return;
  }

  notify({
    type: notificationTypeCollection.info,
    placement: 'bottomRight',
    message: '操作结果',
    description,
  });
}

export function notifyWarn(text) {
  const description = text || '';

  if (stringIsNullOrWhiteSpace(description)) {
    return;
  }

  notify({
    type: notificationTypeCollection.warn,
    placement: 'bottomRight',
    message: '警告信息',
    description,
  });
}

export function notifyError(text) {
  const description = text || '';

  if (stringIsNullOrWhiteSpace(description)) {
    return;
  }

  notify({
    type: notificationTypeCollection.error,
    placement: 'bottomRight',
    message: '错误信息',
    description,
  });
}

/**
 * 发送页面通知
 */
export function notify({
  type,
  placement: placementValue,
  message: messageValue,
  description: descriptionValue,
}) {
  const {
    placement,
    message: messageText,
    description,
  } = {
    ...{
      placement: 'bottomRight',
      message: '操作结果',
      description: '操作结果描述',
    },
    ...{
      placement: placementValue,
      message: messageValue,
      description: descriptionValue,
    },
  };

  setTimeout(() => {
    switch (type) {
      case notificationTypeCollection.success:
        notification.success({
          placement,
          message: messageText,
          description,
        });

        break;

      case notificationTypeCollection.warning:
        notification.warning({
          placement,
          message: messageText,
          description,
        });

        break;

      case notificationTypeCollection.error:
        notification.error({
          placement,
          message: messageText,
          description,
        });

        break;

      case notificationTypeCollection.info:
        notification.info({
          placement,
          message: messageText,
          description,
        });

        break;

      case notificationTypeCollection.warn:
        notification.warn({
          placement,
          message: messageText,
          description,
        });

        break;

      default:
        notification.open({
          placement,
          message: messageText,
          description,
        });

        break;
    }
  }, 600);
}

export function recordLog(record, showMode, level = logLevel.debug) {
  recordLogCore(record, showMode, level);
}

export function recordTrace(record) {
  recordTraceCore(record);
}

export function recordWarn(record) {
  recordWarnCore(record);
}

export function recordInfo(record) {
  recordInfoCore(record);
}

export function recordConfig(record) {
  recordConfigCore(record);
}

export function recordDebug(record) {
  recordDebugCore(record);
}

export function recordExecute(record) {
  recordExecuteCore(record);
}

export function recordError(record) {
  recordErrorCore(record);
}

export function recordText(record, level = logLevel.debug) {
  recordTextCore(record, level);
}

export function recordObject(record, level = logLevel.debug) {
  recordObjectCore(record, level);
}

export function checkFromConfig({ label, name, helper }) {
  let labelText = 'object';
  let nameText = 'object';
  let helperText = 'object';

  if (isObject(label)) {
    const text = 'label必须为文本';

    showRuntimeError({
      message: text,
    });

    recordObject(label);
  } else {
    labelText = label;
  }

  if (isObject(name)) {
    const text = 'name必须为文本';

    showRuntimeError({
      message: text,
    });

    recordObject(name);
  } else {
    nameText = name;
  }

  if (isObject(helper)) {
    const text = 'helper必须为文本';

    showRuntimeError({
      message: text,
    });

    recordObject(helper);
  } else {
    helperText = helper;
  }

  return {
    label: labelText,
    name: nameText,
    helper: helperText,
  };
}

const requestAnimFrameCustom = (() => {
  if (isBrowser()) {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      ((a) => {
        window.setTimeout(a, 1e3 / 60);
      })
    );
  }

  return () => {};
})();

export const requestAnimFrame = requestAnimFrameCustom;

/**
 * 依照某个键的值进行排序，请确保键的值为数字型
 */
export function sortCollectionByKey({
  operate,
  item,
  list,
  sortKey,
  sortMin = 0,
}) {
  if ((item || null) == null) {
    return list;
  }

  const beforeList = [];
  const afterList = [];
  let result = [];

  if ((list || []).length <= 1) {
    const text = '无需排序!';

    showWarnMessage({
      message: text,
    });

    return list;
  }

  const itemSort = getValueByKey({
    data: item,
    key: sortKey,
    convert: convertCollection.number,
  });

  (list || []).forEach((o) => {
    const sort = getValueByKey({
      data: o,
      key: sortKey,
      convert: convertCollection.number,
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
        const text = '已经排在首位!';

        showWarnMessage({
          message: text,
        });

        return list;
      }

      (beforeList || []).forEach((o, index) => {
        if (index < beforeList.length - 1) {
          result.push(o);
        } else {
          const o1 = item;
          o1[sortKey] -= 1;

          result.push(o1);

          const o2 = o;
          o2[sortKey] += 1;

          result.push(o2);
        }
      });

      result = result.concat(afterList);

      break;

    case sortOperate.moveDown:
      if (itemSort === (list || []).length + sortMin - 1) {
        const text = '已经排在末位!';

        showWarnMessage({
          message: text,
        });

        return list;
      }

      result = result.concat(beforeList);

      (afterList || []).forEach((o, index) => {
        if (index === 0) {
          const o2 = o;
          o2[sortKey] -= 1;

          result.push(o2);

          const o1 = item;
          o1[sortKey] += 1;

          result.push(o1);
        } else {
          result.push(o);
        }
      });

      break;

    default: {
      const text = `不符合的操作，允许的操作为['${sortOperate.moveUp}','${sortOperate.moveDown}']!`;

      showWarnMessage({
        message: text,
      });

      break;
    }
  }

  return result;
}

export function queryStringify(data) {
  return stringify(data);
}

export function queryStringParse(data) {
  return parse(data);
}

/**
 * 语言渲染封装器
 * @param {*} o 语言配置
 * @returns
 */
function FormatMessageWrapper(o) {
  const { formatMessage: formatMessageUseIntl } = useIntl();

  return formatMessageUseIntl(o);
}

/**
 * 语言渲染封装器
 * @param {*} o 语言配置
 * @returns
 */
export function formatMessage(o) {
  return FormatMessageWrapper(o);
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
