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
  whetherList,
} from 'antd-management-fast-common';

import { buildOptionItem, buildRadioItem } from '../../Function';
import {
  buildFormRadio,
  buildFormSelect,
  buildSearchFormSelect,
} from '../../FunctionComponent';

export function refitWhetherList({ withUnlimited = true }) {
  const { whetherList: list } = {
    whetherList: whetherList,
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
  otherProps: otherProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    renderItem: () => {
      return renderWhetherOption({ withUnlimited: false });
    },
    helper,
    onChangeCallback,
    formItemLayout,
    required,
    otherProps: otherProperties,
  });
}

export function renderFormWhetherRadio({
  helper = null,
  onChangeCallback,
  label = '调用时设置',
  formItemLayout = null,
  required = true,
  name = 'whether',
  otherProps: otherProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    renderItem: () => {
      return renderWhetherRadio({ withUnlimited: false });
    },
    helper,
    onChangeCallback,
    formItemLayout,
    required,
    otherProps: otherProperties,
  });
}
