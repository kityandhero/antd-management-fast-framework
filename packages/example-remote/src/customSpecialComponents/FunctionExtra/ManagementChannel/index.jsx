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

export function refitManagementChannelList({ withUnlimited = true }) {
  const { managementChannelList: list } = {
    managementChannelList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getManagementChannelName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitManagementChannelList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderManagementChannelOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitManagementChannelList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderManagementChannelRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitManagementChannelList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchManagementChannelSelect({
  withUnlimited = true,
  label = '目标系统',
  name = 'channel',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitManagementChannelList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomManagementChannelSelect({
  label = '目标系统',
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
    list: refitManagementChannelList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormManagementChannelSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '目标系统',
  formItemLayout = null,
  required = true,
  name = 'channel',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitManagementChannelList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomManagementChannelRadio({
  label = '目标系统',
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
    list: refitManagementChannelList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormManagementChannelRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '目标系统',
  formItemLayout = null,
  required = true,
  name = 'channel',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitManagementChannelList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
