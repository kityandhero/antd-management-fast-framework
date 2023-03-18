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

export function refitGovernmentAffairRoleCreateModeList({
  metaData,
  withUnlimited = true,
}) {
  const { governmentAffairRoleCreateModeList: list } = {
    governmentAffairRoleCreateModeList: [],
    ...metaData,
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getGovernmentAffairRoleCreateModeName({
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
    refitGovernmentAffairRoleCreateModeList({ metaData, withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderGovernmentAffairRoleCreateModeOption({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitGovernmentAffairRoleCreateModeList({
    metaData,
    withUnlimited,
  });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderGovernmentAffairRoleCreateModeRadio({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitGovernmentAffairRoleCreateModeList({
    metaData,
    withUnlimited,
  });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchGovernmentAffairRoleCreateModeSelect({
  metaData = null,
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
    list: refitGovernmentAffairRoleCreateModeList({ metaData, withUnlimited }),
    dataConvert: (o) => o,
  });
}

export function renderCustomGovernmentAffairRoleCreateModeSelect({
  metaData = null,
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
    list: refitGovernmentAffairRoleCreateModeList({
      metaData,
      withUnlimited: true,
    }),
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
  metaData = null,
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
    list: refitGovernmentAffairRoleCreateModeList({
      metaData,
      withUnlimited: false,
    }),
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
  metaData = null,
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
    list: refitGovernmentAffairRoleCreateModeList({
      metaData,
      withUnlimited: true,
    }),
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
  metaData = null,
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
    list: refitGovernmentAffairRoleCreateModeList({
      metaData,
      withUnlimited: false,
    }),
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
