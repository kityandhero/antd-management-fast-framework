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

export function refitMediaTypeList({ metaData, withUnlimited = true }) {
  const { mediaTypeList: list } = {
    mediaTypeList: [],
    ...metaData,
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getMediaTypeName({ metaData, value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitMediaTypeList({ metaData, withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderMediaTypeOption({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitMediaTypeList({ metaData, withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderMediaTypeRadio({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitMediaTypeList({ metaData, withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchMediaTypeSelect({
  metaData = null,
  withUnlimited = true,
  label = '媒体类型',
  name = 'mediaType',
  helper = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    options: renderMediaTypeOption({
      metaData,
      withUnlimited,
      adjustListDataCallback,
    }),
    helper,
  });
}

export function renderCustomMediaTypeSelect({
  metaData = null,
  label = '媒体类型',
  value = null,
  separator = ':',
  size = 'middle',
  onChangeCallback,
  otherProps: otherProperties = null,
  adjustListDataCallback = null,
}) {
  return buildFlexSelect({
    label,
    value,
    separator,
    size,
    renderItem: () => {
      return renderMediaTypeOption({
        metaData,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    otherProps: otherProperties,
  });
}

export function renderFormMediaTypeSelect({
  metaData = null,
  helper = null,
  onChangeCallback,
  label = '媒体类型',
  formItemLayout = null,
  required = true,
  name = 'mediaType',
  otherProps: otherProperties = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    renderItem: () => {
      return renderMediaTypeOption({
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

export function renderCustomMediaTypeRadio({
  metaData = null,
  label = '媒体类型',
  value = null,
  separator = ':',
  size = 'middle',
  onChangeCallback,
  otherProps: otherProperties = null,
  adjustListDataCallback = null,
}) {
  return buildFlexRadio({
    label,
    value,
    separator,
    size,
    renderItem: () => {
      return renderMediaTypeRadio({
        metaData,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    otherProps: otherProperties,
  });
}

export function renderFormMediaTypeRadio({
  metaData = null,
  helper = null,
  onChangeCallback,
  label = '媒体类型',
  formItemLayout = null,
  required = true,
  name = 'mediaType',
  otherProps: otherProperties = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    renderItem: () => {
      return renderMediaTypeRadio({
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
