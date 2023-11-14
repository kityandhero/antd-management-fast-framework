import { Col, Row, Switch } from 'antd';
import React, { PureComponent } from 'react';

import { isArray, isFunction, whetherString } from 'easy-soft-utility';

import { CenterBox, FlexBox } from 'antd-management-fast-component';

const fontFamilyStyle = {
  fontFamily: 'fangsong',
};

const colorDefault = '#000';

const colorStyle = {
  color: colorDefault,
};

const lineStyle = {
  minHeight: '50px',
};

const documentTitleStyle = {
  fontSize: '30px',
};

const labelFrontStyle = {
  fontSize: '20px',
  lineHeight: '36px',
};

const valueFrontStyle = {
  fontSize: '20px',
  lineHeight: '36px',
};

function adjustSchemaData(schema) {
  if (!isArray(schema)) {
    return;
  }

  const list = [];

  let listTemplate = [];

  for (const [key, value] of Object.entries(schema)) {
    const { title, type, name, fullLine } = {
      name: key,
      fullLine: whetherString.yes,
      ...value,
    };

    if (fullLine === whetherString.yes) {
      if (listTemplate.length > 0) {
        list.push([...listTemplate]);

        listTemplate = [];
      }

      list.push({
        key: `document_index_${key}`,
        title,
        type,
        name,
        fullLine,
      });
    } else {
      listTemplate.push({
        key: `document_index_${key}`,
        title,
        type,
        name,
        fullLine,
      });
    }
  }

  if (listTemplate.length > 0) {
    list.push([...listTemplate]);

    listTemplate = [];
  }

  return list;
}

