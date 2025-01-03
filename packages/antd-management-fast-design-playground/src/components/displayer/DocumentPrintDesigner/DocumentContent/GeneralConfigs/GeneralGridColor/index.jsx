import { ColorPicker } from 'antd';
import React from 'react';

import { isFunction } from 'easy-soft-utility';

import { FlexBox, VerticalBox } from 'antd-management-fast-component';

import { presetColors } from '../../constant';
import { GeneralConfigContainer } from '../GeneralConfigContainer';

function GeneralGridColor(properties) {
  const { data, onChange: onChangeCallback } = properties;

  const { gridColor } = {
    gridColor: '#000000',
    ...data,
  };

  return (
    <>
      <GeneralConfigContainer>
        <FlexBox
          flexAuto="left"
          left={<VerticalBox>边框色：</VerticalBox>}
          right={
            <ColorPicker
              value={gridColor}
              showText
              disabledAlpha
              presets={presetColors}
              onChangeComplete={(o) => {
                if (!isFunction(onChangeCallback)) {
                  return;
                }

                onChangeCallback({
                  ...data,
                  gridColor: o.toHexString(),
                });
              }}
            />
          }
        />
      </GeneralConfigContainer>
    </>
  );
}

export { GeneralGridColor };
