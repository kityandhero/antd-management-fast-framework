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
  buildCustomRadio,
  buildCustomSelect,
  buildFormRadio,
  buildFormSelect,
  buildOptionItem,
  buildRadioItem,
  buildSearchFormSelect,
} from 'antd-management-fast-component';

// eslint-disable-next-line no-unused-vars
export function refitRankList({ metaData, withUnlimited = true }) {
  const { rankList: list } = { rankList: [], ...global };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getRankName({ metaData, value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitRankList({ metaData, withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderRankOption({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitRankList({ metaData, withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderRankRadio({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitRankList({ metaData, withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchRankSelect({
  metaData = null,
  withUnlimited = true,
  label = '商品分类',
  name = 'rankId',
  helper = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    options: renderRankOption({
      metaData,
      withUnlimited,
      adjustListDataCallback,
    }),
    helper,
  });
}

export function renderCustomRankSelect({
  metaData = null,
  label = '商品分类',
  separator = '：',
  size = 'middle',
  onChangeCallback,
  otherProps: otherProperties = null,
  adjustListDataCallback = null,
}) {
  return buildCustomSelect({
    label,
    separator,
    size,
    renderItem: () => {
      return renderRankOption({
        metaData,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    otherProps: otherProperties,
  });
}

export function renderFormRankSelect({
  metaData = null,
  helper = null,
  onChangeCallback,
  label = '商品分类',
  formItemLayout = null,
  required = true,
  name = 'rankId',
  otherProps: otherProperties = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    renderItem: () => {
      return renderRankOption({
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

export function renderCustomRankRadio({
  metaData = null,
  label = '商品分类',
  separator = '：',
  size = 'middle',
  onChangeCallback,
  otherProps: otherProperties = null,
  adjustListDataCallback = null,
}) {
  return buildCustomRadio({
    label,
    separator,
    size,
    renderItem: () => {
      return renderRankRadio({
        metaData,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    otherProps: otherProperties,
  });
}

export function renderFormRankRadio({
  metaData = null,
  helper = null,
  onChangeCallback,
  label = '商品分类',
  formItemLayout = null,
  required = true,
  name = 'rankId',
  otherProps: otherProperties = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    renderItem: () => {
      return renderRankRadio({
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
