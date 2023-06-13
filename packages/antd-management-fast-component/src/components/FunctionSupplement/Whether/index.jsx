import {
  isInvalid,
  isNull,
  isUndefined,
  refitCommonData,
  searchFromList,
} from 'easy-soft-utility';

import {
  unknownLabel,
  unlimitedWithStringFlag,
  whetherList,
} from 'antd-management-fast-common';

import { convertOptionOrRadioData } from '../../Function/Assist';
import {
  buildFlexRadio,
  buildFlexSelect,
  buildFormRadio,
  buildFormSelect,
  buildSearchFormSelect,
} from '../../FunctionComponent';

export function refitWhetherList({ withUnlimited = true }) {
  const { whetherList: list } = {
    whetherList: whetherList,
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getWhetherName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitWhetherList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderSearchWhetherSelect({
  withUnlimited = true,
  label = '调用时设置',
  name = 'whether',
  helper = null,
}) {
  return buildSearchFormSelect({
    label: label || unknownLabel,
    name,
    helper,
    list: refitWhetherList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomWhetherSelect({
  label = '调用时设置',
  separator = ':',
  size = 'middle',
  onChange: onChangeCallback,
  innerProps: innerProperties = null,
}) {
  return buildFlexSelect({
    label,
    defaultValue: null,
    separator,
    size,
    list: refitWhetherList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormWhetherSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '调用时设置',
  formItemLayout = null,
  required = true,
  name = 'whether',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitWhetherList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomWhetherRadio({
  label = '调用时设置',
  separator = ': ',
  size = 'middle',
  onChange: onChangeCallback,
  innerProps: innerProperties = null,
}) {
  return buildFlexRadio({
    label,
    defaultValue: null,
    separator,
    size,
    list: refitWhetherList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormWhetherRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '调用时设置',
  formItemLayout = null,
  required = true,
  name = 'whether',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitWhetherList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