function LineItem(properties) {
  const {
    data,
    designMode,
    lineStyle,
    labelBoxStyle,
    valueBoxStyle,
    labelContainerStyle,
    valueContainerStyle,
    onChange: onChangeCallback,
  } = properties;

  let dataAdjust;
  let otherList = [];

  if (isArray(data)) {
    if (data.length <= 0) {
      return null;
    } else {
      dataAdjust = data.shift();

      otherList = [...data];
    }
  } else {
    dataAdjust = data;
  }

  const { title, fullLine } = dataAdjust;

  return (
    <FlexBox
      flexAuto="right"
      style={lineStyle}
      leftStyle={labelBoxStyle}
      left={
        <CenterBox>
          <div style={labelContainerStyle}>{title}</div>
        </CenterBox>
      }
      rightStyle={{
        ...valueBoxStyle,
        ...(otherList.length <= 0
          ? {}
          : { paddingLeft: '0', paddingRight: '0' }),
      }}
      right={
        <div
          style={{
            ...valueContainerStyle,
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          >
            {designMode ? (
              otherList.length <= 0 ? (
                <CenterBox>
                  <FlexBox
                    style={{
                      padding: '2px 6px',
                      backgroundColor: '#ccc',
                      borderRadius: '6px',
                      overflow: 'hidden',
                    }}
                    flexAuto="left"
                    left="独行: "
                    leftStyle={{ paddingRight: '4px', whiteSpace: 'nowrap' }}
                    right={
                      <CenterBox>
                        <Switch
                          checkedChildren="开"
                          unCheckedChildren="关"
                          defaultChecked={fullLine === whetherString.yes}
                          onChange={(checked) => {
                            if (!isFunction(onChangeCallback)) {
                              return;
                            }

                            onChangeCallback(checked, dataAdjust);
                          }}
                        />
                      </CenterBox>
                    }
                  />
                </CenterBox>
              ) : (
                <Row style={{ height: '100%' }} wrap={false}>
                  <Col flex="auto">
                    <CenterBox>
                      <FlexBox
                        style={{
                          padding: '2px 6px',
                          backgroundColor: '#ccc',
                          borderRadius: '6px',
                          overflow: 'hidden',
                        }}
                        flexAuto="left"
                        left="独行: "
                        leftStyle={{
                          paddingRight: '4px',
                          whiteSpace: 'nowrap',
                        }}
                        right={
                          <CenterBox>
                            <Switch
                              checkedChildren="开"
                              unCheckedChildren="关"
                              defaultChecked={fullLine === whetherString.yes}
                              onChange={(checked) => {
                                if (!isFunction(onChangeCallback)) {
                                  return;
                                }

                                onChangeCallback(checked, dataAdjust);
                              }}
                            />
                          </CenterBox>
                        }
                      />
                    </CenterBox>
                  </Col>

                  {otherList.map((o, columnIndex) => {
                    return (
                      <Col key={`line_column_${columnIndex}`} flex="auto">
                        <InLineItem
                          designMode={designMode}
                          data={o}
                          labelBoxStyle={labelBoxStyle}
                          labelContainerStyle={labelContainerStyle}
                          valueBoxStyle={valueBoxStyle}
                          onChange={onChangeCallback}
                        />
                      </Col>
                    );
                  })}
                </Row>
              )
            ) : null}
          </div>
        </div>
      }
    />
  );
}

function InLineItem(properties) {
  const {
    data,
    color,
    labelBoxStyle,
    labelContainerStyle,
    valueBoxStyle,
    designMode,
    onChange: onChangeCallback,
  } = properties;

  const { title, fullLine } = { ...data };

  return (
    <FlexBox
      flexAuto="right"
      style={{
        height: '100%',
      }}
      leftStyle={{
        paddingTop: '12px',
        paddingBottom: '12px',
        paddingLeft: '10px',
        paddingRight: '10px',
        borderLeft: `1px solid ${color}`,
        borderRight: `1px solid ${color}`,
        textAlign: 'center',
        ...labelFrontStyle,
        ...colorStyle,
        ...fontFamilyStyle,
        ...labelBoxStyle,
        width: 'auto',
      }}
      left={
        <CenterBox>
          <div
            style={{
              paddingLeft: '6px',
              paddingRight: '6px',
              ...labelContainerStyle,
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </div>
        </CenterBox>
      }
      rightStyle={{
        paddingLeft: '10px',
        paddingRight: '10px',
        ...valueFrontStyle,
        ...colorStyle,
        ...fontFamilyStyle,
        ...valueBoxStyle,
        borderRight: '0',
      }}
      right={
        designMode ? (
          <CenterBox>
            <FlexBox
              style={{
                padding: '2px 6px',
                backgroundColor: '#ccc',
                borderRadius: '6px',
                overflow: 'hidden',
              }}
              flexAuto="left"
              left="独行: "
              leftStyle={{ paddingRight: '4px', whiteSpace: 'nowrap' }}
              right={
                <CenterBox>
                  <Switch
                    checkedChildren="开"
                    unCheckedChildren="关"
                    defaultChecked={fullLine === whetherString.yes}
                    onChange={(checked) => {
                      if (!isFunction(onChangeCallback)) {
                        return;
                      }

                      onChangeCallback(checked, data);
                    }}
                  />
                </CenterBox>
              }
            />
          </CenterBox>
        ) : null
      }
    />
  );
}

class DocumentContent extends PureComponent {
  onChange = (checked, item) => {
    const { schema, onChange: onChangeCallback } = this.props;

    if (!isFunction(onChangeCallback)) {
      return;
    }

    if (isArray(schema)) {
      const { name } = item;

      const schemaAdjust = schema.map((o) => {
        const {
          title,
          name: nameItem,
          type,
          fullLine,
        } = {
          fullLine: whetherString.yes,
          ...o,
        };

        if (nameItem === name) {
          return {
            title,
            name: nameItem,
            type,
            fullLine: checked ? whetherString.yes : whetherString.no,
          };
        }

        return {
          title,
          name: nameItem,
          type,
          fullLine,
        };
      });

      onChangeCallback(schemaAdjust);
    } else {
      onChangeCallback(schema);
    }
  };

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
      designMode,
    } = this.props;

    const schemaAdjust = adjustSchemaData(schema);

    const lineAdjustStyle = {
      borderBottom: `1px solid ${color}`,
      ...lineStyle,
    };

    const labelBoxStyle = {
      paddingTop: '12px',
      paddingBottom: '12px',
      paddingLeft: '10px',
      paddingRight: '10px',
      borderLeft: `1px solid ${color}`,
      borderRight: `1px solid ${color}`,
      width: `${labelColumnWidth}px`,
      textAlign: 'center',
      ...labelFrontStyle,
      ...colorStyle,
      ...fontFamilyStyle,
      ...labelColumnStyle,
    };

    const valueBoxStyle = {
      borderRight: `1px solid ${color}`,
      paddingLeft: '10px',
      paddingRight: '10px',
      ...valueFrontStyle,
      ...colorStyle,
      ...fontFamilyStyle,
      ...valueColumnStyle,
    };

    return (
      <div
        style={{
          paddingLeft: '60px',
          paddingRight: '60px',
          paddingBottom: '40px',
          margin: '0 auto',
          width: '920px',
        }}
      >
        <div
          style={{
            paddingTop: '50px',
            paddingBottom: '10px',
            ...titleContainerStyle,
          }}
        >
          <CenterBox>
            <div
              style={{
                textAlign: 'center',
                ...documentTitleStyle,
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
            let itemAdjust;

            if (isArray(item)) {
              if (item.length <= 0) {
                return null;
              } else {
                itemAdjust = item[0];
              }
            } else {
              itemAdjust = item;
            }

            const { key } = itemAdjust;

            return (
              <LineItem
                key={key}
                data={item}
                designMode={designMode}
                lineStyle={lineAdjustStyle}
                labelBoxStyle={labelBoxStyle}
                valueBoxStyle={valueBoxStyle}
                labelContainerStyle={labelContainerStyle}
                valueContainerStyle={valueContainerStyle}
                onChange={this.onChange}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

DocumentContent.defaultProps = {
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
  onChange: null,
  designMode: false,
};

export { DocumentContent };
