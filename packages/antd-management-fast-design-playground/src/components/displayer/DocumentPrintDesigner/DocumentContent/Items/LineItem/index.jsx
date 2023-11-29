import { Col, Row } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isUndefined,
  toNumber,
} from 'easy-soft-utility';

import { CenterBox, FlexBox } from 'antd-management-fast-component';

import { CellMarker } from '../../CellMarker';
import { defaultConfig, highlightModeCollection } from '../../constant';
import { buildDisplayValue } from '../../tools';
import { InLineItem } from '../InLineItem';

function LineItem(properties) {
  const {
    general,
    data,
    values,
    currentName,
    highlightMode,
    designMode,
    lineStyle,
    labelBoxStyle,
    valueBoxStyle,
    labelContainerStyle,
    valueContainerStyle,
    onClick: onClickCallback,
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

  const { title, name, width, minHeight } = {
    title: '',
    name: '',
    width: '0',
    minHeight: '0',
    ...dataAdjust,
  };

  const minHeightAdjust =
    isUndefined(minHeight) ||
    checkStringIsNullOrWhiteSpace(minHeight) ||
    toNumber(minHeight) <= 0
      ? defaultConfig.minHeight
      : minHeight;

  const widthAdjust =
    isUndefined(width) ||
    checkStringIsNullOrWhiteSpace(width) ||
    toNumber(width) <= 0
      ? toNumber(defaultConfig.width)
      : toNumber(width);

  const { labelWidth } = { labelWidth: '0', ...general };

  const labelWidthAdjust =
    isUndefined(labelWidth) ||
    checkStringIsNullOrWhiteSpace(labelWidth) ||
    toNumber(labelWidth) <= 0
      ? ''
      : labelWidth;

  const displayValue = buildDisplayValue(dataAdjust, values);

  return (
    <FlexBox
      flexAuto="right"
      style={{
        ...lineStyle,
        ...(checkStringIsNullOrWhiteSpace(minHeightAdjust)
          ? {}
          : {
              minHeight: `${toNumber(minHeightAdjust)}px`,
            }),
        overflow: 'hidden',
      }}
      leftStyle={{
        ...labelBoxStyle,
        position: 'relative',
        padding: '0',
        ...(checkStringIsNullOrWhiteSpace(minHeightAdjust)
          ? {}
          : {
              minHeight: `${toNumber(minHeightAdjust)}px`,
            }),
        ...(checkStringIsNullOrWhiteSpace(labelWidthAdjust)
          ? {}
          : {
              width: `${labelWidthAdjust}px`,
            }),
      }}
      left={
        <>
          {designMode ? (
            <CellMarker
              data={dataAdjust}
              highlight={
                currentName === name &&
                highlightMode === highlightModeCollection.label
              }
              highlightMode={highlightModeCollection.label}
              onClick={onClickCallback}
            />
          ) : null}

          <div
            style={{
              labelBoxStyle,
              height: '100%',
              ...(checkStringIsNullOrWhiteSpace(minHeightAdjust)
                ? {}
                : {
                    minHeight: `${toNumber(minHeightAdjust)}px`,
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
        ...(checkStringIsNullOrWhiteSpace(minHeightAdjust)
          ? {}
          : {
              minHeight: `${toNumber(minHeightAdjust)}px`,
            }),
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
              <CellMarker
                data={dataAdjust}
                highlight={
                  currentName === name &&
                  highlightMode === highlightModeCollection.value
                }
                highlightMode={highlightModeCollection.value}
                onClick={onClickCallback}
              />
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
                {displayValue}
              </div>
            </div>
          </div>
        ) : (
          <Row style={{ width: '100%', height: '100%' }} wrap={false}>
            <Col flex={widthAdjust <= 0 ? 'auto' : `${width}px`}>
              <div
                style={{
                  ...valueContainerStyle,
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                }}
              >
                {designMode ? (
                  <CellMarker
                    data={dataAdjust}
                    highlight={
                      currentName === name &&
                      highlightMode === highlightModeCollection.value
                    }
                    highlightMode={highlightModeCollection.value}
                    onClick={onClickCallback}
                  />
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
                    {displayValue}
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
                  ? toNumber(defaultConfig.width)
                  : toNumber(widthItem);

              return (
                <Col
                  key={`line_column_${columnIndex}`}
                  flex={widthItemAdjust <= 0 ? 'auto' : `${widthItemAdjust}px`}
                >
                  <InLineItem
                    designMode={designMode}
                    values={values}
                    data={o}
                    currentName={currentName}
                    highlightMode={highlightMode}
                    labelBoxStyle={labelBoxStyle}
                    labelContainerStyle={labelContainerStyle}
                    valueBoxStyle={valueBoxStyle}
                    onClick={onClickCallback}
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

export { LineItem };
