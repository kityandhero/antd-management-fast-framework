import { Col, InputNumber, Row, Switch } from 'antd';
import React, { PureComponent } from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  getValueByKey,
  isArray,
  isFunction,
  isUndefined,
  toNumber,
  toString,
  whetherNumber,
  whetherString,
} from 'easy-soft-utility';

import {
  CenterBox,
  FlexBox,
  VerticalBox,
} from 'antd-management-fast-component';

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

function adjustValues(values) {
  if (isArray(values)) {
    const v = {};

    for (const o of values) {
      const { name, value } = {
        name: '',
        value: '',
        ...o,
      };

      if (checkStringIsNullOrWhiteSpace(name)) {
        continue;
      }

      v[name] = value ?? '';
    }

    return v;
  }

  return values || {};
}

function adjustSchemaData(schema) {
  if (!isArray(schema)) {
    return;
  }

  const list = [];

  let listTemplate = [];

  for (const [key, value] of Object.entries(schema)) {
    const { title, type, name, fullLine, width, height } = {
      name: key,
      fullLine: whetherString.yes,
      width: '0',
      height: '0',
      ...value,
    };

    if (fullLine === whetherString.yes) {
      if (listTemplate.length > 0) {
        // if (listTemplate.length === 1) {
        //   list.push({
        //     ...listTemplate[0],
        //     fullLine: whetherString.yes,
        //   });
        // } else {
        //   list.push([...listTemplate]);
        // }

        list.push([...listTemplate]);

        listTemplate = [];
      }

      list.push({
        key: `document_index_${key}`,
        title,
        type,
        name,
        fullLine,
        width,
        height,
      });
    } else {
      listTemplate.push({
        key: `document_index_${key}`,
        title,
        type,
        name,
        fullLine,
        width,
        height,
      });
    }
  }

  if (listTemplate.length > 0) {
    list.push([...listTemplate]);

    listTemplate = [];
  }

  return list;
}

function RowConfigBox(properties) {
  const { data, onChange: onChangeCallback } = properties;

  const { height } = {
    height: '',
    ...data,
  };

  const heightAdjust =
    isUndefined(height) ||
    checkStringIsNullOrWhiteSpace(height) ||
    toNumber(height) <= 0
      ? ''
      : height;

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: '100',
      }}
    >
      <CenterBox>
        <div
          style={{
            padding: '2px 6px',
            backgroundColor: '#ccc',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          <FlexBox
            flexAuto="left"
            left="高："
            right={
              <InputNumber
                style={{ width: '60px' }}
                value={heightAdjust}
                onChange={(o) => {
                  if (!isFunction(onChangeCallback)) {
                    return;
                  }
                  onChangeCallback(
                    {
                      ...data,
                      height: o,
                    },
                    data,
                  );
                }}
              />
            }
          />
        </div>
      </CenterBox>
    </div>
  );
}

function ConfigBox(properties) {
  const { data, onChange: onChangeCallback } = properties;

  const { fullLine, width } = data;

  const widthAdjust =
    isUndefined(width) ||
    checkStringIsNullOrWhiteSpace(width) ||
    toNumber(width) <= 0
      ? ''
      : width;

  const fullLineAdjust = toNumber(fullLine);

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: '100',
      }}
    >
      <CenterBox>
        <div
          style={{
            padding: '2px 6px',
            backgroundColor: '#ccc',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          {fullLineAdjust === whetherNumber.yes ? (
            <CenterBox>
              <Switch
                checkedChildren="行"
                unCheckedChildren="列"
                defaultChecked={fullLineAdjust === whetherNumber.yes}
                onChange={(checked) => {
                  if (!isFunction(onChangeCallback)) {
                    return;
                  }

                  onChangeCallback(
                    {
                      ...data,
                      fullLine: checked ? whetherString.yes : whetherString.no,
                    },
                    data,
                  );
                }}
              />
            </CenterBox>
          ) : (
            <FlexBox
              flexAuto="left"
              left={
                <FlexBox
                  flexAuto="left"
                  left="宽："
                  right={
                    <InputNumber
                      style={{ width: '60px' }}
                      value={widthAdjust}
                      onChange={(o) => {
                        if (!isFunction(onChangeCallback)) {
                          return;
                        }
                        onChangeCallback(
                          {
                            ...data,
                            width: o,
                          },
                          data,
                        );
                      }}
                    />
                  }
                />
              }
              leftStyle={{
                paddingRight: '4px',
                whiteSpace: 'nowrap',
              }}
              right={
                <CenterBox>
                  <Switch
                    checkedChildren="行"
                    unCheckedChildren="列"
                    defaultChecked={fullLine === whetherNumber.yes}
                    onChange={(checked) => {
                      if (!isFunction(onChangeCallback)) {
                        return;
                      }

                      onChangeCallback(
                        {
                          ...data,
                          fullLine: checked
                            ? whetherString.yes
                            : whetherString.no,
                        },
                        data,
                      );
                    }}
                  />
                </CenterBox>
              }
            />
          )}
        </div>
      </CenterBox>
    </div>
  );
}

