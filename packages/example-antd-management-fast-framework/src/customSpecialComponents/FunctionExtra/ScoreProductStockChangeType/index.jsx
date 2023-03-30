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

export function refitScoreProductStockChangeTypeList({ withUnlimited = true }) {
  const { scoreProductStockChangeTypeList: list } = {
    scoreProductStockChangeTypeList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getScoreProductStockChangeTypeName({
  value,
  defaultValue = '',
}) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitScoreProductStockChangeTypeList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderScoreProductStockChangeTypeOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitScoreProductStockChangeTypeList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderScoreProductStockChangeTypeRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitScoreProductStockChangeTypeList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchScoreProductStockChangeTypeSelect({
  withUnlimited = true,
  label = '变更类型',
  name = 'changeType',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitScoreProductStockChangeTypeList({ withUnlimited }),
    dataConvert: (o) => o,
  });
}

export function renderCustomScoreProductStockChangeTypeSelect({
  label = '变更类型',
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
    list: refitScoreProductStockChangeTypeList({ withUnlimited: true }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormScoreProductStockChangeTypeSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '变更类型',
  formItemLayout = null,
  required = true,
  name = 'changeType',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitScoreProductStockChangeTypeList({ withUnlimited: false }),
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

export function renderCustomScoreProductStockChangeTypeRadio({
  label = '变更类型',
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
    list: refitScoreProductStockChangeTypeList({ withUnlimited: true }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormScoreProductStockChangeTypeRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '变更类型',
  formItemLayout = null,
  required = true,
  name = 'changeType',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitScoreProductStockChangeTypeList({ withUnlimited: false }),
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
