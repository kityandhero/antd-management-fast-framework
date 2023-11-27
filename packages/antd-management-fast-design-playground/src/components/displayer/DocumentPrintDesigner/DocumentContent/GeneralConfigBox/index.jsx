import { InputNumber } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  isUndefined,
  toNumber,
  toString,
} from 'easy-soft-utility';

import {
  CenterBox,
  FlexBox,
  VerticalBox,
} from 'antd-management-fast-component';

import { defaultConfig } from '../constant';

function GeneralConfigBox(properties) {
  const { data, onChange: onChangeCallback } = properties;

  const { labelWidth } = {
    labelWidth: defaultConfig.labelWidth,
    ...data,
  };

  const labelWidthAdjust =
    isUndefined(labelWidth) ||
    checkStringIsNullOrWhiteSpace(labelWidth) ||
    toNumber(labelWidth) <= 0
      ? ''
      : labelWidth;

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
            overflow: 'hidden',
          }}
        >
          <FlexBox
            flexAuto="left"
            left={<VerticalBox>标题列宽：</VerticalBox>}
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
        </div>
      </CenterBox>
    </div>
  );
}

export { GeneralConfigBox };
