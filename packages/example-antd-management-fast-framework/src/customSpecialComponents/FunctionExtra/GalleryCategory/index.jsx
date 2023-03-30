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

export function refitGalleryCategoryList({ withUnlimited = true }) {
  const { galleryCategoryList: list } = {
    galleryCategoryList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getGalleryCategoryName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitGalleryCategoryList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderGalleryCategoryOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitGalleryCategoryList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderGalleryCategoryRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitGalleryCategoryList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchGalleryCategorySelect({
  withUnlimited = true,
  label = '所属分类',
  name = 'category',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitGalleryCategoryList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomGalleryCategorySelect({
  label = '所属分类',
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
    list: refitGalleryCategoryList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormGalleryCategorySelect({
  helper = null,
  onChange: onChangeCallback,
  label = '所属分类',
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
    list: refitGalleryCategoryList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomGalleryCategoryRadio({
  label = '所属分类',
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
    list: refitGalleryCategoryList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormGalleryCategoryRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '所属分类',
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
    list: refitGalleryCategoryList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
