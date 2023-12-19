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

export function refitErrorLogResolveList({ withUnlimited = true }) {
  const { errorLogResolveList: list } = {
    errorLogResolveList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getErrorLogResolveName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitErrorLogResolveList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderErrorLogResolveOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitErrorLogResolveList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderErrorLogResolveRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitErrorLogResolveList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchErrorLogResolveSelect({
  withUnlimited = true,
  label = '解决状态',
  name = 'resolve',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitErrorLogResolveList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomErrorLogResolveSelect({
  style = {},
  label = '解决状态',
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
    list: refitErrorLogResolveList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderErrorLogResolveDropDown({
  label = '解决状态',
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
    list: refitErrorLogResolveList({ withUnlimited: false }),
    dataConvert: null,
    onClick: onClickCallback,
    innerProps: innerProperties || null,
  });
}

export function renderFormErrorLogResolveSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '解决状态',
  formItemLayout = null,
  required = true,
  name = 'resolve',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitErrorLogResolveList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomErrorLogResolveRadio({
  label = '解决状态',
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
    list: refitErrorLogResolveList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormErrorLogResolveRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '解决状态',
  formItemLayout = null,
  required = true,
  name = 'resolve',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitErrorLogResolveList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
