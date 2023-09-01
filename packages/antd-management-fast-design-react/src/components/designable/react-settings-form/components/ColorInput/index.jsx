import { Input, Popover } from 'antd';
import React, { useRef } from 'react';
import { SketchPicker } from 'react-color';

import { usePrefix } from '../../../react';

import './styles.less';

export const ColorInput = (properties) => {
  const container = useRef();
  const prefix = usePrefix('color-input');
  const color = properties.value;
  return (
    <div ref={container} className={prefix}>
      <Input
        value={properties.value}
        onChange={(event) => {
          properties.onChange?.(event.target.value);
        }}
        placeholder="Color"
        prefix={
          <Popover
            autoAdjustOverflow
            trigger="click"
            overlayInnerStyle={{ padding: 0 }}
            getPopupContainer={() => container.current}
            content={
              <SketchPicker
                color={color}
                onChange={({ rgb }) => {
                  properties.onChange?.(
                    `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`,
                  );
                }}
              />
            }
          >
            <div
              className={prefix + '-color-tips'}
              style={{
                backgroundColor: color,
              }}
            ></div>
          </Popover>
        }
      />
    </div>
  );
};
