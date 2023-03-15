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

export function refitSimpleStatusList({ metaData, withUnlimited = true }) {
  const { simpleStatusList: list } = {
    simpleStatusList: [],
    ...metaData,
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getSimpleStatusName({ metaData, value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitSimpleStatusList({ metaData, withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderSimpleStatusOption({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitSimpleStatusList({ metaData, withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderSimpleStatusRadio({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitSimpleStatusList({ metaData, withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchSimpleStatusSelect({
  metaData = null,
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
    list: refitSimpleStatusList({ metaData, withUnlimited }),
    dataConvert: (o) => o,
  });
}

export function renderCustomSimpleStatusSelect({
  metaData = null,
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
    list: refitSimpleStatusList({ metaData, withUnlimited: true }),
    // eslint-disable-next-line no-unused-vars
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { label: name, value: flag, disabled: false, ...o };
    },
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormSimpleStatusSelect({
  metaData = null,
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
    list: refitSimpleStatusList({ metaData, withUnlimited: false }),
    // eslint-disable-next-line no-unused-vars
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { label: name, value: flag, disabled: false, ...o };
    },
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomSimpleStatusRadio({
  metaData = null,
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
    list: refitSimpleStatusList({ metaData, withUnlimited: true }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormSimpleStatusRadio({
  metaData = null,
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
    list: refitSimpleStatusList({ metaData, withUnlimited: false }),
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
