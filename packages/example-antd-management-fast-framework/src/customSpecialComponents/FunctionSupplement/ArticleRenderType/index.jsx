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

export function refitArticleRenderTypeList({ metaData, withUnlimited = true }) {
  const { articleRenderTypeList: list } = {
    articleRenderTypeList: [],
    ...metaData,
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getArticleRenderTypeName({
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
    refitArticleRenderTypeList({ metaData, withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderArticleRenderTypeOption({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitArticleRenderTypeList({ metaData, withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderArticleRenderTypeRadio({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitArticleRenderTypeList({ metaData, withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchArticleRenderTypeSelect({
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
    options: renderArticleRenderTypeOption({
      metaData,
      withUnlimited,
      adjustListDataCallback,
    }),
    helper,
  });
}

export function renderCustomArticleRenderTypeSelect({
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
      return renderArticleRenderTypeOption({
        metaData,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormArticleRenderTypeSelect({
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
      return renderArticleRenderTypeOption({
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

export function renderCustomArticleRenderTypeRadio({
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
      return renderArticleRenderTypeRadio({
        metaData,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormArticleRenderTypeRadio({
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
      return renderArticleRenderTypeRadio({
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
