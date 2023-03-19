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

export function refitSimpleRenderTypeList({ metaData, withUnlimited = true }) {
  const { simpleRenderTypeList: list } = {
    simpleRenderTypeList: [],
    ...metaData,
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getSimpleRenderTypeName({
  metaData,
  value,
  defaultValue = '',
}) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitSimpleRenderTypeList({ metaData, withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderSimpleRenderTypeOption({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitSimpleRenderTypeList({ metaData, withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderSimpleRenderTypeRadio({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitSimpleRenderTypeList({ metaData, withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchSimpleRenderTypeSelect({
  metaData = null,
  withUnlimited = true,
  label = '渲染模式',
  name = 'renderType',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitSimpleRenderTypeList({ metaData, withUnlimited }),
    dataConvert: (o) => o,
  });
}

export function renderCustomSimpleRenderTypeSelect({
  metaData = null,
  label = '渲染模式',
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
    list: refitSimpleRenderTypeList({ metaData, withUnlimited: true }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormSimpleRenderTypeSelect({
  metaData = null,
  helper = null,
  onChange: onChangeCallback,
  label = '渲染模式',
  formItemLayout = null,
  required = true,
  name = 'renderType',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitSimpleRenderTypeList({ metaData, withUnlimited: false }),
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

export function renderCustomSimpleRenderTypeRadio({
  metaData = null,
  label = '渲染模式',
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
    list: refitSimpleRenderTypeList({ metaData, withUnlimited: true }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormSimpleRenderTypeRadio({
  metaData = null,
  helper = null,
  onChange: onChangeCallback,
  label = '渲染模式',
  formItemLayout = null,
  required = true,
  name = 'renderType',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitSimpleRenderTypeList({ metaData, withUnlimited: false }),
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
