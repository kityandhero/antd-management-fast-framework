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

export function refitWhetherList({ global, withUnlimited = true }) {
  const { whetherList: list } = { ...{ whetherList: [] }, ...(global || {}) };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getWhetherName({ global, value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitWhetherList({ global, withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderWhetherOption({ global, withUnlimited = true, adjustListDataCallback = null }) {
  const listData = refitWhetherList({ global, withUnlimited });

  return buildFormOptionItem({ list: listData, adjustListDataCallback });
}

export function renderWhetherRadio({ global, withUnlimited = true, adjustListDataCallback = null }) {
  const listData = refitWhetherList({ global, withUnlimited });

  return buildFormRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchWhetherSelect({
  global = null,
  withUnlimited = true,
  label = '调用时设置',
  name = 'whether',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    options: renderWhetherOption({ global, withUnlimited }),
    helper,
  });
}

export function renderFormWhetherSelect({
  global = null,
  helper = null,
  onChangeCallback,
  label = '调用时设置',
  formItemLayout = null,
  required = true,
  name = 'whether',
  otherProps = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    renderItemFunction: () => {
      return renderWhetherOption({ global, withUnlimited: false });
    },
    helper,
    onChangeCallback,
    formItemLayout,
    required,
    otherProps,
  });
}

export function renderFormWhetherRadio({
  global = null,
  helper = null,
  onChangeCallback,
  label = '调用时设置',
  formItemLayout = null,
  required = true,
  name = 'whether',
  otherProps = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    renderItemFunction: () => {
      return renderWhetherRadio({ global, withUnlimited: false });
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
