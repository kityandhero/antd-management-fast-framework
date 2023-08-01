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

export function refitApplicationNavigationOperationTypeList({
  withUnlimited = true,
}) {
  const { applicationNavigationOperationTypeList: list } = {
    applicationNavigationOperationTypeList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getApplicationNavigationOperationTypeName({
  value,
  defaultValue = '',
}) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitApplicationNavigationOperationTypeList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderApplicationNavigationOperationTypeOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitApplicationNavigationOperationTypeList({
    withUnlimited,
  });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderApplicationNavigationOperationTypeRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitApplicationNavigationOperationTypeList({
    withUnlimited,
  });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchApplicationNavigationOperationTypeSelect({
  withUnlimited = true,
  label = '交互方式',
  name = 'operationType',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitApplicationNavigationOperationTypeList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomApplicationNavigationOperationTypeSelect({
  label = '交互方式',
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
    list: refitApplicationNavigationOperationTypeList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormApplicationNavigationOperationTypeSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '交互方式',
  formItemLayout = null,
  required = true,
  name = 'operationType',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitApplicationNavigationOperationTypeList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomApplicationNavigationOperationTypeRadio({
  label = '交互方式',
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
    list: refitApplicationNavigationOperationTypeList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormApplicationNavigationOperationTypeRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '交互方式',
  formItemLayout = null,
  required = true,
  name = 'operationType',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitApplicationNavigationOperationTypeList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
