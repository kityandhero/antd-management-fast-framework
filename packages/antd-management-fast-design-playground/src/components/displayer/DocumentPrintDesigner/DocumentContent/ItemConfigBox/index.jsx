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
  whetherString,
  zeroString,
} from 'easy-soft-utility';

import {
  FlexBox,
  iconBuilder,
  VerticalBox,
} from 'antd-management-fast-component';

import {
  highlightModeCollection,
  valueDisplayModeCollection,
} from '../constant';
import { adjustCellConfig, getValueDisplayModeText } from '../tools';

function ItemConfigBoxContainer({ showDivider = true, children }) {
  return (
    <div>
      {children}

      {showDivider ? <Divider style={{ margin: '6px 0' }} /> : null}
    </div>
  );
}

function ItemConfigBox(properties) {
  const { data, highlightMode, onChange: onChangeCallback } = properties;

  const {
    firstPosition,
    width,
    spanRow,
    spanColumn,
    valueDisplayMode,
    enumList,
  } = adjustCellConfig(data);

  const widthAdjust =
    isUndefined(width) ||
    checkStringIsNullOrWhiteSpace(width) ||
    toNumber(width) <= 0
      ? '0'
      : width;

  const spanRowAdjust =
    isUndefined(spanRow) ||
    checkStringIsNullOrWhiteSpace(spanRow) ||
    toNumber(spanRow) <= 0
      ? '1'
      : spanRow;

  const spanColumnAdjust =
    isUndefined(spanColumn) ||
    checkStringIsNullOrWhiteSpace(spanColumn) ||
    toNumber(spanColumn) <= 0
      ? '1'
      : spanColumn;

  return (
    <div>
      <ItemConfigBoxContainer>
        <FlexBox
          flexAuto="left"
          left={<VerticalBox>行首：</VerticalBox>}
          right={
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
              checked={toString(firstPosition) === whetherString.yes}
              onChange={(checked) => {
                if (!isFunction(onChangeCallback)) {
                  return;
                }

                onChangeCallback({
                  ...data,
                  firstPosition: checked ? whetherString.yes : whetherString.no,
                });
              }}
            />
          }
        />
      </ItemConfigBoxContainer>

      <ItemConfigBoxContainer>
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
      </ItemConfigBoxContainer>

      <ItemConfigBoxContainer>
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
      </ItemConfigBoxContainer>

      {highlightMode == highlightModeCollection.value ? (
        <>
          {isArray(enumList) && !isEmptyArray(enumList) ? (
            <ItemConfigBoxContainer>
              <FlexBox
                flexAuto="left"
                left={<VerticalBox>值模式：</VerticalBox>}
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
                        {
                          label: '金额',
                          key: valueDisplayModeCollection.money,
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
            </ItemConfigBoxContainer>
          ) : null}
        </>
      ) : null}

      <ItemConfigBoxContainer>
        <FlexBox
          flexAuto="left"
          left={<VerticalBox>跨行：</VerticalBox>}
          right={
            <InputNumber
              style={{ width: '52px' }}
              value={spanRowAdjust}
              onChange={(o) => {
                if (!isFunction(onChangeCallback)) {
                  return;
                }

                onChangeCallback({
                  ...data,
                  spanRow: toString(o),
                });
              }}
            />
          }
        />
      </ItemConfigBoxContainer>

      <ItemConfigBoxContainer showDivider={false}>
        <FlexBox
          flexAuto="left"
          left={<VerticalBox>跨列：</VerticalBox>}
          right={
            <InputNumber
              style={{ width: '52px' }}
              value={spanColumnAdjust}
              onChange={(o) => {
                if (!isFunction(onChangeCallback)) {
                  return;
                }

                onChangeCallback({
                  ...data,
                  spanColumn: toString(o),
                });
              }}
            />
          }
        />
      </ItemConfigBoxContainer>
    </div>
  );
}

export { ItemConfigBox };
