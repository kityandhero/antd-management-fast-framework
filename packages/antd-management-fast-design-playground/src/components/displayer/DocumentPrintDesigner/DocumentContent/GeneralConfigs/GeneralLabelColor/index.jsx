import { ColorPicker } from 'antd';
import React from 'react';

import { isFunction } from 'easy-soft-utility';

import { FlexBox, VerticalBox } from 'antd-management-fast-component';

import { presetColors } from '../../constant';
import { GeneralConfigContainer } from '../GeneralConfigContainer';

function GeneralLabelColor(properties) {
  const { data, onChange: onChangeCallback } = properties;

  const { labelColor } = {
    labelColor: '#000000',
    ...data,
  };

  return (
    <>
      <GeneralConfigContainer>
        <FlexBox
          flexAuto="left"
          left={<VerticalBox>标题颜色：</VerticalBox>}
          right={
            <ColorPicker
              value={labelColor}
              showText
              disabledAlpha
              presets={presetColors}
              onChangeComplete={(o) => {
                if (!isFunction(onChangeCallback)) {
                  return;
                }

                onChangeCallback({
                  ...data,
                  labelColor: o.toHexString(),
                });
              }}
            />
          }
        />
      </GeneralConfigContainer>
    </>
  );
}

export { GeneralLabelColor };
