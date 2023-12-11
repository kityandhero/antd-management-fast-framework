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

export function refitGovernmentAffairRoleCreateModeList({
  withUnlimited = true,
}) {
  const { governmentAffairRoleCreateModeList: list } = {
    governmentAffairRoleCreateModeList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getGovernmentAffairRoleCreateModeName({
  value,
  defaultValue = '',
}) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitGovernmentAffairRoleCreateModeList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderGovernmentAffairRoleCreateModeOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitGovernmentAffairRoleCreateModeList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderGovernmentAffairRoleCreateModeRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitGovernmentAffairRoleCreateModeList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchGovernmentAffairRoleCreateModeSelect({
  withUnlimited = true,
  label = '创建模式',
  name = 'createMode',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitGovernmentAffairRoleCreateModeList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomGovernmentAffairRoleCreateModeSelect({
  style = {},
  label = '创建模式',
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
    list: refitGovernmentAffairRoleCreateModeList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderGovernmentAffairRoleCreateModeDropDown({
  label = '创建模式',
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
    list: refitGovernmentAffairRoleCreateModeList({ withUnlimited: false }),
    dataConvert: null,
    onClick: onClickCallback,
    innerProps: innerProperties || null,
  });
}

export function renderFormGovernmentAffairRoleCreateModeSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '创建模式',
  formItemLayout = null,
  required = true,
  name = 'createMode',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitGovernmentAffairRoleCreateModeList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomGovernmentAffairRoleCreateModeRadio({
  label = '创建模式',
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
    list: refitGovernmentAffairRoleCreateModeList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormGovernmentAffairRoleCreateModeRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '创建模式',
  formItemLayout = null,
  required = true,
  name = 'createMode',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitGovernmentAffairRoleCreateModeList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
