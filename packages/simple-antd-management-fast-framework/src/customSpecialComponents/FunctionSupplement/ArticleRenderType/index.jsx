import {
  refitCommonData,
  isInvalid,
  searchFromList,
  isUndefined,
  isNull,
} from 'antd-management-fast-framework/lib/utils/tools';
import { unlimitedWithStringFlag } from 'antd-management-fast-framework/lib/utils/constants';
import {
  buildRadioItem,
  buildCustomRadio,
  buildFormRadio,
  buildOptionItem,
  buildCustomSelect,
  buildFormSelect,
  buildSearchFormSelect,
} from 'antd-management-fast-framework/lib/customComponents/FunctionComponent';

import { unknownLabel } from '@/customConfig/constants';

export function refitArticleRenderTypeList({ global, withUnlimited = true }) {
  const { articleRenderTypeList: list } = { ...{ articleRenderTypeList: [] }, ...(global || {}) };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getArticleRenderTypeName({ global, value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitArticleRenderTypeList({ global, withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderArticleRenderTypeOption({
  global,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitArticleRenderTypeList({ global, withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderArticleRenderTypeRadio({
  global,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitArticleRenderTypeList({ global, withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchArticleRenderTypeSelect({
  global = null,
  withUnlimited = true,
  label = '渲染模式',
  name = 'renderType',
  helper = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    options: renderArticleRenderTypeOption({ global, withUnlimited, adjustListDataCallback }),
    helper,
  });
}

export function renderCustomArticleRenderTypeSelect({
  global = null,
  label = '渲染模式',
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
      return renderArticleRenderTypeOption({
        global,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    otherProps,
  });
}

export function renderFormArticleRenderTypeSelect({
  global = null,
  helper = null,
  onChangeCallback,
  label = '渲染模式',
  formItemLayout = null,
  required = true,
  name = 'renderType',
  otherProps = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    renderItemFunction: () => {
      return renderArticleRenderTypeOption({
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

export function renderCustomArticleRenderTypeRadio({
  global = null,
  label = '渲染模式',
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
      return renderArticleRenderTypeRadio({
        global,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    otherProps,
  });
}

export function renderFormArticleRenderTypeRadio({
  global = null,
  helper = null,
  onChangeCallback,
  label = '渲染模式',
  formItemLayout = null,
  required = true,
  name = 'renderType',
  otherProps = null,
  adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    renderItemFunction: () => {
      return renderArticleRenderTypeRadio({
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
