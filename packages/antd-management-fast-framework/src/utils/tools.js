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
  isBoolean as isBooleanLodash,
  isDate as isDateLodash,
  isEmpty as isEmptyLodash,
  isEqual as isEqualLodash,
  isNull as isNullLodash,
  isObject as isObjectLodash,
  isUndefined as isUndefinedLodash,
  remove as removeLodash,
  reverse as reverseLodash,
  sortBy as sortByLodash,
  sortedUniq as sortedUniqLodash,
  split as splitLodash,
  toLower,
  toNumber as toNumberLodash,
  toString as toStringLodash,
} from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import nzh from 'nzh';
import { parse, stringify } from 'qs';
import queue from 'queue';
import randomColor from 'randomcolor';
import { history } from 'umi';
import { v4 as uuidv4 } from 'uuid';

import { getAppInitConfigData } from './appConfiguration';
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
} from './constants';
import {
  decodeBase64 as decodeBase64Core,
  encodeBase64 as encodeBase64Core,
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
  recordDebug as recordDebugCore,
  recordError as recordErrorCore,
  recordInfo as recordInfoCore,
  recordLog as recordLogCore,
  recordObject as recordObjectCore,
  recordText as recordTextCore,
  recordWarn as recordWarnCore,
  setNearestLocalhostNotifyCache,
} from './developAssist';
import {
  isArray as isArrayCore,
  isFunction as isFunctionCore,
  isNumber as isNumberCore,
  isString as isStringCore,
} from './typeCheck';

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
      dateRangeFieldName: '????????????',
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
      dateRangeFieldName: '????????????',
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
 * ??????????????????
 * @param {*} text
 * @param {*} showText
 */
export function copyToClipboard(text, showCopyText = true, otherShowText = '') {
  copy(text);

  if (showCopyText) {
    message.success(`????????? ${text} ?????????????????????`);
  } else if (stringIsNullOrWhiteSpace(otherShowText)) {
    message.success('???????????????????????????');
  } else {
    message.success(`?????????${otherShowText}?????????????????????`);
  }
}

/**
 * ??????????????????
 * @param {*} text
 */
export function stringIsEmpty(text) {
  return isEmptyLodash(toString(text || '').replace(' ', ''));
}

/**
 *?????????????????????
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
 * ??????????????????
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
        }????????????:`,
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
 * ?????????????????????
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
 * ??????????????????
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
 * ??????Guid
 *
 * @export
 * @param {*} v
 * @returns
 */
export function getGuid() {
  return uuidv4();
}

/**
 * ????????????????????????????????????
 */
export function inCollection(collection, value) {
  return inCollectionCore(collection, value);
}

/**
 * ???????????????
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
 * ???????????????
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
 * ???????????????
 */
export function numeralFormat(v, formatString) {
  return numeral(v).format(formatString);
}

/**
 * ??????Moment??????
 *
 * @export
 * @param {*} v
 * @returns
 */
export function getMomentNow(timeZone = 8) {
  return moment().utcOffset(timeZone);
}

/**
 * ?????????Moment??????
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
 * ?????????Moment??????
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
 * ?????????Moment??????
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
 * ??????????????????????????????
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

/**
 * ??????????????????????????????
 *
 * @export
 * @param {*} str
 * @returns
 */
export function isNumber(v) {
  return isNumberCore(v);
}

/**
 * ???????????????
 *
 * @export
 * @param {*} str
 * @returns
 */
export function toNumber(v) {
  const value = toNumberLodash(v);

  return Number.isNaN(value) ? 0 : value;
}

/**
 * ???????????????
 *
 * @export
 * @param {*} str
 * @returns
 */
export function split(source, separator, limit = 1000) {
  return splitLodash(source, separator, limit);
}

/**
 * ???????????????
 *
 * @export
 * @param {*} str
 * @returns
 */
export function toString(value) {
  return toStringLodash(value);
}

/**
 * ???????????????????????????????????????
 */
export function sortedUnique(array) {
  return sortedUniqLodash(array);
}

/**
 *
 *@param  val ??? len??????????????????
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
 * ??????????????????????????????
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
 * ???????????????
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
 * ?????? key ??????????????????
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
 * ?????? path ??????????????????
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
 *??????????????????
 * @param {startTime} ????????????
 * @param {endTime} ????????????
 */
