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

export function refitApplicationNavigationAccessibilityList({
  withUnlimited = true,
}) {
  const { applicationNavigationAccessibilityList: list } = {
    applicationNavigationAccessibilityList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getApplicationNavigationAccessibilityName({
  value,
  defaultValue = '',
}) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitApplicationNavigationAccessibilityList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderApplicationNavigationAccessibilityOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitApplicationNavigationAccessibilityList({
    withUnlimited,
  });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderApplicationNavigationAccessibilityRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitApplicationNavigationAccessibilityList({
    withUnlimited,
  });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchApplicationNavigationAccessibilitySelect({
  withUnlimited = true,
  label = '可访问性',
  name = 'accessibility',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitApplicationNavigationAccessibilityList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomApplicationNavigationAccessibilitySelect({
  style = {},
  label = '可访问性',
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
    list: refitApplicationNavigationAccessibilityList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderApplicationNavigationAccessibilityDropDown({
  label = '可访问性',
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
    list: refitApplicationNavigationAccessibilityList({ withUnlimited: false }),
    dataConvert: null,
    onClick: onClickCallback,
    innerProps: innerProperties || null,
  });
}

export function renderFormApplicationNavigationAccessibilitySelect({
  helper = null,
  onChange: onChangeCallback,
  label = '可访问性',
  formItemLayout = null,
  required = true,
  name = 'accessibility',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitApplicationNavigationAccessibilityList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomApplicationNavigationAccessibilityRadio({
  label = '可访问性',
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
    list: refitApplicationNavigationAccessibilityList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormApplicationNavigationAccessibilityRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '可访问性',
  formItemLayout = null,
  required = true,
  name = 'accessibility',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitApplicationNavigationAccessibilityList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
