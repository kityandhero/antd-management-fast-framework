﻿import {
  unknownLabel,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common/es/utils/constants';
import { modelCollection } from 'antd-management-fast-common/es/utils/globalModel';
import {
  isInvalid,
  refitCommonData,
  searchFromList,
} from 'antd-management-fast-common/es/utils/tools';
import {
  isNull,
  isUndefined,
} from 'antd-management-fast-common/es/utils/typeCheck';

import {
  buildFormRadio,
  buildFormSelect,
  buildOptionItem,
  buildRadioItem,
  buildSearchFormSelect,
} from '../../FunctionComponent';

export function refitWhetherList({ withUnlimited = true }) {
  const { whetherList: list } = {
    ...{ whetherList: [] },
    ...(modelCollection || {}),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getWhetherName({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitWhetherList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderWhetherOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitWhetherList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderWhetherRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitWhetherList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchWhetherSelect({
  withUnlimited = true,
  label = '调用时设置',
  name = 'whether',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    options: renderWhetherOption({ withUnlimited }),
    helper,
  });
}

export function renderFormWhetherSelect({
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
      return renderWhetherOption({ withUnlimited: false });
    },
    helper,
    onChangeCallback,
    formItemLayout,
    required,
    otherProps,
  });
}

export function renderFormWhetherRadio({
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
      return renderWhetherRadio({ withUnlimited: false });
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
