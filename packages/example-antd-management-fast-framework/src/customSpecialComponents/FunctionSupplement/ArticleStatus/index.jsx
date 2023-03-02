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

export function refitArticleStatusList({ metaData, withUnlimited = true }) {
  const { articleStatusList: list } = {
    articleStatusList: [],
    ...metaData,
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getArticleStatusName({ metaData, value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitArticleStatusList({ metaData, withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderArticleStatusOption({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitArticleStatusList({ metaData, withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderArticleStatusRadio({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitArticleStatusList({ metaData, withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchArticleStatusSelect({
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
    list: refitArticleStatusList({ metaData, withUnlimited }),
    dataConvert: (o) => o,
  });
}

export function renderCustomArticleStatusSelect({
  metaData = null,
  label = '状态',
  separator = ':',
  size = 'middle',
  onChangeCallback,
  otherProps: otherProperties = null,
}) {
  return buildFlexSelect({
    label,
    defaultValue: null,
    separator,
    size,
    list: refitArticleStatusList({ metaData, withUnlimited: true }),
    // eslint-disable-next-line no-unused-vars
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { label: name, value: flag, disabled: false, ...o };
    },
    renderItem: null,
    onChange: onChangeCallback,
    otherProps: otherProperties,
  });
}

export function renderFormArticleStatusSelect({
  metaData = null,
  helper = null,
  onChangeCallback,
  label = '状态',
  formItemLayout = null,
  required = true,
  name = 'status',
  otherProps: otherProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitArticleStatusList({ metaData, withUnlimited: false }),
    // eslint-disable-next-line no-unused-vars
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { label: name, value: flag, disabled: false, ...o };
    },
    onChange: onChangeCallback,
    formItemLayout,
    required,
    otherProps: otherProperties,
  });
}

export function renderCustomArticleStatusRadio({
  metaData = null,
  label = '状态',
  separator = ': ',
  size = 'middle',
  onChangeCallback,
  otherProps: otherProperties = null,
}) {
  return buildFlexRadio({
    label,
    defaultValue: null,
    separator,
    size,
    list: refitArticleStatusList({ metaData, withUnlimited: true }),
    // eslint-disable-next-line no-unused-vars
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { label: name, value: flag, disabled: false, ...o };
    },
    renderItem: null,
    onChange: onChangeCallback,
    otherProps: otherProperties,
  });
}

export function renderFormArticleStatusRadio({
  metaData = null,
  helper = null,
  onChangeCallback,
  label = '状态',
  formItemLayout = null,
  required = true,
  name = 'status',
  otherProps: otherProperties = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    renderItem: () => {
      return renderArticleStatusRadio({
        metaData,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    helper,
    onChangeCallback,
    formItemLayout,
    required,
    otherProps: otherProperties,
  });
}
