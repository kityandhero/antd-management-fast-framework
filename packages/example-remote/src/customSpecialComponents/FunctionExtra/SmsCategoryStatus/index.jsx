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

export function refitSmsCategoryStatusList({ withUnlimited = true }) {
  const { smsCategoryStatusList: list } = {
    smsCategoryStatusList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getSmsCategoryStatusName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitSmsCategoryStatusList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderSmsCategoryStatusOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitSmsCategoryStatusList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderSmsCategoryStatusRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitSmsCategoryStatusList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchSmsCategoryStatusSelect({
  withUnlimited = true,
  label = '状态',
  name = 'status',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitSmsCategoryStatusList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomSmsCategoryStatusSelect({
  label = '状态',
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
    list: refitSmsCategoryStatusList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormSmsCategoryStatusSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '状态',
  formItemLayout = null,
  required = true,
  name = 'status',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitSmsCategoryStatusList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomSmsCategoryStatusRadio({
  label = '状态',
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
    list: refitSmsCategoryStatusList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormSmsCategoryStatusRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '状态',
  formItemLayout = null,
  required = true,
  name = 'status',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitSmsCategoryStatusList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}