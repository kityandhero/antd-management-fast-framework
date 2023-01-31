import { message, notification } from 'antd';
import { arrayMoveImmutable, arrayMoveMutable } from 'array-move';
import copy from 'copy-to-clipboard';
import { toLower } from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import queue from 'queue';
import randomColor from 'randomcolor';
import { history, useIntl } from '@umijs/max';

import {
  emptyDatetime,
  isArray,
  isBrowser,
  isDate,
  isString,
  messageTypeCollection,
  showSimpleErrorMessage,
  showSimpleSuccessMessage,
} from 'easy-soft-utility';

import { getAppInitConfigData } from './core';
import { setLocalStorageHandler } from './localStorageAssist';
import { setNavigationHandler } from './navigationAssist';
import { getCurrentParams } from './routeAssist';

/**
 * 复制到剪贴板
 * @param {*} text
 * @param {*} showText
 */
export function copyToClipboard(text, showCopyText = true, otherShowText = '') {
  copy(text);

  if (showCopyText) {
    showSimpleSuccessMessage(`已经将 ${text} 复制到剪贴板！`);
  } else if (checkStringIsNullOrWhiteSpace(otherShowText)) {
    showSimpleSuccessMessage('已经复制到剪贴板！');
  } else {
    showSimpleSuccessMessage(`已经将${otherShowText}复制到剪贴板！`);
  }
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

  if (checkStringIsNullOrWhiteSpace(d)) {
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
export function getDerivedStateFromPropsForUrlParamsCore() {
  const params = getCurrentParams();

  return { urlParams: params };
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
  let stateUrlParams = getDerivedStateFromPropsForUrlParamsCore();

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

  if (checkStringIsNullOrWhiteSpace(description)) {
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

  if (checkStringIsNullOrWhiteSpace(description)) {
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

  if (checkStringIsNullOrWhiteSpace(description)) {
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

export function setEasySoftUtilityHandler() {
  setLocalStorageHandler();
  setNavigationHandler();
}
