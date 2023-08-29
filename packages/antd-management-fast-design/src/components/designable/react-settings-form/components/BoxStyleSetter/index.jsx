import cls from 'classnames';
import React from 'react';
import { observer, useField } from '@formily/react';

import { IconWidget, usePrefix } from '../../../react';
import { FoldItem } from '../FoldItem';
import { InputItems } from '../InputItems';
import { SizeInput } from '../SizeInput';

const PositionMap = {
  top: 1,
  right: 2,
  bottom: 3,
  left: 4,
  all: 1,
};

const BoxRex =
  /([\d.]+[^\d\s+.-]+)(?:\s+([\d.]+[^\d\s+.-]+)(?:\s+([\d.]+[^\d\s+.-]+)(?:\s+([\d.]+[^\d\s+.-]+))?)?)?/;

const createPositionHandler = (position, properties_) => {
  const matched = String(properties_.value).match(BoxRex) || [];
  const value = matched[PositionMap[position]];
  const v1 = matched[1];
  const v2 = matched[2];
  const v3 = matched[3];
  const v4 = matched[4];
  const allEquals = v1 === v2 && v2 === v3 && v3 === v4;

  return {
    ...properties_,
    value: position === 'all' ? (allEquals ? v1 : undefined) : value,
    onChange(value) {
      if (position === 'all') {
        properties_.onChange?.(
          `${value || '0px'} ${value || '0px'} ${value || '0px'} ${
            value || '0px'
          }`,
        );
      } else {
        matched[PositionMap[position]] = value;
        properties_.onChange?.(
          `${matched[1] || '0px'} ${matched[2] || '0px'} ${
            matched[3] || '0px'
          } ${matched[4] || '0px'}`,
        );
      }
    },
  };
};

export const BoxStyleSetter = observer((properties) => {
  const field = useField();
  const prefix = usePrefix('box-style-setter');

  const FoldItemAny = FoldItem;
  return (
    <FoldItemAny
      className={cls(prefix, properties.className)}
      label={field.title}
    >
      <FoldItemAny.Base>
        <SizeInput
          {...createPositionHandler('all', properties)}
          exclude={['inherit', 'auto']}
        />
      </FoldItemAny.Base>

      <FoldItemAny.Extra>
        <InputItems width="50%">
          <InputItems.Item icon={properties?.labels?.[0]}>
            <SizeInput
              {...createPositionHandler('top', properties)}
              exclude={['inherit', 'auto']}
            />
          </InputItems.Item>

          <InputItems.Item icon={properties?.labels?.[1]}>
            <SizeInput
              {...createPositionHandler('right', properties)}
              exclude={['inherit', 'auto']}
            />
          </InputItems.Item>

          <InputItems.Item icon={properties?.labels?.[2]}>
            <SizeInput
              {...createPositionHandler('bottom', properties)}
              exclude={['inherit', 'auto']}
            />
          </InputItems.Item>

          <InputItems.Item icon={properties?.labels?.[3]}>
            <SizeInput
              {...createPositionHandler('left', properties)}
              exclude={['inherit', 'auto']}
            />
          </InputItems.Item>
        </InputItems>
      </FoldItemAny.Extra>
    </FoldItemAny>
  );
});

BoxStyleSetter.defaultProps = {
  labels: [
    <IconWidget infer="Top" size={16} key="1" />,
    <IconWidget infer="Right" size={16} key="2" />,
    <IconWidget infer="Bottom" size={16} key="3" />,
    <IconWidget infer="Left" size={16} key="4" />,
  ],
};
