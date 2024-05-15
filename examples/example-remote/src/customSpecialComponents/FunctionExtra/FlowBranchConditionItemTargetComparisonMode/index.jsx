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

export function refitFlowBranchConditionItemTargetComparisonModeList({
  withUnlimited = true,
}) {
  const { flowBranchConditionItemTargetComparisonModeList: list } = {
    flowBranchConditionItemTargetComparisonModeList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getFlowBranchConditionItemTargetComparisonModeName({
  value,
  defaultValue = '',
}) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitFlowBranchConditionItemTargetComparisonModeList({
      withUnlimited: false,
    }),
  );

  return item == null ? '未知' : item.name;
}

export function renderFlowBranchConditionItemTargetComparisonModeOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitFlowBranchConditionItemTargetComparisonModeList({
    withUnlimited,
  });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderFlowBranchConditionItemTargetComparisonModeRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitFlowBranchConditionItemTargetComparisonModeList({
    withUnlimited,
  });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchFlowBranchConditionItemTargetComparisonModeSelect({
  withUnlimited = true,
  label = '目标对比模式',
  name = 'targetComparisonMode',
  helper = null,
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  const listData = refitFlowBranchConditionItemTargetComparisonModeList({
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

export function renderCustomFlowBranchConditionItemTargetComparisonModeSelect({
  style = {},
  label = '目标对比模式',
  separator = ':',
  size = 'middle',
  onChange: onChangeCallback,
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const listData = refitFlowBranchConditionItemTargetComparisonModeList({
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

export function renderFlowBranchConditionItemTargetComparisonModeDropDown({
  label = '目标对比模式',
  placement = 'bottomRight',
  icon = null,
  size = 'middle',
  onClick: onClickCallback,
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const listData = refitFlowBranchConditionItemTargetComparisonModeList({
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

export function renderFormFlowBranchConditionItemTargetComparisonModeSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '目标对比模式',
  formItemLayout = null,
  required = true,
  name = 'targetComparisonMode',
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
}) {
  const title = label || unknownLabel;

  const listData = refitFlowBranchConditionItemTargetComparisonModeList({
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

export function renderCustomFlowBranchConditionItemTargetComparisonModeRadio({
  label = '目标对比模式',
  separator = ': ',
  size = 'middle',
  onChange: onChangeCallback,
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const listData = refitFlowBranchConditionItemTargetComparisonModeList({
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

export function renderFormFlowBranchConditionItemTargetComparisonModeRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '目标对比模式',
  formItemLayout = null,
  required = true,
  name = 'targetComparisonMode',
  innerProps: innerProperties = null,
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  const listData = refitFlowBranchConditionItemTargetComparisonModeList({
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
