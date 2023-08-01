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

export function refitOptionPoolCategoryList({ withUnlimited = true }) {
  const { optionPoolCategoryList: list } = {
    optionPoolCategoryList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getOptionPoolCategoryName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitOptionPoolCategoryList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderOptionPoolCategoryOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitOptionPoolCategoryList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderOptionPoolCategoryRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitOptionPoolCategoryList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchOptionPoolCategorySelect({
  withUnlimited = true,
  label = '类别',
  name = 'category',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitOptionPoolCategoryList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomOptionPoolCategorySelect({
  label = '类别',
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
    list: refitOptionPoolCategoryList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormOptionPoolCategorySelect({
  helper = null,
  onChange: onChangeCallback,
  label = '类别',
  formItemLayout = null,
  required = true,
  name = 'category',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitOptionPoolCategoryList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomOptionPoolCategoryRadio({
  label = '类别',
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
    list: refitOptionPoolCategoryList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormOptionPoolCategoryRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '类别',
  formItemLayout = null,
  required = true,
  name = 'category',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitOptionPoolCategoryList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
