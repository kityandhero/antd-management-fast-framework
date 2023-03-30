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

export function refitArticleReminderPlanShowTargetList({
  withUnlimited = true,
}) {
  const { articleReminderPlanShowTargetList: list } = {
    articleReminderPlanShowTargetList: [],
    ...getMergeMetaData(),
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getArticleReminderPlanShowTargetName({
  value,
  defaultValue = '',
}) {
  if (isInvalid(value)) {
    return defaultValue;
  }

  const item = searchFromList(
    'flag',
    `${isNull(isUndefined(value) ? null : value) ? '' : value}`,
    refitArticleReminderPlanShowTargetList({ withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderArticleReminderPlanShowTargetOption({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitArticleReminderPlanShowTargetList({ withUnlimited });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderArticleReminderPlanShowTargetRadio({
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitArticleReminderPlanShowTargetList({ withUnlimited });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchArticleReminderPlanShowTargetSelect({
  withUnlimited = true,
  label = '显示目标',
  name = 'showTarget',
  helper = null,
}) {
  const title = label || unknownLabel;

  return buildSearchFormSelect({
    label: title,
    name,
    helper,
    list: refitArticleReminderPlanShowTargetList({ withUnlimited }),
    dataConvert: convertOptionOrRadioData,
  });
}

export function renderCustomArticleReminderPlanShowTargetSelect({
  label = '显示目标',
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
    list: refitArticleReminderPlanShowTargetList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormArticleReminderPlanShowTargetSelect({
  helper = null,
  onChange: onChangeCallback,
  label = '显示目标',
  formItemLayout = null,
  required = true,
  name = 'showTarget',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormSelect({
    label: title,
    name,
    helper,
    list: refitArticleReminderPlanShowTargetList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomArticleReminderPlanShowTargetRadio({
  label = '显示目标',
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
    list: refitArticleReminderPlanShowTargetList({ withUnlimited: true }),
    dataConvert: convertOptionOrRadioData,
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormArticleReminderPlanShowTargetRadio({
  helper = null,
  onChange: onChangeCallback,
  label = '显示目标',
  formItemLayout = null,
  required = true,
  name = 'showTarget',
  innerProps: innerProperties = null,
}) {
  const title = label || unknownLabel;

  return buildFormRadio({
    label: title,
    name,
    helper,
    list: refitArticleReminderPlanShowTargetList({ withUnlimited: false }),
    dataConvert: convertOptionOrRadioData,
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