export function calculateTimeInterval(startTime, endTime) {
  const timeBegin = startTime.getTime();
  const timeEnd = endTime.getTime();
  const total = (timeEnd - timeBegin) / 1000;

  const day = parseInt(total / (24 * 60 * 60)); //??????????????????
  const afterDay = total - day * 24 * 60 * 60; //????????????????????????????????????
  const hour = parseInt(afterDay / (60 * 60)); //?????????????????????
  const afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //???????????????????????????????????????
  const min = parseInt(afterHour / 60); //???????????????
  const afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //?????????????????????????????????

  return {
    day,
    hour: hour,
    minute: min,
    second: afterMin,
  };
}

/**
 * ???????????????
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
 * ???????????????
 *
 * @export
 * @param {*} str
 * @returns
 */
export function formatMoney(
  numberSource,
  symbolSource = '???',
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
 * ???????????????string??????????????????target???????????????
 */
export function endsWith(source, target, position) {
  return endsWithLodash(source, target, position);
}

/**
 * ????????????????????????????????????????????????????????????????????????????????????
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
 * ??????????????????????????????????????????
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
 * ??????????????????????????????
 *
 * @export
 * @param {*} target ???????????????
 * @param {*} option ????????????, ??????Nzh???
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
 * ??????????????????????????????????????????
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
      // ?????????????????????????????????
      trident: u.indexOf('Trident') > -1, // IE??????
      presto: u.indexOf('Presto') > -1, // opera??????
      webKit: u.indexOf('AppleWebKit') > -1, // ?????????????????????
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // ????????????
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // ?????????????????????
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios??????
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android ?????????uc?????????
      iPhone: u.indexOf('iPhone') > -1, // ????????? iPhone ?????? QQHD ?????????
      iPad: u.indexOf('iPad') > -1, // ??????iPad
      webApp: u.indexOf('Safari') === -1, // ??????web????????????????????????????????????
    };
  };

  return {
    versions: getBrowserVersion(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  };
}

/**
 * ?????????????????????
 *
 * @export
 * @returns
 */
export function getBrowserInfo() {
  return getBrowserInfoCore();
}

/**
 * ?????????????????????
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
 * ??????????????????
 *
 * @export ????????????
 * @param {*} listData ???????????????
 * @param {*} empty ????????????????????????
 * @param {*} otherListData ??????????????????????????????
 * @returns ????????????????????????
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
 * ?????????????????????
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function evil(fn) {
  // ??????????????????Function???????????????????????????????????????
  const Fn = Function;
  return new Fn(`return ${fn}`)();
}

/**
 * ???????????????????????????
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
 * ??????????????????
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
 * ????????????
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
 * ??????????????????
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */
export function buildFieldDescription(v, op, other) {
  const o = (other || '') === '' ? '' : `,${other}`;
  return `???${op || '??????'}${v}${o}`;
}

/**
 * ??????SessionStorage??????
 * @export
 * @param {*} key
 */
export function clearSessionStorage() {
  const storage = window.sessionStorage;
  storage.clear();
}

/**
 * ??????????????????
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
 * Reacts????????????getDerivedStateFromProps ?????????????????????url???????????????????????????????????????state???
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
 * Reacts????????????getDerivedStateFromProps ?????????????????????url???????????????????????????????????????state,???????????????????????????null???
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
 * ??????????????????
 * @export
 * @param {value} ?????????
 * @param {other} ????????????
 * ???????????????????????????????????????????????????
 * ???????????????????????? arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols, ?????? typed arrays. Object ??????????????????????????????????????????????????????????????????????????? ??????????????????DOM???????????????
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
  return isObjectLodash(o);
}

export function difference(array, values) {
  return differenceLodash(array, values);
}

/**
 * ?????????????????????
 * @param {collection} ?????????????????????????????????
 * @param {predicateFunction} ?????????????????????????????????
 */
export function filter(collection, predicateFunction) {
  return filterLodash(collection, predicateFunction);
}

/**
 * ??????????????????????????? ??? iteratee ?????????????????????????????? ????????????????????????????????????????????????????????????????????????????????? iteratees ??????1???????????? (value)???
 * @param {collection}  (Array|Object), ????????????????????????
 * @param {predicateFunction} ????????????????????????
 */
export function sortBy(collection, predicateFunction) {
  return sortByLodash(collection, predicateFunction);
}

/**
 * ?????????????????????????????? predicateFunction ???????????????????????????????????????index??????????????????????????????
 * @param {array} (Array): ?????????????????????
 * @param {predicateFunction} ???????????????????????????????????????
 * @param {fromIndex} (number): The index to search from.
 */
export function findIndex(array, predicateFunction, fromIndex = 0) {
  return findIndexLodash(array, predicateFunction, fromIndex);
}

/**
 * ?????????????????????????????? predicateFunction ???????????????????????????????????????index???????????????????????????,????????????????????????????????? undefined??????
 * @param {array} (Array): ?????????????????????
 * @param {predicateFunction} ???????????????????????????????????????
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

export function replace(source, pattern, replacement) {
  return replaceCore(source, pattern, replacement);
}

export function isBoolean(value) {
  return isBooleanLodash(value);
}

/**
 * check value is undefined
 */
export function isUndefined(value) {
  return isUndefinedLodash(value);
}

/**
 * check value is null
 */
export function isNull(value) {
  return isNullLodash(value);
}

/**
 * check value is date
 */
export function isDate(value) {
  return isDateLodash(value);
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
 * ???????????????predicate????????????????????????????????????????????????????????????????????????????????????predicate???????????? ?????????3???????????? (value, index, array)???
 * @param {*} array
 * @param {*} predicate (Array|Function|Object|string): ???????????????????????????
 */
export function removeFromArray(array, predicate) {
  return removeLodash(array, predicate);
}

export function stringIsNullOrWhiteSpace(value) {
  return stringIsNullOrWhiteSpaceCore(value);
}

/**
 * base64??????
 */
export function decodeBase64(target) {
  return decodeBase64Core(target);
}

/**
 * base64??????
 */
export function encodeBase64(target) {
  return encodeBase64Core(target);
}

/**
 * ??????
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
 * ??????????????????
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */
export function buildFieldHelper(v, prefix = '??????') {
  return `${prefix}${v}???`;
}

export function checkLocalhost() {
  const hostname = toLower(window.location.hostname);

  return hostname === '127.0.0.1' || hostname === 'localhost';
}

/**
 * ???????????????????????????????????????????????????????????????????????????????????????????????????
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
          message: '????????????',
          description: `?????????????????????${text}???`,
        });

        setNearestLocalhostNotifyCache();
      }
    } catch (error) {
      recordLog(error);
    }
  }
}

/**
 * ????????????
 */
export function ellipsis(value, length, symbol = '...') {
  if (value && value.length > length) {
    return `${toString(value).substr(0, length)}${symbol}`;
  }

  return toString(value);
}

export function notifySuccess(text) {
  const description = text || '???????????????????????????????????????????????????';

  notify({
    type: notificationTypeCollection.success,
    placement: 'bottomRight',
    message: '????????????',
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
    message: '????????????',
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
    message: '????????????',
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
    message: '????????????',
    description,
  });
}

/**
 * ??????????????????
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
      message: '????????????',
      description: '??????????????????',
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

export function recordWarn(record) {
  recordWarnCore(record);
}

export function recordInfo(record) {
  recordInfoCore(record);
}

export function recordDebug(record) {
  recordDebugCore(record);
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
    const text = 'label???????????????';

    showRuntimeError({
      message: text,
    });

    recordObject(label);
  } else {
    labelText = label;
  }

  if (isObject(name)) {
    const text = 'name???????????????';

    showRuntimeError({
      message: text,
    });

    recordObject(name);
  } else {
    nameText = name;
  }

  if (isObject(helper)) {
    const text = 'helper???????????????';

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
 * ??????????????????????????????????????????????????????????????????
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
    const text = '????????????!';

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
        const text = '??????????????????!';

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
        const text = '??????????????????!';

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

    default:
      const text = `???????????????????????????????????????['${sortOperate.moveUp}','${sortOperate.moveDown}']!`;

      showWarnMessage({
        message: text,
      });

      break;
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
 * ????????????
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
