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

export function refitWebChannelList({ metaData, withUnlimited = true }) {
  const { webChannelList: list } = {
    webChannelList: [],
    ...metaData,
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getWebChannelName({ metaData, value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitWebChannelList({ metaData, withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderWebChannelOption({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitWebChannelList({ metaData, withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderWebChannelRadio({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitWebChannelList({ metaData, withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchWebChannelSelect({
  metaData = null,
  withUnlimited = true,
  label = 'Web渠道',
  name = 'channel',
  helper = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    options: renderWebChannelOption({
      metaData,
      withUnlimited,
      adjustListDataCallback,
    }),
    helper,
  });
}

export function renderCustomWebChannelSelect({
  metaData = null,
  label = 'Web渠道',
  separator = ':',
  size = 'middle',
  onChangeCallback,
  otherProps: otherProperties = null,
  adjustListDataCallback = null,
}) {
  return buildFlexSelect({
    label,
    separator,
    size,
    renderItem: () => {
      return renderWebChannelOption({
        metaData,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    otherProps: otherProperties,
  });
}

export function renderFormWebChannelSelect({
  metaData = null,
  helper = null,
  onChangeCallback,
  label = 'Web渠道',
  formItemLayout = null,
  required = true,
  name = 'channel',
  otherProps: otherProperties = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    renderItem: () => {
      return renderWebChannelOption({
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

export function renderCustomWebChannelRadio({
  metaData = null,
  label = 'Web渠道',
  separator = ':',
  size = 'middle',
  onChangeCallback,
  otherProps: otherProperties = null,
  adjustListDataCallback = null,
}) {
  return buildFlexRadio({
    label,
    separator,
    size,
    renderItem: () => {
      return renderWebChannelRadio({
        metaData,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    otherProps: otherProperties,
  });
}

export function renderFormWebChannelRadio({
  metaData = null,
  helper = null,
  onChangeCallback,
  label = 'Web渠道',
  formItemLayout = null,
  required = true,
  name = 'channel',
  otherProps: otherProperties = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    renderItem: () => {
      return renderWebChannelRadio({
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
