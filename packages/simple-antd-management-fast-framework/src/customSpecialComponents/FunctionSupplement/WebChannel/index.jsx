import {
  buildCustomRadio,
  buildCustomSelect,
  buildFormRadio,
  buildFormSelect,
  buildOptionItem,
  buildRadioItem,
  buildSearchFormSelect,
} from 'antd-management-fast-framework/es/customComponents/FunctionComponent';
import { unlimitedWithStringFlag } from 'antd-management-fast-framework/es/utils/constants';
import {
  isInvalid,
  isNull,
  isUndefined,
  refitCommonData,
  searchFromList,
} from 'antd-management-fast-framework/es/utils/tools';

import { unknownLabel } from '@/customConfig/constants';

export function refitWebChannelList({ global, withUnlimited = true }) {
  const { webChannelList: list } = { ...{ webChannelList: [] }, ...(global || {}) };

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

export function renderWebChannelOption({
  global,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitWebChannelList({ global, withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderWebChannelRadio({
  global,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitWebChannelList({ global, withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchWebChannelSelect({
  global = null,
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
    options: renderWebChannelOption({ global, withUnlimited, adjustListDataCallback }),
    helper,
  });
}

export function renderCustomWebChannelSelect({
  global = null,
  label = 'Web渠道',
  separator = '：',
  size = 'middle',
  onChangeCallback,
  otherProps = null,
  adjustListDataCallback = null,
}) {
  return buildCustomSelect({
    label,
    separator,
    size,
    renderItemFunction: () => {
      return renderWebChannelOption({
        global,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    otherProps,
  });
}

export function renderFormWebChannelSelect({
  global = null,
  helper = null,
  onChangeCallback,
  label = 'Web渠道',
  formItemLayout = null,
  required = true,
  name = 'channel',
  otherProps = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    renderItemFunction: () => {
      return renderWebChannelOption({
        global,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    helper,
    onChangeCallback,
    formItemLayout,
    required,
    otherProps,
  });
}

export function renderCustomWebChannelRadio({
  global = null,
  label = 'Web渠道',
  separator = '：',
  size = 'middle',
  onChangeCallback,
  otherProps = null,
  adjustListDataCallback = null,
}) {
  return buildCustomRadio({
    label,
    separator,
    size,
    renderItemFunction: () => {
      return renderWebChannelRadio({
        global,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
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
  name = 'channel',
  otherProps = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    renderItemFunction: () => {
      return renderWebChannelRadio({
        global,
        withUnlimited: false,
        adjustListDataCallback,
      });
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
