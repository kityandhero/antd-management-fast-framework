import {
  unknownLabel,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common/es/utils/constants';
import {
  isInvalid,
  isNull,
  isUndefined,
  refitCommonData,
  searchFromList,
} from 'antd-management-fast-common/es/utils/tools';
import {
  buildCustomRadio,
  buildCustomSelect,
  buildFormRadio,
  buildFormSelect,
  buildOptionItem,
  buildRadioItem,
  buildSearchFormSelect,
} from 'antd-management-fast-component/es/customComponents/FunctionComponent';

export function refitArticleRenderTypeList({ metaData, withUnlimited = true }) {
  const { articleRenderTypeList: list } = {
    ...{ articleRenderTypeList: [] },
    ...(metaData || {}),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getArticleRenderTypeName({
  metaData,
  value,
  defaultValue = '',
}) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitArticleRenderTypeList({ metaData, withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderArticleRenderTypeOption({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitArticleRenderTypeList({ metaData, withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderArticleRenderTypeRadio({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitArticleRenderTypeList({ metaData, withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchArticleRenderTypeSelect({
  metaData = null,
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
    options: renderArticleRenderTypeOption({
      metaData,
      withUnlimited,
      adjustListDataCallback,
    }),
    helper,
  });
}

export function renderCustomArticleRenderTypeSelect({
  metaData = null,
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
        metaData,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    otherProps,
  });
}

export function renderFormArticleRenderTypeSelect({
  metaData = null,
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
        metaData,
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
  metaData = null,
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
        metaData,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    otherProps,
  });
}

export function renderFormArticleRenderTypeRadio({
  metaData = null,
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
        metaData,
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
