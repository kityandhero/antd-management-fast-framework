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

export function refitQuestionTypeList({ withUnlimited = true }) {
  const { questionTypeList: list } = {
    questionTypeList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getQuestionTypeName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitQuestionTypeList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderQuestionTypeOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitQuestionTypeList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderQuestionTypeRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitQuestionTypeList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchQuestionTypeSelect({
  withUnlimited = true,
  label = '类型',
  name = 'type',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitQuestionTypeList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomQuestionTypeSelect({
  style = {},
  label = '类型',
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
    list: refitQuestionTypeList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderQuestionTypeDropDown({
  label = '类型',
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
    list: refitQuestionTypeList({ withUnlimited: false }),
    dataConvert: null,
    onClick: onClickCallback,
    innerProps: innerProperties || null,
  });
}

export function renderFormQuestionTypeSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '类型',
  formItemLayout = null,
  required = true,
  name = 'type',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitQuestionTypeList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomQuestionTypeRadio({
  label = '类型',
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
    list: refitQuestionTypeList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormQuestionTypeRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '类型',
  formItemLayout = null,
  required = true,
  name = 'type',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitQuestionTypeList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
