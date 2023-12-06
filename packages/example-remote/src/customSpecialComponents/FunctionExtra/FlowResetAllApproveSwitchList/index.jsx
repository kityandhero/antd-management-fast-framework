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

export function refitFlowResetAllApproveSwitchListList({
  withUnlimited = true,
}) {
  const { flowResetAllApproveSwitchListList: list } = {
    flowResetAllApproveSwitchListList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getFlowResetAllApproveSwitchListName({
  value,
  defaultValue = '',
}) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitFlowResetAllApproveSwitchListList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderFlowResetAllApproveSwitchListOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitFlowResetAllApproveSwitchListList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderFlowResetAllApproveSwitchListRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitFlowResetAllApproveSwitchListList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchFlowResetAllApproveSwitchListSelect({
  withUnlimited = true,
  label = '可重置开关',
  name = 'resetAllApproveSwitch',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitFlowResetAllApproveSwitchListList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomFlowResetAllApproveSwitchListSelect({
  label = '可重置开关',
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
    list: refitFlowResetAllApproveSwitchListList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormFlowResetAllApproveSwitchListSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '可重置开关',
  formItemLayout = null,
  required = true,
  name = 'resetAllApproveSwitch',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitFlowResetAllApproveSwitchListList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomFlowResetAllApproveSwitchListRadio({
  label = '可重置开关',
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
    list: refitFlowResetAllApproveSwitchListList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormFlowResetAllApproveSwitchListRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '可重置开关',
  formItemLayout = null,
  required = true,
  name = 'resetAllApproveSwitch',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitFlowResetAllApproveSwitchListList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
