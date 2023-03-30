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

export function refitCallCenterCategoryList({ withUnlimited = true }) {
  const { callCenterCategoryList: list } = {
    callCenterCategoryList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getCallCenterCategoryName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitCallCenterCategoryList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderCallCenterCategoryOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitCallCenterCategoryList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderCallCenterCategoryRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitCallCenterCategoryList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchCallCenterCategorySelect({
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
    list: refitCallCenterCategoryList({ withUnlimited }),
    dataConvert: (o) => o,
  });
}

export function renderCustomCallCenterCategorySelect({
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
    list: refitCallCenterCategoryList({ withUnlimited: true }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormCallCenterCategorySelect({
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
    list: refitCallCenterCategoryList({ withUnlimited: false }),
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

export function renderCustomCallCenterCategoryRadio({
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
    list: refitCallCenterCategoryList({ withUnlimited: true }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormCallCenterCategoryRadio({
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
    list: refitCallCenterCategoryList({ withUnlimited: false }),
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
