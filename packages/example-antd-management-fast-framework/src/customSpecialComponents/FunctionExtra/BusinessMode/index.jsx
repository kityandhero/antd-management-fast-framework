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

export function refitBusinessModeList({ withUnlimited = true }) {
  const { businessModeList: list } = {
    businessModeList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getBusinessModeName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitBusinessModeList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderBusinessModeOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitBusinessModeList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderBusinessModeRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitBusinessModeList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchBusinessModeSelect({
  withUnlimited = true,
  label = '业务范围',
  name = 'businessMode',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitBusinessModeList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomBusinessModeSelect({
  label = '业务范围',
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
    list: refitBusinessModeList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormBusinessModeSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '业务范围',
  formItemLayout = null,
  required = true,
  name = 'businessMode',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitBusinessModeList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomBusinessModeRadio({
  label = '业务范围',
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
    list: refitBusinessModeList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormBusinessModeRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '业务范围',
  formItemLayout = null,
  required = true,
  name = 'businessMode',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitBusinessModeList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
