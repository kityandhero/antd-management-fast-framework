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

export function refitFlowLineToPositionList({ withUnlimited = true }) {
  const { flowLineToPositionList: list } = {
    flowLineToPositionList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getFlowLineToPositionName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitFlowLineToPositionList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderFlowLineToPositionOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitFlowLineToPositionList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderFlowLineToPositionRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitFlowLineToPositionList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchFlowLineToPositionSelect({
  withUnlimited = true,
  label = '到达位置',
  name = 'toPosition',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitFlowLineToPositionList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomFlowLineToPositionSelect({
  style = {},
  label = '到达位置',
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
    list: refitFlowLineToPositionList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFlowLineToPositionDropDown({
  label = '到达位置',
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
    list: refitFlowLineToPositionList({ withUnlimited: false }),
    dataConvert: null,
    onClick: onClickCallback,
    innerProps: innerProperties || null,
  });
}

export function renderFormFlowLineToPositionSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '到达位置',
  formItemLayout = null,
  required = true,
  name = 'toPosition',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitFlowLineToPositionList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomFlowLineToPositionRadio({
  label = '到达位置',
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
    list: refitFlowLineToPositionList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormFlowLineToPositionRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '到达位置',
  formItemLayout = null,
  required = true,
  name = 'toPosition',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitFlowLineToPositionList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
