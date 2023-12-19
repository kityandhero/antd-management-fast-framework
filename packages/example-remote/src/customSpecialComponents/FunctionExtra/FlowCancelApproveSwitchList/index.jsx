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

export function refitFlowCancelApproveSwitchListList({ withUnlimited = true }) {
  const { flowCancelApproveSwitchListList: list } = {
    flowCancelApproveSwitchListList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getFlowCancelApproveSwitchListName({
  value,
  defaultValue = '',
}) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitFlowCancelApproveSwitchListList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderFlowCancelApproveSwitchListOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitFlowCancelApproveSwitchListList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderFlowCancelApproveSwitchListRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitFlowCancelApproveSwitchListList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchFlowCancelApproveSwitchListSelect({
  withUnlimited = true,
  label = '可撤销开关',
  name = 'cancelApproveSwitch',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitFlowCancelApproveSwitchListList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomFlowCancelApproveSwitchListSelect({
  style = {},
  label = '可撤销开关',
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
    list: refitFlowCancelApproveSwitchListList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFlowCancelApproveSwitchListDropDown({
  label = '可撤销开关',
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
    list: refitFlowCancelApproveSwitchListList({ withUnlimited: false }),
    dataConvert: null,
    onClick: onClickCallback,
    innerProps: innerProperties || null,
  });
}

export function renderFormFlowCancelApproveSwitchListSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '可撤销开关',
  formItemLayout = null,
  required = true,
  name = 'cancelApproveSwitch',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitFlowCancelApproveSwitchListList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomFlowCancelApproveSwitchListRadio({
  label = '可撤销开关',
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
    list: refitFlowCancelApproveSwitchListList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormFlowCancelApproveSwitchListRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '可撤销开关',
  formItemLayout = null,
  required = true,
  name = 'cancelApproveSwitch',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitFlowCancelApproveSwitchListList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
