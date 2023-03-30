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

export function refitScoreBusinessModeList({ withUnlimited = true }) {
  const { scoreBusinessModeList: list } = {
    scoreBusinessModeList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getScoreBusinessModeName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitScoreBusinessModeList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderScoreBusinessModeOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitScoreBusinessModeList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderScoreBusinessModeRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitScoreBusinessModeList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchScoreBusinessModeSelect({
  withUnlimited = true,
  label = '业务范围',
  name = 'businessMode',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitScoreBusinessModeList({ withUnlimited }),
    dataConvert: (o) => o,
  });
}

export function renderCustomScoreBusinessModeSelect({
  label = '业务范围',
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
    list: refitScoreBusinessModeList({ withUnlimited: true }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormScoreBusinessModeSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '业务范围',
  formItemLayout = null,
  required = true,
  name = 'businessMode',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitScoreBusinessModeList({ withUnlimited: false }),
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

export function renderCustomScoreBusinessModeRadio({
  label = '业务范围',
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
    list: refitScoreBusinessModeList({ withUnlimited: true }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormScoreBusinessModeRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '业务范围',
  formItemLayout = null,
  required = true,
  name = 'businessMode',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitScoreBusinessModeList({ withUnlimited: false }),
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
