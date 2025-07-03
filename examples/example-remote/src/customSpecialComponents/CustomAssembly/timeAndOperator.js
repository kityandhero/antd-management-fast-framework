import {
  checkStringIsNullOrWhiteSpace,
  formatCollection,
  getValueByKey,
  isArray,
  isEmptyObject,
  isNull,
  isObject,
  isUndefined,
  toNumber,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { formNameCollection } from '../../customConfig';

export function buildNowTimeFieldItem({ title = '时间信息' }) {
  return {
    title: {
      icon: iconBuilder.contacts(),
      text: checkStringIsNullOrWhiteSpace(title) ? '时间信息' : title,
    },
    items: [
      {
        type: cardConfig.contentItemType.nowTime,
      },
    ],
  };
}

export function buildUpdateTimeAndOperatorFieldItem({
  data,
  line = 1,
  additionalDataConfig = [],
}) {
  let externalData = [];

  if (isArray(additionalDataConfig) && !isEmptyObject(additionalDataConfig)) {
    for (const item of additionalDataConfig) {
      const { fieldData, span = 1 } = {
        span: 1,
        fieldData: null,
        ...item,
      };

      if (
        isNull(fieldData) ||
        isUndefined(fieldData) ||
        !isObject(fieldData) ||
        isEmptyObject(fieldData)
      ) {
        continue;
      }

      const o = {
        span: span,
        label: fieldData.label,
        value: getValueByKey({
          data: data,
          key: fieldData.name,
        }),
      };

      externalData.push(o);
    }
  }

  return {
    title: {
      icon: iconBuilder.contacts(),
      text: '操作信息',
    },
    items: [
      {
        lg: 24,
        type: cardConfig.contentItemType.customGrid,
        list: [
          ...externalData,
          {
            span: 1,
            label: formNameCollection.createOperatorId.label,
            value: getValueByKey({
              data: data,
              key: formNameCollection.createOperatorId.name,
            }),
          },
          {
            span: 1,
            label: formNameCollection.createTime.label,
            value: getValueByKey({
              data: data,
              key: formNameCollection.createTime.name,
              format: formatCollection.datetime,
            }),
          },
          {
            span: 1,
            label: formNameCollection.updateOperatorId.label,
            value: getValueByKey({
              data: data,
              key: formNameCollection.updateOperatorId.name,
            }),
          },
          {
            span: 1,
            label: formNameCollection.updateTime.label,
            value: getValueByKey({
              data: data,
              key: formNameCollection.updateTime.name,
              format: formatCollection.datetime,
            }),
          },
        ],
        props: {
          size: 'small',
          bordered: true,
          column: toNumber(line) === 1 ? 4 : 2,
          emptyStyle: {
            color: '#cccccc',
          },
          emptyValue: '待完善',
          labelStyle: {
            width: '100px',
          },
        },
      },
    ],
  };
}
