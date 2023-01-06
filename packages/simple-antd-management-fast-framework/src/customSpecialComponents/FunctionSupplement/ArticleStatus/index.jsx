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

export function refitArticleStatusList({ metaData, withUnlimited = true }) {
  const { articleStatusList: list } = {
    ...{ articleStatusList: [] },
    ...(metaData || {}),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getArticleStatusName({ metaData, value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitArticleStatusList({ metaData, withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderArticleStatusOption({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitArticleStatusList({ metaData, withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderArticleStatusRadio({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitArticleStatusList({ metaData, withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchArticleStatusSelect({
  metaData = null,
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
    options: renderArticleStatusOption({
      metaData,
      withUnlimited,
      adjustListDataCallback,
    }),
    helper,
  });
}

export function renderCustomArticleStatusSelect({
  metaData = null,
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
        metaData,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    otherProps,
  });
}

export function renderFormArticleStatusSelect({
  metaData = null,
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

export function renderCustomArticleStatusRadio({
  metaData = null,
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
        metaData,
        withUnlimited: false,
        adjustListDataCallback,
      });
    },
    onChangeCallback,
    otherProps,
  });
}

export function renderFormArticleStatusRadio({
  metaData = null,
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