function LineItem(properties) {
  const {
    data,
    values,
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

  const { title, name, width, height } = dataAdjust;

  const heightAdjust =
    isUndefined(height) ||
    checkStringIsNullOrWhiteSpace(height) ||
    toNumber(height) <= 0
      ? ''
      : height;

  const widthAdjust =
    isUndefined(width) ||
    checkStringIsNullOrWhiteSpace(width) ||
    toNumber(width) <= 0
      ? ''
      : width;

  return (
    <FlexBox
      flexAuto="right"
      style={{
        ...lineStyle,
        ...(checkStringIsNullOrWhiteSpace(heightAdjust)
          ? {}
          : {
              height: `${height}px`,
            }),
      }}
      leftStyle={{
        ...labelBoxStyle,
        position: 'relative',
        padding: '0',
        ...(checkStringIsNullOrWhiteSpace(heightAdjust)
          ? {}
          : {
              height: `${height}px`,
            }),
      }}
      left={
        <>
          {designMode ? (
            <RowConfigBox data={dataAdjust} onChange={onChangeCallback} />
          ) : null}

          <div
            style={{
              labelBoxStyle,
              height: '100%',
              ...(checkStringIsNullOrWhiteSpace(heightAdjust)
                ? {}
                : {
                    height: `${height}px`,
                  }),
            }}
          >
            <CenterBox>
              <div style={labelContainerStyle}>{title}</div>
            </CenterBox>
          </div>
        </>
      }
      rightStyle={{
        ...valueBoxStyle,
        ...(otherList.length <= 0
          ? {}
          : { paddingLeft: '0', paddingRight: '0' }),
      }}
      right={
        otherList.length <= 0 ? (
          <div
            style={{
              ...valueContainerStyle,
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            {designMode ? (
              <ConfigBox data={dataAdjust} onChange={onChangeCallback} />
            ) : null}

            <div
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <div
                style={{
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  height: '100%',
                }}
              >
                <VerticalBox>
                  {getValueByKey({
                    data: values,
                    key: name,
                    defaultValue: '',
                  })}
                </VerticalBox>
              </div>
            </div>
          </div>
        ) : (
          <Row style={{ width: '100%', height: '100%' }} wrap={false}>
            <Col
              flex={
                checkStringIsNullOrWhiteSpace(widthAdjust)
                  ? 'auto'
                  : `${width}px`
              }
            >
              <div
                style={{
                  ...valueContainerStyle,
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                }}
              >
                {designMode ? (
                  <ConfigBox data={dataAdjust} onChange={onChangeCallback} />
                ) : null}

                <div
                  style={{
                    ...valueBoxStyle,
                    width: '100%',
                    height: '100%',
                    borderRight: '0',
                  }}
                >
                  <div
                    style={{
                      paddingLeft: '10px',
                      paddingRight: '10px',
                      height: '100%',
                    }}
                  >
                    <VerticalBox>
                      {getValueByKey({
                        data: values,
                        key: name,
                        defaultValue: '',
                      })}
                    </VerticalBox>
                  </div>
                </div>
              </div>
            </Col>

            {otherList.map((o, columnIndex) => {
              const { width: widthItem } = o;

              const widthItemAdjust =
                isUndefined(widthItem) ||
                checkStringIsNullOrWhiteSpace(widthItem) ||
                toNumber(widthItem) <= 0
                  ? ''
                  : widthItem;

              return (
                <Col
                  key={`line_column_${columnIndex}`}
                  flex={
                    checkStringIsNullOrWhiteSpace(widthItemAdjust)
                      ? 'auto'
                      : `${widthItemAdjust}px`
                  }
                >
                  <InLineItem
                    designMode={designMode}
                    values={values}
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
      }
    />
  );
}

function InLineItem(properties) {
  const {
    data,
    values,
    color,
    labelBoxStyle,
    labelContainerStyle,
    valueBoxStyle,
    designMode,
    onChange: onChangeCallback,
  } = properties;

  const { title, name } = { ...data };

  const filedComponent = (
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
        ...valueFrontStyle,
        ...colorStyle,
        ...fontFamilyStyle,
        ...valueBoxStyle,
        borderRight: '0',
      }}
      right={
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <div
              style={{
                paddingLeft: '10px',
                paddingRight: '10px',
                height: '100%',
              }}
            >
              <VerticalBox>
                {getValueByKey({
                  data: values,
                  key: name,
                  defaultValue: '',
                })}
              </VerticalBox>
            </div>
          </div>
        </div>
      }
    />
  );

  if (designMode) {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
      >
        <ConfigBox data={data} onChange={onChangeCallback} />

        {filedComponent}
      </div>
    );
  }

  return filedComponent;
}

class DocumentContent extends PureComponent {
  onChange = (item) => {
    const { schema, onChange: onChangeCallback } = this.props;

    if (!isFunction(onChangeCallback)) {
      return;
    }

    if (isArray(schema)) {
      const { name, fullLine, width, height } = item;

      const schemaAdjust = schema.map((o) => {
        const { name: nameItem } = o;

        if (nameItem === name) {
          return {
            ...o,
            fullLine: toString(fullLine),
            width: toString(width),
            height: toString(height),
          };
        } else {
          const {
            fullLine: fullLineItem,
            width: widthItem,
            height: heightItem,
          } = o;

          return {
            ...o,
            fullLine: toString(fullLineItem),
            width: toString(heightItem),
            height: toString(widthItem),
          };
        }
      });

      onChangeCallback(schemaAdjust);
    }
  };

  render() {
    const {
      values: valuesSource,
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

    const values = adjustValues(valuesSource);

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
          backgroundColor: '#fff',
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
                values={values}
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
  values: {},
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
