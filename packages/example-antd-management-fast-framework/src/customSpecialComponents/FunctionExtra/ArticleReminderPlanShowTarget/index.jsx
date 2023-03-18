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
} from 'antd-management-fast-component';

export function refitArticleReminderPlanShowTargetList({
  metaData,
  withUnlimited = true,
}) {
  const { articleReminderPlanShowTargetList: list } = {
    articleReminderPlanShowTargetList: [],
    ...metaData,
  };

  if (withUnlimited) {
    return refitCommonData(list, unlimitedWithStringFlag);
  }

  return refitCommonData(list);
}

export function getArticleReminderPlanShowTargetName({
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
    refitArticleReminderPlanShowTargetList({ metaData, withUnlimited: false }),
  );

  return item == null ? '未知' : item.name;
}

export function renderArticleReminderPlanShowTargetOption({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitArticleReminderPlanShowTargetList({
    metaData,
    withUnlimited,
  });

  return buildOptionItem({ list: listData, adjustListDataCallback });
}

export function renderArticleReminderPlanShowTargetRadio({
  metaData,
  withUnlimited = true,
  adjustListDataCallback = null,
}) {
  const listData = refitArticleReminderPlanShowTargetList({
    metaData,
    withUnlimited,
  });

  return buildRadioItem({ list: listData, adjustListDataCallback });
}

export function renderSearchArticleReminderPlanShowTargetSelect({
  metaData = null,
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
    list: refitArticleReminderPlanShowTargetList({ metaData, withUnlimited }),
    dataConvert: (o) => o,
  });
}

export function renderCustomArticleReminderPlanShowTargetSelect({
  metaData = null,
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
    list: refitArticleReminderPlanShowTargetList({
      metaData,
      withUnlimited: true,
    }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormArticleReminderPlanShowTargetSelect({
  metaData = null,
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
    list: refitArticleReminderPlanShowTargetList({
      metaData,
      withUnlimited: false,
    }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}

export function renderCustomArticleReminderPlanShowTargetRadio({
  metaData = null,
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
    list: refitArticleReminderPlanShowTargetList({
      metaData,
      withUnlimited: true,
    }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    renderItem: null,
    onChange: onChangeCallback,
    innerProps: innerProperties,
  });
}

export function renderFormArticleReminderPlanShowTargetRadio({
  metaData = null,
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
    list: refitArticleReminderPlanShowTargetList({
      metaData,
      withUnlimited: false,
    }),
    dataConvert: (o, index) => {
      const { flag, name } = o;

      return { index, label: name, value: flag, disabled: false, ...o };
    },
    onChange: onChangeCallback,
    formItemLayout,
    required,
    innerProps: innerProperties,
  });
}
