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

export function refitFlowNodeApproveModeList({ withUnlimited = true }) {
  const { flowNodeApproveModeList: list } = {
    flowNodeApproveModeList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getFlowNodeApproveModeName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitFlowNodeApproveModeList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderFlowNodeApproveModeOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitFlowNodeApproveModeList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderFlowNodeApproveModeRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitFlowNodeApproveModeList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchFlowNodeApproveModeSelect({
  withUnlimited = true,
  label = '审批模式',
  name = 'approveMode',
  helper = null,
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  const listData = refitFlowNodeApproveModeList({
    withUnlimited,
  });

  const list =
    adjustListDataCallback == null
      ? listData
      : adjustListDataCallback(listData);

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: list,
    dataConvert: convertOptionOrRadioData,
    hidden,
    addonBefore,
    addonBeforeStyle,
    addonAfter,
    addonAfterStyle,
  });
}

export function renderCustomFlowNodeApproveModeSelect({
  style = {},
  label = '审批模式',
  separator = ':',
  size = 'middle',
  onChange: onChangeCallback,
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const listData = refitFlowNodeApproveModeList({
    withUnlimited: true,
  });

  const list =
    adjustListDataCallback == null
      ? listData
      : adjustListDataCallback(listData);

  return buildFlexSelect({
    style,
    label,
    defaultValue: null,
    separator,
    size,
    list: list,
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFlowNodeApproveModeDropDown({
  label = '审批模式',
  placement = 'bottomRight',
  icon = null,
  size = 'middle',
  onClick: onClickCallback,
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const listData = refitFlowNodeApproveModeList({
    withUnlimited: false,
  });

  const list =
    adjustListDataCallback == null
      ? listData
      : adjustListDataCallback(listData);

  return buildDropdownMenu({
    label,
    placement,
    icon,
    size,
    list: list,
    dataConvert: null,
    onClick: onClickCallback,
    innerProps: innerProperties || null,
  });
}

export function renderFormFlowNodeApproveModeSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '审批模式',
  formItemLayout = null,
  required = true,
  name = 'approveMode',
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
}) {
  const title = label || unknownLabel;

  const listData = refitFlowNodeApproveModeList({
    withUnlimited: false,
  });

  const list =
    adjustListDataCallback == null
      ? listData
      : adjustListDataCallback(listData);

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: list,
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
    hidden,
    addonBefore,
    addonBeforeStyle,
    addonAfter,
    addonAfterStyle,
  });
}

export function renderCustomFlowNodeApproveModeRadio({
  label = '审批模式',
  separator = ': ',
  size = 'middle',
  onChange: onChangeCallback,
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const listData = refitFlowNodeApproveModeList({
    withUnlimited: true,
  });

  const list =
    adjustListDataCallback == null
      ? listData
      : adjustListDataCallback(listData);

  return buildFlexRadio({
    label,
    defaultValue: null,
    separator,
    size,
    list: list,
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormFlowNodeApproveModeRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '审批模式',
  formItemLayout = null,
  required = true,
  name = 'approveMode',
  innerProps: innerProperties = null,
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  const listData = refitFlowNodeApproveModeList({
    withUnlimited: false,
  });

  const list =
    adjustListDataCallback == null
      ? listData
      : adjustListDataCallback(listData);

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: list,
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
    hidden,
    addonBefore,
    addonBeforeStyle,
    addonAfter,
    addonAfterStyle,
  });
}
