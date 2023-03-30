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

export function refitWebChannelList({ withUnlimited = true }) {
  const { webChannelList: list } = {
    webChannelList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getWebChannelName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitWebChannelList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderWebChannelOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitWebChannelList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderWebChannelRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitWebChannelList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchWebChannelSelect({
  withUnlimited = true,
  label = 'Web渠道',
  name = 'webChannelId',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitWebChannelList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomWebChannelSelect({
  label = 'Web渠道',
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
    list: refitWebChannelList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormWebChannelSelect({
  helper = null,
  onChange: onChangeCallback,
  label = 'Web渠道',
  formItemLayout = null,
  required = true,
  name = 'webChannelId',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitWebChannelList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomWebChannelRadio({
  label = 'Web渠道',
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
    list: refitWebChannelList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormWebChannelRadio({
  helper = null,
  onChange: onChangeCallback,
  label = 'Web渠道',
  formItemLayout = null,
  required = true,
  name = 'webChannelId',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitWebChannelList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
