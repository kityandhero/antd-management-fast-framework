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
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refit<%= o.functionSegment %>List({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustom<%= o.functionSegment %>Select({
  label = '<%= o.label %>',
  separator = ':',
  size = 'middle',
  onChange: onChangeCallback,
  innerProps: innerProperties = null,
}) {
  return buildFlexSelect({
    label,
    defaultValue: null,
    separator,
    size,
    list: refit<%= o.functionSegment %>List({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
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
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refit<%= o.functionSegment %>List({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustom<%= o.functionSegment %>Radio({
  label = '<%= o.label %>',
  separator = ': ',
  size = 'middle',
  onChange: onChangeCallback,
  innerProps: innerProperties = null,
}) {
  return buildFlexRadio({
    label,
    defaultValue: null,
    separator,
    size,
    list: refit<%= o.functionSegment %>List({ withUnlimited: true }),
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
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refit<%= o.functionSegment %>List({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
`;

module.exports = {
  templateContent,
};
