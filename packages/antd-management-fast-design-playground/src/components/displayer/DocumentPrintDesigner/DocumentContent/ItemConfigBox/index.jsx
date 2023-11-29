import { Divider, Dropdown, InputNumber, Space, Switch } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isEmptyArray,
  isFunction,
  isUndefined,
  toNumber,
  toString,
  whetherNumber,
  whetherString,
  zeroString,
} from 'easy-soft-utility';

import {
  CenterBox,
  FlexBox,
  iconBuilder,
  VerticalBox,
} from 'antd-management-fast-component';

import {
  defaultConfig,
  highlightModeCollection,
  valueDisplayModeCollection,
} from '../constant';
import { adjustItem, getValueDisplayModeText } from '../tools';

function ItemConfigBox(properties) {
  const { data, highlightMode, onChange: onChangeCallback } = properties;

  const { fullLine, firstPosition, width, height, valueDisplayMode, enumList } =
    adjustItem(data);

  const widthAdjust =
    isUndefined(width) ||
    checkStringIsNullOrWhiteSpace(width) ||
    toNumber(width) <= 0
      ? defaultConfig.width
      : width;

  const heightAdjust =
    isUndefined(height) ||
    checkStringIsNullOrWhiteSpace(height) ||
    toNumber(height) <= 0
      ? defaultConfig.minHeight
      : height;

  const fullLineAdjust = toNumber(fullLine);

  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <CenterBox>
        <div
          style={{
            padding: '2px 6px',
            backgroundColor: '#ccc',
            borderRadius: '6px',
            height: '36px',
            overflow: 'hidden',
          }}
        >
          <CenterBox>
            <Space direction="horizontal" split={<Divider type="vertical" />}>
              {highlightMode == highlightModeCollection.label ? (
                <FlexBox
                  flexAuto="left"
                  left={<VerticalBox>行高：</VerticalBox>}
                  right={
                    <InputNumber
                      style={{ width: '60px' }}
                      value={heightAdjust}
                      onChange={(o) => {
                        if (!isFunction(onChangeCallback)) {
                          return;
                        }
                        onChangeCallback({
                          ...data,
                          height: toString(o),
                        });
                      }}
                    />
                  }
                />
              ) : null}

              {highlightMode == highlightModeCollection.value ||
              highlightMode == highlightModeCollection.all ? (
                <>
                  {fullLineAdjust === whetherNumber.yes ? null : (
                    <FlexBox
                      flexAuto="left"
                      left={<VerticalBox>行首：</VerticalBox>}
                      right={
                        <Switch
                          checkedChildren="是"
                          unCheckedChildren="否"
                          checked={
                            toString(firstPosition) === whetherString.yes
                          }
                          onChange={(checked) => {
                            if (!isFunction(onChangeCallback)) {
                              return;
                            }

                            onChangeCallback({
                              ...data,
                              firstPosition: checked
                                ? whetherString.yes
                                : whetherString.no,
                            });
                          }}
                        />
                      }
                    />
                  )}

                  {fullLineAdjust === whetherNumber.yes ? null : (
                    <FlexBox
                      flexAuto="left"
                      left={<VerticalBox>自动宽度：</VerticalBox>}
                      right={
                        <Switch
                          checkedChildren="是"
                          unCheckedChildren="否"
                          checked={toString(widthAdjust) === zeroString}
                          onChange={(checked) => {
                            if (!isFunction(onChangeCallback)) {
                              return;
                            }

                            onChangeCallback({
                              ...data,
                              width: checked ? zeroString : '100',
                            });
                          }}
                        />
                      }
                    />
                  )}

                  {fullLineAdjust === whetherNumber.yes ? null : (
                    <FlexBox
                      flexAuto="left"
                      left={<VerticalBox>宽度：</VerticalBox>}
                      right={
                        <InputNumber
                          style={{ width: '60px' }}
                          value={widthAdjust}
                          disabled={toString(widthAdjust) === zeroString}
                          onChange={(o) => {
                            if (!isFunction(onChangeCallback)) {
                              return;
                            }
                            onChangeCallback({
                              ...data,
                              width: toString(o),
                            });
                          }}
                        />
                      }
                    />
                  )}

                  {isArray(enumList) && !isEmptyArray(enumList) ? (
                    <FlexBox
                      flexAuto="left"
                      left={<VerticalBox>模式：</VerticalBox>}
                      right={
                        <Dropdown
                          menu={{
                            items: [
                              {
                                label: '文本',
                                key: valueDisplayModeCollection.text,
                              },
                              {
                                label: '选项',
                                key: valueDisplayModeCollection.enum,
                              },
                            ],
                            onClick: ({ key }) => {
                              onChangeCallback({
                                ...data,
                                valueDisplayMode: key,
                              });
                            },
                          }}
                        >
                          <a onClick={(event) => event.preventDefault()}>
                            <Space>
                              {getValueDisplayModeText(valueDisplayMode)}
                              {iconBuilder.down()}
                            </Space>
                          </a>
                        </Dropdown>
                      }
                    />
                  ) : null}

                  <FlexBox
                    flexAuto="left"
                    left={<VerticalBox>显示：</VerticalBox>}
                    right={
                      <Switch
                        checkedChildren="行"
                        unCheckedChildren="列"
                        checked={fullLineAdjust === whetherNumber.yes}
                        onChange={(checked) => {
                          if (!isFunction(onChangeCallback)) {
                            return;
                          }

                          onChangeCallback({
                            ...data,
                            fullLine: checked
                              ? whetherString.yes
                              : whetherString.no,
                          });
                        }}
                      />
                    }
                  />
                </>
              ) : null}
            </Space>
          </CenterBox>
        </div>
      </CenterBox>
    </div>
  );
}

export { ItemConfigBox };
