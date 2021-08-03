import {
  getDerivedStateFromPropsForUrlParams,
  refitCommonData,
  isInvalid,
  searchFromList,
  isUndefined,
  isNull,
} from 'antd-management-fast-framework/lib/utils/tools';
import { unlimitedWithStringFlag } from 'antd-management-fast-framework/lib/utils/constants';
import {
  buildFormRadio,
  buildFormOption,
} from 'antd-management-fast-framework/lib/customComponents/FunctionComponent';

export function refitRankList({ global, withUnlimited = true }) {
  const list = (global || null) == null ? [] : global.rankList || [];

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

renderRankOption = ({ global, withUnlimited = true, adjustListDataCallback = null }) => {
  const listData = refitRankList({ global, withUnlimited });
  return buildFormRadio(listData, adjustListDataCallback);
};

renderRankRadio = (withUnlimited = true, adjustListDataCallback = null) => {
  const listData = this.rankList(withUnlimited);

  return this.renderFormRadioCore(listData, adjustListDataCallback);
};

renderSearchRankSelect = (
  withUnlimited = true,
  label = '商品分类',
  name = 'rankId',
  helper = null,
) => {
  const title = label || unknownLabel;

  return this.renderSearchFormSelect(title, name, this.renderRankOption(withUnlimited), helper);
};

renderFormRankSelect = (
  helper = null,
  onChangeCallback,
  label = '商品分类',
  formItemLayout = null,
  required = true,
  name = 'rankId',
  otherProps = null,
) => {
  const title = label || unknownLabel;

  return this.renderFormSelect(
    title,
    name,
    () => {
      return this.renderRankOption(false);
    },
    helper,
    onChangeCallback,
    formItemLayout,
    required,
    otherProps,
  );
};

renderFormRankRadio = (
  helper = null,
  onChangeCallback,
  label = '商品分类',
  formItemLayout = null,
  required = true,
  name = 'rankId',
  otherProps = null,
) => {
  const title = label || unknownLabel;

  return this.renderFormRadio(
    title,
    name,
    () => {
      return this.renderRankRadio(false);
    },
    helper,
    onChangeCallback,
    formItemLayout,
    required,
    otherProps,
  );
};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
