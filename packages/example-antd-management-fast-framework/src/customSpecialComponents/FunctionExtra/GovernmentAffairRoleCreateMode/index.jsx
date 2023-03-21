import {
  isInvalid,
  isNull,
  isUndefined,
  refitCommonData,
  searchFromList,
} from 'easy-soft-utility';

import {
  getMetaData,
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

export function refitGovernmentAffairRoleCreateModeList({
  withUnlimited = true,
}) {
  const { governmentAffairRoleCreateModeList: list } = {
    governmentAffairRoleCreateModeList: [],
    ...getMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getGovernmentAffairRoleCreateModeName({
  value,
  defaultValue = '',
}) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitGovernmentAffairRoleCreateModeList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderGovernmentAffairRoleCreateModeOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitGovernmentAffairRoleCreateModeList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderGovernmentAffairRoleCreateModeRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitGovernmentAffairRoleCreateModeList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchGovernmentAffairRoleCreateModeSelect({
  withUnlimited = true,
  label = '创建模式',
  name = 'createMode',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitGovernmentAffairRoleCreateModeList({ withUnlimited }),
    dataConvert: (o) => o,
  });
}

export function renderCustomGovernmentAffairRoleCreateModeSelect({
  label = '创建模式',
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
    list: refitGovernmentAffairRoleCreateModeList({ withUnlimited: true }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormGovernmentAffairRoleCreateModeSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '创建模式',
  formItemLayout = null,
  required = true,
  name = 'createMode',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitGovernmentAffairRoleCreateModeList({ withUnlimited: false }),
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

export function renderCustomGovernmentAffairRoleCreateModeRadio({
  label = '创建模式',
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
    list: refitGovernmentAffairRoleCreateModeList({ withUnlimited: true }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormGovernmentAffairRoleCreateModeRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '创建模式',
  formItemLayout = null,
  required = true,
  name = 'createMode',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitGovernmentAffairRoleCreateModeList({ withUnlimited: false }),
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
