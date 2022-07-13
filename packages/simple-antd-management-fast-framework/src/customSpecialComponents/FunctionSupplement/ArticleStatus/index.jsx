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

export function refitArticleStatusList({ global, withUnlimited = true }) {
  const { articleStatusList: list } = { ...{ articleStatusList: [] }, ...(global || {}) };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getArticleStatusName({ global, value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitArticleStatusList({ global, withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderArticleStatusOption({
  global,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitArticleStatusList({ global, withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderArticleStatusRadio({
  global,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitArticleStatusList({ global, withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchArticleStatusSelect({
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
    options: renderArticleStatusOption({ global, withUnlimited, adjustListDataCallback }),
    helper,
  });
}

export function renderCustomArticleStatusSelect({
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
      return renderArticleStatusOption({
        global,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    otherProps,
  });
}

export function renderFormArticleStatusSelect({
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
      return renderArticleStatusOption({
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

export function renderCustomArticleStatusRadio({
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
      return renderArticleStatusRadio({
        global,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    otherProps,
  });
}

export function renderFormArticleStatusRadio({
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
      return renderArticleStatusRadio({
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
