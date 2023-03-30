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
  convertOptionOrRadioData,
} from 'antd-management-fast-component';
import { getMergeMetaData } from 'antd-management-fast-framework';

export function refitScoreRankList({ withUnlimited = true }) {
  const { scoreRankList: list } = {
    scoreRankList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getScoreRankName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitScoreRankList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderScoreRankOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitScoreRankList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderScoreRankRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitScoreRankList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchScoreRankSelect({
  withUnlimited = true,
  label = '商品分类',
  name = 'scoreRankId',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitScoreRankList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomScoreRankSelect({
  label = '商品分类',
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
    list: refitScoreRankList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormScoreRankSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '商品分类',
  formItemLayout = null,
  required = true,
  name = 'scoreRankId',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitScoreRankList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomScoreRankRadio({
  label = '商品分类',
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
    list: refitScoreRankList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormScoreRankRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '商品分类',
  formItemLayout = null,
  required = true,
  name = 'scoreRankId',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitScoreRankList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
