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

export function refitUserQuestionnaireStatusList({ withUnlimited = true }) {
  const { userQuestionnaireStatusList: list } = {
    userQuestionnaireStatusList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getUserQuestionnaireStatusName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitUserQuestionnaireStatusList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderUserQuestionnaireStatusOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitUserQuestionnaireStatusList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderUserQuestionnaireStatusRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitUserQuestionnaireStatusList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchUserQuestionnaireStatusSelect({
  withUnlimited = true,
  label = '状态',
  name = 'status',
  helper = null,
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  const listData = refitUserQuestionnaireStatusList({
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

export function renderCustomUserQuestionnaireStatusSelect({
  style = {},
  label = '状态',
  separator = ':',
  size = 'middle',
  onChange: onChangeCallback,
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const listData = refitUserQuestionnaireStatusList({
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

export function renderUserQuestionnaireStatusDropDown({
  label = '状态',
  placement = 'bottomRight',
  icon = null,
  size = 'middle',
  onClick: onClickCallback,
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const listData = refitUserQuestionnaireStatusList({
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

export function renderFormUserQuestionnaireStatusSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '状态',
  formItemLayout = null,
  required = true,
  name = 'status',
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
}) {
  const title = label || unknownLabel;

  const listData = refitUserQuestionnaireStatusList({
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

export function renderCustomUserQuestionnaireStatusRadio({
  label = '状态',
  separator = ': ',
  size = 'middle',
  onChange: onChangeCallback,
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const listData = refitUserQuestionnaireStatusList({
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

export function renderFormUserQuestionnaireStatusRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '状态',
  formItemLayout = null,
  required = true,
  name = 'status',
  innerProps: innerProperties = null,
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  const listData = refitUserQuestionnaireStatusList({
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
