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

export function refitClientTypeList({ withUnlimited = true }) {
  const { clientTypeList: list } = {
    clientTypeList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getClientTypeName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitClientTypeList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderClientTypeOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitClientTypeList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderClientTypeRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitClientTypeList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchClientTypeSelect({
  withUnlimited = true,
  label = '终端类型',
  name = 'clientType',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitClientTypeList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomClientTypeSelect({
  style = {},
  label = '终端类型',
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
    list: refitClientTypeList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderClientTypeDropDown({
  label = '终端类型',
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
    list: refitClientTypeList({ withUnlimited: false }),
    dataConvert: null,
    onClick: onClickCallback,
    innerProps: innerProperties || null,
  });
}

export function renderFormClientTypeSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '终端类型',
  formItemLayout = null,
  required = true,
  name = 'clientType',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitClientTypeList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomClientTypeRadio({
  label = '终端类型',
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
    list: refitClientTypeList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormClientTypeRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '终端类型',
  formItemLayout = null,
  required = true,
  name = 'clientType',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitClientTypeList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
