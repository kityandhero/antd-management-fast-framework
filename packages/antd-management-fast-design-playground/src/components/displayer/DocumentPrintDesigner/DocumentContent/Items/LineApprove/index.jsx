import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isUndefined,
  toNumber,
  transparentImage,
} from 'easy-soft-utility';

import {
  CenterBox,
  FlexBox,
  VerticalBox,
} from 'antd-management-fast-component';

import { CellMarker } from '../../CellMarker';
import { defaultConfig, highlightModeCollection } from '../../constant';

function LineApprove(properties) {
  const {
    general,
    data,
    currentName,
    highlightMode,
    designMode,
    lineStyle,
    labelBoxStyle,
    valueBoxStyle,
    labelContainerStyle,
    valueContainerStyle,
    signetStyle,
  } = properties;

  const minHeightAdjust = defaultConfig.minHeight;

  const { labelWidth } = { labelWidth: '0', ...general };

  const labelWidthAdjust =
    isUndefined(labelWidth) ||
    checkStringIsNullOrWhiteSpace(labelWidth) ||
    toNumber(labelWidth) <= 0
      ? ''
      : labelWidth;

  const { title, note, name, signet, time } = {
    title: '',
    note: '',
    name: '',
    signet: '',
    time: '',
    ...data,
  };

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
              <VerticalBox fillWidth>
                <div style={{ width: '100%' }}>
                  {checkStringIsNullOrWhiteSpace(note) ? (
                    <div
                      style={{ padding: '10px 0 5px 0' }}
                      dangerouslySetInnerHTML={{ __html: '&nbsp;' }}
                    ></div>
                  ) : (
                    <div style={{ padding: '10px 0 5px 0' }}>{note}</div>
                  )}

                  <div style={{ padding: '5px 0 10px 0' }}>
                    <FlexBox
                      flexAuto="left"
                      left={<div></div>}
                      right={
                        <div>
                          <FlexBox
                            flexAuto="left"
                            left={
                              <div
                                style={{ height: '40px', position: 'relative' }}
                              >
                                <img
                                  src={signet || transparentImage}
                                  style={{
                                    height: '40px',
                                    top: '0',
                                    ...signetStyle,
                                    right: '0',
                                    position: 'absolute',
                                  }}
                                />
                              </div>
                            }
                            rightStyle={{
                              paddingLeft: '10px',
                              paddingRight: '10px',
                            }}
                            right={
                              <div
                                style={{
                                  fontSize: '18px',
                                  fontWeight: 'normal',
                                }}
                              >
                                {time}
                              </div>
                            }
                          />
                        </div>
                      }
                    />
                  </div>
                </div>
              </VerticalBox>
            </div>
          </div>
        </div>
      }
    />
  );
}

export { LineApprove };
