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

export function refitMediaTypeList({ withUnlimited = true }) {
  const { mediaTypeList: list } = {
    mediaTypeList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getMediaTypeName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitMediaTypeList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderMediaTypeOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitMediaTypeList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderMediaTypeRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitMediaTypeList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchMediaTypeSelect({
  withUnlimited = true,
  label = '媒体类型',
  name = 'mediaType',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitMediaTypeList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomMediaTypeSelect({
  style = {},
  label = '媒体类型',
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
    list: refitMediaTypeList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderMediaTypeDropDown({
  label = '媒体类型',
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
    list: refitMediaTypeList({ withUnlimited: false }),
    dataConvert: null,
    onClick: onClickCallback,
    innerProps: innerProperties || null,
  });
}

export function renderFormMediaTypeSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '媒体类型',
  formItemLayout = null,
  required = true,
  name = 'mediaType',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitMediaTypeList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomMediaTypeRadio({
  label = '媒体类型',
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
    list: refitMediaTypeList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormMediaTypeRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '媒体类型',
  formItemLayout = null,
  required = true,
  name = 'mediaType',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitMediaTypeList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
