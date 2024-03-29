import { arrayMoveImmutable, arrayMoveMutable } from 'array-move';
import numeral from 'numeral';
import queue from 'queue';
import randomColor from 'randomcolor';
import React from 'react';
import { useIntl } from '@umijs/max';

import { isBrowser, parseQueryString } from 'easy-soft-utility';

import { listViewConfig } from './constants';

export function defaultBaseState() {
  return {
    firstLoadSuccess: false,
    loadSuccess: false,
    urlParams: null,
    externalData: null,
  };
}

export function defaultCoreState() {
  const data = { ...defaultBaseState(), dataLoading: true };

  return data;
}

export function defaultCommonState() {
  const data = {
    ...defaultCoreState(),
    loadApiPath: '',
    pageTitle: '',
    pageSubTitle: '',
    metaData: null,
    metaExtra: null,
    metaListData: [],
    metaOriginalData: null,
  };

  return data;
}

export function defaultListState() {
  const data = {
    ...defaultCommonState(),
    tableScrollX: 1520,
    tableScrollY: null,
    startTimeAlias: '',
    endTimeAlias: '',
    listViewMode: listViewConfig.viewMode.table,
    showSelect: false,
    selectedDataTableDataRows: [],
  };

  return data;
}

export function defaultPageListState() {
  const data = {
    ...defaultCommonState(),
    loadApiPath: '',
    tableScrollX: 1520,
    tableScrollY: null,
    listViewMode: listViewConfig.viewMode.table,
    showSelect: false,
    selectedDataTableDataRows: [],
  };

  return data;
}

export function defaultFormState() {
  const data = {
    ...defaultCommonState(),
    errorFieldName: '',
    submitApiPath: '',
  };

  return data;
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
 */
function FormatMessageWrapper(o) {
  const { formatMessage: formatMessageUseIntl } = useIntl();

  return formatMessageUseIntl(o);
}

/**
 * 语言渲染封装器
 * @param {*} o 语言配置
 */
export function formatMessage(o) {
  return FormatMessageWrapper(o);
}

export function arrayMove(array, from, to) {
  return arrayMoveImmutable(array, from, to);
}

export function arrayMoveMutate(array, from, to) {
  return arrayMoveMutable(array, from, to);
}

/**
 * 获取工作队列
 */
export function getQueue() {
  if (window.queue === undefined) {
    window.queueCustom = queue({ concurrency: 3 });
    window.queueCustom.start();
  }

  return window.queueCustom;
}

/**
 * 通过种子等配置返回随机颜色值
 *
 * @param {*} seed
 */
export function buildRandomHexColor({
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
 * 格式化数字
 */
export function numeralFormat(v, formatString) {
  return numeral(v).format(formatString);
}

export const getPageQuery = () => {
  return parseQueryString(window.location.href.split('?')[1]);
};

export const isComponentClass = (component) => {
  if (!component) return false;

  const proto = Object.getPrototypeOf(component);

  if (proto === React.Component || proto === Function.prototype) return true;

  return isComponentClass(proto);
};
