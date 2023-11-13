import React, { PureComponent } from 'react';

import { isArray } from 'easy-soft-utility';

import { CenterBox, FlexBox } from 'antd-management-fast-component';

const fontFamilyStyle = {
  fontFamily: 'fangsong',
};

const colorDefault = '#000';

const colorStyle = {
  color: colorDefault,
};

const lineStyle = {
  minHeight: '46px',
};

class DocumentDisplayer extends PureComponent {
  render() {
    const {
      schema,
      style,
      color,
      labelColumnWidth,
      labelColumnStyle,
      labelContainerStyle,
      valueColumnStyle,
      valueContainerStyle,
      title,
      titleContainerStyle,
      titleStyle,
    } = this.props;

    const schemaAdjust = isArray(schema)
      ? schema.map((o, index) => {
          return {
            key: `document_index_${index}`,
            ...o,
          };
        })
      : [];

    return (
      <div>
        <div
          style={{
            paddingTop: '10px',
            paddingBottom: '10px',
            ...titleContainerStyle,
          }}
        >
          <CenterBox>
            <div
              style={{
                fontSize: '24px',
                ...colorStyle,
                ...fontFamilyStyle,
                ...titleStyle,
              }}
            >
              {title}
            </div>
          </CenterBox>
        </div>
        <div
          style={{
            borderTop: `1px solid ${color}`,
            ...style,
          }}
        >
          {schemaAdjust.map((item) => {
            const { key, title } = item;

            return (
              <FlexBox
                key={key}
                flexAuto="right"
                style={{
                  borderBottom: `1px solid ${color}`,
                  ...lineStyle,
                }}
                leftStyle={{
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  borderLeft: `1px solid ${color}`,
                  borderRight: `1px solid ${color}`,
                  width: `${labelColumnWidth}px`,
                  fontSize: '16px',
                  ...colorStyle,
                  ...fontFamilyStyle,
                  ...labelColumnStyle,
                }}
                left={
                  <div style={labelContainerStyle}>
                    <CenterBox>
                      <div>{title}</div>
                    </CenterBox>
                  </div>
                }
                rightStyle={{
                  borderRight: `1px solid ${color}`,
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  fontSize: '16px',
                  ...colorStyle,
                  ...fontFamilyStyle,
                  ...valueColumnStyle,
                }}
                right={
                  <div style={valueContainerStyle}>
                    <CenterBox>
                      <div></div>
                    </CenterBox>
                  </div>
                }
              />
            );
          })}
        </div>
      </div>
    );
  }
}

DocumentDisplayer.defaultProps = {
  schema: {},
  style: null,
  color: colorDefault,
  title: '表格标题',
  titleContainerStyle: null,
  titleStyle: null,
  labelColumnWidth: 140,
  labelColumnStyle: null,
  labelContainerStyle: null,
  labelStyle: null,
  valueColumnStyle: null,
  valueContainerStyle: null,
  valueStyle: null,
};

export { DocumentDisplayer };
