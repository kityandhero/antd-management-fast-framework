import { Descriptions } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  logExecute,
} from 'easy-soft-utility';

import { copyToClipboard } from 'antd-management-fast-common';

import { BaseComponent } from '../../BaseComponent';

const { Item: Description } = Descriptions;

class AmfDescriptionGrid extends BaseComponent {
  renderFurther() {
    logExecute('renderFurther', 'AmfDescriptionGrid');

    const { list, config } = this.props;

    if (!isArray(list)) {
      return null;
    }

    const dataList = list.map((o, index) => {
      const d = { key: `item_${index}`, ...o };

      return { canCopy: false, ...d };
    });

    const { labelStyle: globalLabelStyle, contentStyle: globalContentStyle } = {
      labelStyle: null,
      contentStyle: null,
      ...config,
    };

    return (
      <Descriptions {...(config || {})}>
        {dataList.map((item) => {
          const {
            key: itemKey,
            label,
            span,
            labelStyle,
            contentStyle,
            emptyValue,
          } = {
            label: '',
            span: 1,
            labelStyle: null,
            contentStyle: null,
            emptyValue: '',
            ...item,
          };

          return (
            <Description
              key={itemKey}
              label={label}
              span={span || 1}
              labelStyle={{
                ...globalLabelStyle,
                ...labelStyle,
              }}
              contentStyle={{
                ...globalContentStyle,
                ...contentStyle,
              }}
              // style={{ ...itemStyle, ...(item.style || null) }}
            >
              {item.value || emptyValue}
              {item.canCopy && (item.canCopy || null) != null ? (
                <a
                  style={{ marginLeft: '10px' }}
                  disabled={checkStringIsNullOrWhiteSpace(
                    item.value || emptyValue,
                  )}
                  onClick={() => {
                    if (
                      !checkStringIsNullOrWhiteSpace(item.value || emptyValue)
                    ) {
                      copyToClipboard(item.copyData || item.value);
                    }
                  }}
                >
                  [复制]
                </a>
              ) : null}
            </Description>
          );
        })}
      </Descriptions>
    );
  }
}

AmfDescriptionGrid.defaultProps = {
  list: [],
  config: {},
};

export { AmfDescriptionGrid };
