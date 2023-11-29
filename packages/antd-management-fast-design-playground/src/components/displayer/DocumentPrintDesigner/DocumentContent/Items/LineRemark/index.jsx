import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isUndefined,
  toNumber,
} from 'easy-soft-utility';

import {
  CenterBox,
  FlexBox,
  VerticalBox,
} from 'antd-management-fast-component';

import { CellMarker } from '../../CellMarker';
import { defaultConfig, highlightModeCollection } from '../../constant';

function LineRemark(properties) {
  const {
    general,
    title,
    name,
    value,
    currentName,
    highlightMode,
    designMode,
    lineStyle,
    labelBoxStyle,
    valueBoxStyle,
    labelContainerStyle,
    valueContainerStyle,
  } = properties;

  const minHeightAdjust = defaultConfig.minHeight;

  const { labelWidth } = { labelWidth: '0', ...general };

  const labelWidthAdjust =
    isUndefined(labelWidth) ||
    checkStringIsNullOrWhiteSpace(labelWidth) ||
    toNumber(labelWidth) <= 0
      ? ''
      : labelWidth;

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
              useHover={false}
              data={{ title, name }}
              highlight={
                currentName === name &&
                highlightMode === highlightModeCollection.none
              }
              highlightMode={highlightModeCollection.none}
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
        ...(checkStringIsNullOrWhiteSpace(minHeightAdjust)
          ? {}
          : {
              minHeight: `${toNumber(minHeightAdjust)}px`,
            }),
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
          {designMode ? (
            <CellMarker
              useHover={false}
              data={{ title, name }}
              highlight={
                currentName === name &&
                highlightMode === highlightModeCollection.none
              }
              highlightMode={highlightModeCollection.none}
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
              <VerticalBox>
                <div>{value}</div>
              </VerticalBox>
            </div>
          </div>
        </div>
      }
    />
  );
}

export { LineRemark };
