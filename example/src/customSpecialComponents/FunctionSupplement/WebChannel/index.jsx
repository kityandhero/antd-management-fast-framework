import {
  refitCommonData,
  isInvalid,
  searchFromList,
  isUndefined,
  isNull,
} from 'antd-management-fast-framework/lib/utils/tools';
import { unlimitedWithStringFlag } from 'antd-management-fast-framework/lib/utils/constants';
import {
  buildFormRadioItem,
  buildFormRadio,
  buildFormOptionItem,
  buildFormSelect,
  buildSearchFormSelect,
} from 'antd-management-fast-framework/lib/customComponents/FunctionComponent';

import { unknownLabel } from '@/customConfig/config';

export function refitWebChannelList({ global, withUnlimited = true }) {
  const { rankList: list } = { ...{ rankList: [] }, ...(global || {}) };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getWebChannelName({ global, value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitWebChannelList({ global, withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderWebChannelOption({ global, withUnlimited = true, adjustListDataCallback = null }) {
  const listData = refitWebChannelList({ global, withUnlimited });

  return buildFormOptionItem({ list: listData, adjustListDataCallback });
}

export function renderWebChannelRadio({ global, withUnlimited = true, adjustListDataCallback = null }) {
  const listData = refitWebChannelList({ global, withUnlimited });

  return buildFormRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchWebChannelSelect({
  global = null,
  withUnlimited = true,
  label = 'Web渠道',
  name = 'webChannelId',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    options: renderWebChannelOption({ global, withUnlimited }),
    helper,
  });
}

export function renderFormWebChannelSelect({
  global = null,
  helper = null,
  onChangeCallback,
  label = 'Web渠道',
  formItemLayout = null,
  required = true,
  name = 'webChannelId',
  otherProps = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    renderItemFunction: () => {
      return renderWebChannelOption({ global, withUnlimited: false });
    },
    helper,
    onChangeCallback,
    formItemLayout,
    required,
    otherProps,
  });
}

export function renderFormWebChannelRadio({
  global = null,
  helper = null,
  onChangeCallback,
  label = 'Web渠道',
  formItemLayout = null,
  required = true,
  name = 'webChannelId',
  otherProps = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    renderItemFunction: () => {
      return renderWebChannelRadio({ global, withUnlimited: false });
    },
    helper,
    onChangeCallback,
    formItemLayout,
    required,
    otherProps,
  });
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
