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

export function refitWeChatMessageRecordSendStatusList({
  withUnlimited = true,
}) {
  const { weChatMessageRecordSendStatusList: list } = {
    weChatMessageRecordSendStatusList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getWeChatMessageRecordSendStatusName({
  value,
  defaultValue = '',
}) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitWeChatMessageRecordSendStatusList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderWeChatMessageRecordSendStatusOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitWeChatMessageRecordSendStatusList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderWeChatMessageRecordSendStatusRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitWeChatMessageRecordSendStatusList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchWeChatMessageRecordSendStatusSelect({
  withUnlimited = true,
  label = '发送状态',
  name = 'status',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitWeChatMessageRecordSendStatusList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomWeChatMessageRecordSendStatusSelect({
  label = '发送状态',
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
    list: refitWeChatMessageRecordSendStatusList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormWeChatMessageRecordSendStatusSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '发送状态',
  formItemLayout = null,
  required = true,
  name = 'status',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitWeChatMessageRecordSendStatusList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomWeChatMessageRecordSendStatusRadio({
  label = '发送状态',
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
    list: refitWeChatMessageRecordSendStatusList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormWeChatMessageRecordSendStatusRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '发送状态',
  formItemLayout = null,
  required = true,
  name = 'status',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitWeChatMessageRecordSendStatusList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
