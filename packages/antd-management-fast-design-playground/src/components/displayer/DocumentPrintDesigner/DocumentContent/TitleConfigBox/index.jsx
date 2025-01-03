import {
  ColorPicker,
  Divider,
  Dropdown,
  InputNumber,
  Space,
  Switch,
} from 'antd';
import React from 'react';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isFunction,
  isUndefined,
  toNumber,
  toString,
  whetherString,
} from 'easy-soft-utility';

import {
  FlexBox,
  iconBuilder,
  VerticalBox,
} from 'antd-management-fast-component';

import { fontFamilyCollection, presetColors } from '../constant';
import { adjustTitleConfig, getFontFamilyName } from '../tools';

function TitleConfigBoxContainer({ showDivider = true, children }) {
  return (
    <div>
      {children}

      {showDivider ? <Divider style={{ margin: '6px 0' }} /> : null}
    </div>
  );
}

function TitleConfigBox(properties) {
  const { data, onChange: onChangeCallback } = properties;

  const { bold, color, fontSize, fontFamily } = adjustTitleConfig(data);

  const fontSizeAdjust =
    isUndefined(fontSize) ||
    checkStringIsNullOrWhiteSpace(fontSize) ||
    toNumber(fontSize) <= 0
      ? '0'
      : fontSize;

  const boldJudge =
    !isUndefined(bold) &&
    !checkStringIsNullOrWhiteSpace(bold) &&
    toString(bold) === whetherString.yes;

  const fontFamilyAdjust = checkInCollection(fontFamilyCollection, fontFamily)
    ? fontFamily
    : 'fangsong';

  return (
    <div>
      <TitleConfigBoxContainer>
        <FlexBox
          flexAuto="left"
          left={<VerticalBox>字体：</VerticalBox>}
          right={
            <Dropdown
              menu={{
                items: [
                  {
                    label: '仿宋',
                    key: 'fangsong',
                  },
                  {
                    label: '仿宋GB2312',
                    key: 'FangSong_GB2312',
                  },
                  {
                    label: '方正小标宋',
                    key: 'FZXiaoBiaoSong-B05S',
                  },
                ],
                onClick: ({ key }) => {
                  onChangeCallback({
                    ...data,
                    fontFamily: key,
                  });
                },
              }}
            >
              <a onClick={(event) => event.preventDefault()}>
                <Space>
                  {getFontFamilyName(fontFamilyAdjust)}
                  {iconBuilder.down()}
                </Space>
              </a>
            </Dropdown>
          }
        />
      </TitleConfigBoxContainer>

      <TitleConfigBoxContainer>
        <FlexBox
          flexAuto="left"
          left={<VerticalBox>粗体：</VerticalBox>}
          right={
            <Switch
              checkedChildren="是"
              unCheckedChildren="否"
              checked={boldJudge}
              onChange={(checked) => {
                if (!isFunction(onChangeCallback)) {
                  return;
                }

                onChangeCallback({
                  ...data,
                  bold: checked ? whetherString.yes : whetherString.no,
                });
              }}
            />
          }
        />
      </TitleConfigBoxContainer>

      <TitleConfigBoxContainer>
        <FlexBox
          flexAuto="left"
          left={<VerticalBox>标题颜色：</VerticalBox>}
          right={
            <ColorPicker
              value={color}
              showText
              disabledAlpha
              presets={presetColors}
              onChangeComplete={(o) => {
                if (!isFunction(onChangeCallback)) {
                  return;
                }

                onChangeCallback({
                  ...data,
                  color: o.toHexString(),
                });
              }}
            />
          }
        />
      </TitleConfigBoxContainer>

      <TitleConfigBoxContainer showDivider={false}>
        <FlexBox
          flexAuto="left"
          left={<VerticalBox>字体大小：</VerticalBox>}
          right={
            <InputNumber
              style={{ width: '60px' }}
              value={fontSizeAdjust}
              onChange={(o) => {
                if (!isFunction(onChangeCallback)) {
                  return;
                }
                onChangeCallback({
                  ...data,
                  fontSize: toString(o),
                });
              }}
            />
          }
        />
      </TitleConfigBoxContainer>
    </div>
  );
}

export { TitleConfigBox };
