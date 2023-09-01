import cls from 'classnames';
import React from 'react';
import { observer, useField } from '@formily/react';

import { usePrefix } from '../../../react';
import { ColorInput } from '../ColorInput';
import { FoldItem } from '../FoldItem';
import { InputItems } from '../InputItems';
import { SizeInput } from '../SizeInput';

export const BoxShadowStyleSetter = observer((properties) => {
  const field = useField();
  const prefix = usePrefix('shadow-style-setter');
  const createBoxShadowConnector = (position) => {
    const splitResult = String(properties.value || '')
      .trim()
      .split(' ');

    return {
      value: splitResult[position],
      onChange: (value) => {
        splitResult[position] = value;
        properties.onChange?.(
          `${splitResult[0] || ''} ${splitResult[1] || ''} ${
            splitResult[2] || ''
          } ${splitResult[3] || ''} ${splitResult[4] || ''}`,
        );
      },
    };
  };
  return (
    <FoldItem
      className={cls(prefix, properties.className)}
      style={properties.style}
      label={field.title}
    >
      <FoldItem.Base>
        <ColorInput {...createBoxShadowConnector(4)} />
      </FoldItem.Base>

      <FoldItem.Extra>
        <InputItems width="50%">
          <InputItems.Item icon="AxisX">
            <SizeInput
              exclude={['inherit', 'auto']}
              {...createBoxShadowConnector(0)}
            />
          </InputItems.Item>

          <InputItems.Item icon="AxisY">
            <SizeInput
              exclude={['inherit', 'auto']}
              {...createBoxShadowConnector(1)}
            />
          </InputItems.Item>

          <InputItems.Item icon="Blur">
            <SizeInput
              exclude={['inherit', 'auto']}
              {...createBoxShadowConnector(2)}
            />
          </InputItems.Item>

          <InputItems.Item icon="Shadow">
            <SizeInput
              exclude={['inherit', 'auto']}
              {...createBoxShadowConnector(3)}
            />
          </InputItems.Item>
        </InputItems>
      </FoldItem.Extra>
    </FoldItem>
  );
});
