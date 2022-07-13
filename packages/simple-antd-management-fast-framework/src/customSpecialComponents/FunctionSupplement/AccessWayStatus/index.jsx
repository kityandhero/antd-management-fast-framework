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

export function refitAccessWayStatusList({ global, withUnlimited = true }) {
  const { accessWayStatusList: list } = { ...{ accessWayStatusList: [] }, ...(global || {}) };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getAccessWayStatusName({ global, value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitAccessWayStatusList({ global, withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderAccessWayStatusOption({
  global,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitAccessWayStatusList({ global, withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderAccessWayStatusRadio({
  global,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitAccessWayStatusList({ global, withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchAccessWayStatusSelect({
  global = null,
  withUnlimited = true,
  label = '状态',
  name = 'status',
  helper = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    options: renderAccessWayStatusOption({ global, withUnlimited, adjustListDataCallback }),
    helper,
  });
}

export function renderCustomAccessWayStatusSelect({
  global = null,
  label = '状态',
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
      return renderAccessWayStatusOption({
        global,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    otherProps,
  });
}

export function renderFormAccessWayStatusSelect({
  global = null,
  helper = null,
  onChangeCallback,
  label = '状态',
  formItemLayout = null,
  required = true,
  name = 'status',
  otherProps = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    renderItemFunction: () => {
      return renderAccessWayStatusOption({
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

export function renderCustomAccessWayStatusRadio({
  global = null,
  label = '状态',
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
      return renderAccessWayStatusRadio({
        global,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    otherProps,
  });
}

export function renderFormAccessWayStatusRadio({
  global = null,
  helper = null,
  onChangeCallback,
  label = '状态',
  formItemLayout = null,
  required = true,
  name = 'status',
  otherProps = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    renderItemFunction: () => {
      return renderAccessWayStatusRadio({
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
