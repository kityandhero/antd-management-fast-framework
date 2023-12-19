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
} from 'antd-management-fast-common';
import {
  buildDropdownMenu,
  buildFlexRadio,
  buildFlexSelect,
  buildFormRadio,
  buildFormSelect,
  buildOptionItem,
  buildRadioItem,
  buildSearchFormSelect,
  convertOptionOrRadioData,
} from 'antd-management-fast-component';
import { getMergeMetaData } from 'antd-management-fast-framework';

export function refitSmsLogAggregateList({ withUnlimited = true }) {
  const { smsLogAggregateList: list } = {
    smsLogAggregateList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getSmsLogAggregateName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitSmsLogAggregateList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderSmsLogAggregateOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitSmsLogAggregateList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderSmsLogAggregateRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitSmsLogAggregateList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchSmsLogAggregateSelect({
  withUnlimited = true,
  label = '汇总状态',
  name = 'aggregate',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitSmsLogAggregateList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomSmsLogAggregateSelect({
  style = {},
  label = '汇总状态',
  separator = ':',
  size = 'middle',
  onChange: onChangeCallback,
  innerProps: innerProperties = null,
}) {
  return buildFlexSelect({
    style,
    label,
    defaultValue: null,
    separator,
    size,
    list: refitSmsLogAggregateList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderSmsLogAggregateDropDown({
  label = '汇总状态',
  placement = 'bottomRight',
  icon = null,
  size = 'middle',
  onClick: onClickCallback,
  innerProps: innerProperties = null,
}) {
  return buildDropdownMenu({
    label,
    placement,
    icon,
    size,
    list: refitSmsLogAggregateList({ withUnlimited: false }),
    dataConvert: null,
    onClick: onClickCallback,
    innerProps: innerProperties || null,
  });
}

export function renderFormSmsLogAggregateSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '汇总状态',
  formItemLayout = null,
  required = true,
  name = 'aggregate',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitSmsLogAggregateList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomSmsLogAggregateRadio({
  label = '汇总状态',
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
    list: refitSmsLogAggregateList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormSmsLogAggregateRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '汇总状态',
  formItemLayout = null,
  required = true,
  name = 'aggregate',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitSmsLogAggregateList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
