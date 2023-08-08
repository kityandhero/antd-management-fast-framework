import { Descriptions } from 'antd';
import React from 'react';

import { checkStringIsNullOrWhiteSpace, isArray } from 'easy-soft-utility';

import { copyToClipboard } from 'antd-management-fast-common';

import { BaseComponent } from '../../bases';
import { AnchorLink } from '../AnchorLink';

class DescriptionGrid extends BaseComponent {
  renderFurther() {
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

    const itemDataList = dataList.map((item) => {
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

      return {
        key: itemKey,
        label,
        span: span || 1,
        labelStyle: {
          ...globalLabelStyle,
          ...labelStyle,
        },
        contentStyle: {
          ...globalContentStyle,
          ...contentStyle,
        },
        children: (
          <>
            {item.value || emptyValue}

            {item.canCopy && (item.canCopy || null) != null ? (
              <AnchorLink
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
              </AnchorLink>
            ) : null}
          </>
        ),
      };
    });

    return <Descriptions {...(config || {})} items={itemDataList} />;
  }
}

DescriptionGrid.defaultProps = {
  list: [],
  config: {},
};

export { DescriptionGrid };
