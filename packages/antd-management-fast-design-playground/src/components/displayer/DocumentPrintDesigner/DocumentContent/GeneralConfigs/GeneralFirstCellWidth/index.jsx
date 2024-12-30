import { InputNumber } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  isUndefined,
  toNumber,
  toString,
} from 'easy-soft-utility';

import { FlexBox, VerticalBox } from 'antd-management-fast-component';

import { GeneralConfigContainer } from '../GeneralConfigContainer';

function GeneralFirstCellWidth(properties) {
  const { data, onChange: onChangeCallback } = properties;

  const { labelWidth } = {
    labelWidth: '0',
    ...data,
  };

  const labelWidthAdjust =
    isUndefined(labelWidth) ||
    checkStringIsNullOrWhiteSpace(labelWidth) ||
    toNumber(labelWidth) <= 0
      ? ''
      : labelWidth;

  return (
    <GeneralConfigContainer>
      <FlexBox
        flexAuto="left"
        left={<VerticalBox>行首标题列宽：</VerticalBox>}
        right={
          <InputNumber
            style={{ width: '60px' }}
            value={labelWidthAdjust}
            onChange={(o) => {
              if (!isFunction(onChangeCallback)) {
                return;
              }

              onChangeCallback({
                ...data,
                labelWidth: toString(o),
              });
            }}
          />
        }
      />
    </GeneralConfigContainer>
  );
}

export { GeneralFirstCellWidth };
