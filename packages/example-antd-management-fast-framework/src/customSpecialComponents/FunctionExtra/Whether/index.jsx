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
} from 'antd-management-fast-component';
import { getMergeMetaData } from 'antd-management-fast-framework';

export function refitWhetherList({ withUnlimited = true }) {
  const { whetherList: list } = {
    whetherList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getWhetherName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitWhetherList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderWhetherOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitWhetherList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderWhetherRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitWhetherList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchWhetherSelect({
  withUnlimited = true,
  label = '调用时设置',
  name = 'whether',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitWhetherList({ withUnlimited }),
    dataConvert: (o) => o,
  });
}

export function renderCustomWhetherSelect({
  label = '调用时设置',
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
    list: refitWhetherList({ withUnlimited: true }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormWhetherSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '调用时设置',
  formItemLayout = null,
  required = true,
  name = 'whether',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitWhetherList({ withUnlimited: false }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomWhetherRadio({
  label = '调用时设置',
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
    list: refitWhetherList({ withUnlimited: true }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormWhetherRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '调用时设置',
  formItemLayout = null,
  required = true,
  name = 'whether',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitWhetherList({ withUnlimited: false }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
