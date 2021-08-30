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

import { unknownLabel } from '@/customConfig/constants';

export function refitRankList({ global, withUnlimited = true }) {
  const { rankList: list } = { ...{ rankList: [] }, ...(global || {}) };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getRankName({ global, value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitRankList({ global, withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderRankOption({ global, withUnlimited = true, adjustListDataCallback = null }) {
  const listData = refitRankList({ global, withUnlimited });

  return buildFormOptionItem({ list: listData, adjustListDataCallback });
}

export function renderRankRadio({ global, withUnlimited = true, adjustListDataCallback = null }) {
  const listData = refitRankList({ global, withUnlimited });

  return buildFormRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchRankSelect(
  global,
  withUnlimited = true,
  label = '商品分类',
  name = 'rankId',
  helper = null,
) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    options: renderRankOption({ global, withUnlimited }),
    helper,
  });
}

export function renderFormRankSelect(
  helper = null,
  onChangeCallback,
  label = '商品分类',
  formItemLayout = null,
  required = true,
  name = 'rankId',
  otherProps = null,
) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    renderItemFunction: () => {
      return renderRankOption({ global, withUnlimited: false });
    },
    helper,
    onChangeCallback,
    formItemLayout,
    required,
    otherProps,
  });
}

export function renderFormRankRadio(
  helper = null,
  onChangeCallback,
  label = '商品分类',
  formItemLayout = null,
  required = true,
  name = 'rankId',
  otherProps = null,
) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    renderItemFunction: () => {
      return renderRankRadio({ global, withUnlimited: false });
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