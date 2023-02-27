import { Col, Row } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  getGuid,
  isArray,
  isNumber,
  logExecute,
  toNumber,
} from 'easy-soft-utility';

import { copyToClipboard } from 'antd-management-fast-common';

import { BaseComponent } from '../../BaseComponent';
import { FlexBox } from '../../FlexBox';
import { FlexText } from '../../FlexText';

class AmfCustomGrid extends BaseComponent {
  renderFurther() {
    logExecute('renderFurther', 'AmfCustomGrid');

    const { list, config } = this.props;

    if (!isArray(list)) {
      return null;
    }

    const dataList = list.map((o, index) => {
      const d = { ...o };

      d.key = `item_${index}`;

      return { canCopy: false, ...d };
    });

    let column = 3;

    const {
      title,
      column: columnSource,
      labelStyle: labelStyleSource,
      contentStyle: contentStyleSource,
      emptyValue: globalEmptyValue,
      emptyStyle: globalEmptyStyle,
      bordered: borderedSource,
      colon: colonSource,
      size: sizeSource,
      ellipsis,
    } = {
      title: '',
      column: 3,
      labelStyle: {},
      contentStyle: {},
      emptyValue: null,
      emptyStyle: null,
      bordered: false,
      colon: true,
      size: null,
      ellipsis: true,
      ...config,
    };

    if (!isNumber(columnSource)) {
      column = 3;
    }

    column = toNumber(columnSource);

    if (column <= 0 || column >= 6) {
      column = 3;
    }

    let margin = '16px 24px';
    let paddingBottomNoBorder = '16px';
    let backgroundColor = '';

    if (sizeSource === 'middle') {
      margin = '12px 24px';
      paddingBottomNoBorder = '12px';
    }

    if (sizeSource === 'small') {
      margin = '8px 16px';
      paddingBottomNoBorder = '8px';
    }

    const columnSpan = 24 / column;

    const bordered = borderedSource;
    const colon = bordered ? false : colonSource;

    if (bordered) {
      backgroundColor = '#fafafa';
    }

    const containorStyle = bordered
      ? { borderTop: '1px solid #f0f0f0', borderLeft: '1px solid #f0f0f0' }
      : null;

    const labelStyle = {
      width: '180px',
      ...labelStyleSource,
      ...(bordered ? { margin } : {}),
    };

    const contentStyle = bordered
      ? {
          margin: '16px 24px',
          ...contentStyleSource,
        }
      : {};

    const titleComponent = checkStringIsNullOrWhiteSpace(title) ? null : (
      <div
        style={{
          marginBottom: '8px',
          color: '#000000d9',
          fontWeight: 500,
          fontSize: '16px',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        <FlexText text={title} />
      </div>
    );

    return (
      <div>
        {titleComponent}

        <Row style={containorStyle}>
          {dataList.map((item) => {
            const { hidden } = { hidden: false, ...item };

            if (hidden) {
              return null;
            }

            const itemStyle = bordered
              ? {
                  borderRight: '1px solid #f0f0f0',
                  borderBottom: '1px solid #f0f0f0',
                }
              : {
                  paddingBottom: paddingBottomNoBorder,
                };

            const {
              key: itemKey,
              label: itemLabel,
              value: itemValue,
              emptyValue: itemEmptyValue,
              emptyStyle: itemEmptyStyle,
              span: itemSpan,
              canCopy: itemCanCopy,
              copyData: itemCopyData,
              props: itemProperties,
            } = {
              key: getGuid(),
              label: '',
              value: '',
              emptyValue: null,
              emptyStyle: null,
              span: 1,
              canCopy: false,
              copyData: null,
              props: null,
              ...item,
            };

            const v = itemValue || itemEmptyValue || globalEmptyValue;

            const isEmpty =
              (itemValue || itemEmptyValue || globalEmptyValue) ==
              (itemEmptyValue || globalEmptyValue);

            return (
              <Col
                key={itemKey}
                style={itemStyle}
                label={itemLabel}
                span={columnSpan * (toNumber(itemSpan) || 1)}
                {...(itemProperties || {})}
              >
                <FlexBox
                  flexAuto="right"
                  left={
                    <div style={labelStyle}>{`${itemLabel}${
                      colon ? '：' : ''
                    }`}</div>
                  }
                  leftStyle={{
                    backgroundColor,
                    ...(bordered ? { borderRight: '1px solid #f0f0f0' } : {}),
                  }}
                  right={
                    <div
                      style={{
                        ...contentStyle,
                        ...(isEmpty ? globalEmptyStyle || {} : {}),
                        ...(isEmpty ? itemEmptyStyle || {} : {}),

                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        textOverflow: 'ellipsis',
                        wordBreak: 'break-all',
                        whiteSpace: 'normal',
                        ...(ellipsis ? { WebkitLineClamp: '1' } : {}),
                      }}
                    >
                      {v}
                      {itemCanCopy && (itemCanCopy || null) != null ? (
                        <a
                          style={{ marginLeft: '10px' }}
                          onClick={() => {
                            copyToClipboard(itemCopyData || itemValue);
                          }}
                        >
                          [复制]
                        </a>
                      ) : null}
                    </div>
                  }
                />
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

AmfCustomGrid.defaultProps = {
  list: [],
  config: {},
};

export { AmfCustomGrid };
