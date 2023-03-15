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
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    options: renderSimpleRenderTypeOption({
      metaData,
      withUnlimited,
      adjustListDataCallback,
    }),
    helper,
  });
}

export function renderCustomSimpleRenderTypeSelect({
  metaData = null,
  label = '渲染模式',
  separator = ':',
  size = 'middle',
  onChangeCallback,
  innerProps: innerProperties = null,
  adjustListDataCallback = null,
}) {
  return buildFlexSelect({
    label,
    separator,
    size,
    renderItem: () => {
      return renderSimpleRenderTypeOption({
        metaData,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormSimpleRenderTypeSelect({
  metaData = null,
  helper = null,
  onChangeCallback,
  label = '渲染模式',
  formItemLayout = null,
  required = true,
  name = 'renderType',
  innerProps: innerProperties = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    renderItem: () => {
      return renderSimpleRenderTypeOption({
        metaData,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    helper,
    onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomSimpleRenderTypeRadio({
  metaData = null,
  label = '渲染模式',
  separator = ':',
  size = 'middle',
  onChangeCallback,
  innerProps: innerProperties = null,
  adjustListDataCallback = null,
}) {
  return buildFlexRadio({
    label,
    separator,
    size,
    renderItem: () => {
      return renderSimpleRenderTypeRadio({
        metaData,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormSimpleRenderTypeRadio({
  metaData = null,
  helper = null,
  onChangeCallback,
  label = '渲染模式',
  formItemLayout = null,
  required = true,
  name = 'renderType',
  innerProps: innerProperties = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    renderItem: () => {
      return renderSimpleRenderTypeRadio({
        metaData,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    helper,
    onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
