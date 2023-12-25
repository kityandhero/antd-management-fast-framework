/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const templateContent = `
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
} from 'antd-management-fast-common';
import {
  buildDropdownMenu,
  buildFlexRadio,
  buildFlexSelect,
  buildFormRadio,
  buildFormSelect,
  buildOptionItem,
  buildRadioItem,
  buildSearchFormSelect,
  convertOptionOrRadioData,
} from 'antd-management-fast-component';
import { getMergeMetaData } from 'antd-management-fast-framework';

export function refit<%= o.functionSegment %>List({ withUnlimited = true }) {
  const { <%= o.defineName %>List: list } = {
    <%= o.defineName %>List: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function get<%= o.functionSegment %>Name({ value, defaultValue = '' }) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    \`\${isNull(isUndefined(value) ? null : value) ? '' : value}\`,
    refit<%= o.functionSegment %>List({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function render<%= o.functionSegment %>Option({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refit<%= o.functionSegment %>List({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function render<%= o.functionSegment %>Radio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refit<%= o.functionSegment %>List({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearch<%= o.functionSegment %>Select({
  withUnlimited = true,
  label = '<%= o.label %>',
  name = '<%= o.name %>',
  helper = null,
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  const listData = refit<%= o.functionSegment %>List({
    withUnlimited,
  });

  const list =
    adjustListDataCallback == null
      ? listData
      : adjustListDataCallback(listData);

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: list,
    dataConvert: convertOptionOrRadioData,
    hidden,
    addonBefore,
    addonBeforeStyle,
    addonAfter,
    addonAfterStyle,
  });
}

export function renderCustom<%= o.functionSegment %>Select({
  style = {},
  label = '<%= o.label %>',
  separator = ':',
  size = 'middle',
  onChange: onChangeCallback,
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const listData = refit<%= o.functionSegment %>List({
    withUnlimited: true,
  });

  const list =
    adjustListDataCallback == null
      ? listData
      : adjustListDataCallback(listData);

  return buildFlexSelect({
    style,
    label,
    defaultValue: null,
    separator,
    size,
    list: list,
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function render<%= o.functionSegment %>DropDown({
  label = '<%= o.label %>',
  placement = 'bottomRight',
  icon = null,
  size = 'middle',
  onClick: onClickCallback,
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const listData = refit<%= o.functionSegment %>List({
    withUnlimited: false,
  });

  const list =
    adjustListDataCallback == null
      ? listData
      : adjustListDataCallback(listData);

  return buildDropdownMenu({
    label,
    placement,
    icon,
    size,
    list: list,
    dataConvert: null,
    onClick: onClickCallback,
    innerProps: innerProperties || null,
  });
}

export function renderForm<%= o.functionSegment %>Select({
  helper = null,
  onChange: onChangeCallback,
  label = '<%= o.label %>',
  formItemLayout = null,
  required = true,
  name = '<%= o.name %>',
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
}) {
  const title = label || unknownLabel;

  const listData = refit<%= o.functionSegment %>List({
    withUnlimited: false,
  });

  const list =
    adjustListDataCallback == null
      ? listData
      : adjustListDataCallback(listData);

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: list,
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
    hidden,
    addonBefore,
    addonBeforeStyle,
    addonAfter,
    addonAfterStyle,
  });
}

export function renderCustom<%= o.functionSegment %>Radio({
  label = '<%= o.label %>',
  separator = ': ',
  size = 'middle',
  onChange: onChangeCallback,
  innerProps: innerProperties = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const listData = refit<%= o.functionSegment %>List({
    withUnlimited: true,
  });

  const list =
    adjustListDataCallback == null
      ? listData
      : adjustListDataCallback(listData);

  return buildFlexRadio({
    label,
    defaultValue: null,
    separator,
    size,
    list: list,
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderForm<%= o.functionSegment %>Radio({
  helper = null,
  onChange: onChangeCallback,
  label = '<%= o.label %>',
  formItemLayout = null,
  required = true,
  name = '<%= o.name %>',
  innerProps: innerProperties = null,
  hidden = false,
  addonBefore = null,
  addonBeforeStyle = null,
  addonAfter = null,
  addonAfterStyle = null,
  adjustListData: adjustListDataCallback = null,
}) {
  const title = label || unknownLabel;

  const listData = refit<%= o.functionSegment %>List({
    withUnlimited: false,
  });

  const list =
    adjustListDataCallback == null
      ? listData
      : adjustListDataCallback(listData);

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: list,
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
    hidden,
    addonBefore,
    addonBeforeStyle,
    addonAfter,
    addonAfterStyle,
  });
}
`;

module.exports = {
  templateContent,
};
