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

export function refitSmsCategoryFlagList({ withUnlimited = true }) {
  const { smsCategoryFlagList: list } = {
    smsCategoryFlagList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getSmsCategoryFlagName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitSmsCategoryFlagList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderSmsCategoryFlagOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitSmsCategoryFlagList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderSmsCategoryFlagRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitSmsCategoryFlagList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchSmsCategoryFlagSelect({
  withUnlimited = true,
  label = '类别标记',
  name = 'smsCategoryFlag',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitSmsCategoryFlagList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomSmsCategoryFlagSelect({
  style = {},
  label = '类别标记',
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
    list: refitSmsCategoryFlagList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderSmsCategoryFlagDropDown({
  label = '类别标记',
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
    list: refitSmsCategoryFlagList({ withUnlimited: false }),
    dataConvert: null,
    onClick: onClickCallback,
    innerProps: innerProperties || null,
  });
}

export function renderFormSmsCategoryFlagSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '类别标记',
  formItemLayout = null,
  required = true,
  name = 'smsCategoryFlag',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitSmsCategoryFlagList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomSmsCategoryFlagRadio({
  label = '类别标记',
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
    list: refitSmsCategoryFlagList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormSmsCategoryFlagRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '类别标记',
  formItemLayout = null,
  required = true,
  name = 'smsCategoryFlag',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitSmsCategoryFlagList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
