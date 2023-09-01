import cls from 'classnames';
import React, { Fragment, useMemo } from 'react';
import { Select } from '@formily/antd-v5';
import { Field, observer, useField } from '@formily/react';
import { observable } from '@formily/reactive';
import { camelCase } from '@formily/shared';

import { usePrefix } from '../../../react';
import { ColorInput } from '../ColorInput';
import { FoldItem } from '../FoldItem';
import { PositionInput } from '../PositionInput';
import { SizeInput } from '../SizeInput';

import './styles.less';

const Positions = ['center', 'top', 'right', 'bottom', 'left'];

const BorderStyleOptions = [
  {
    label: 'None',
    value: 'none',
  },
  {
    label: <span className="border-style-solid-line" />,
    value: 'solid',
  },
  {
    label: <span className="border-style-dashed-line" />,
    value: 'dashed',
  },
  {
    label: <span className="border-style-dotted-line" />,
    value: 'dotted',
  },
];

const createBorderProperty = (position, key) => {
  const insert = position === 'center' ? '' : `-${position}`;

  return camelCase(`border${insert}-${key}`);
};

const parseInitPosition = (field) => {
  const basePath = field.address.parent();

  for (const position of Positions) {
    const stylePath = `${basePath}.${createBorderProperty(position, 'style')}`;
    const widthPath = `${basePath}.${createBorderProperty(position, 'width')}`;
    const colorPath = `${basePath}.${createBorderProperty(position, 'color')}`;

    if (
      field.query(stylePath).value() ||
      field.query(widthPath).value() ||
      field.query(colorPath).value()
    ) {
      return position;
    }
  }

  return 'center';
};

export const BorderStyleSetter = observer(({ className, style }) => {
  const field = useField();

  const currentPosition = useMemo(
    () =>
      observable({
        value: parseInitPosition(field),
      }),
    [field.value],
  );
  const prefix = usePrefix('border-style-setter');
  const createReaction = (position) => (field) => {
    field.display = currentPosition.value === position ? 'visible' : 'hidden';

    if (position !== 'center') {
      const borderStyle = field.query('.borderStyle').value();
      const borderWidth = field.query('.borderWidth').value();
      const borderColor = field.query('.borderColor').value();

      if (borderStyle || borderWidth || borderColor) {
        field.value = undefined;
      }
    }
  };

  return (
    <FoldItem label={field.title}>
      <FoldItem.Extra>
        <div className={cls(prefix, className)} style={style}>
          <div className={prefix + '-position'}>
            <PositionInput
              value={currentPosition.value}
              onChange={(value) => {
                currentPosition.value = value;
              }}
            />
          </div>

          <div className={prefix + '-input'}>
            {Positions.map((position, key) => {
              return (
                <Fragment key={key}>
                  <Field
                    name={createBorderProperty(position, 'style')}
                    basePath={field.address.parent()}
                    dataSource={BorderStyleOptions}
                    reactions={createReaction(position)}
                    component={[Select, { placeholder: 'Please Select' }]}
                  />

                  <Field
                    name={createBorderProperty(position, 'width')}
                    basePath={field.address.parent()}
                    reactions={createReaction(position)}
                    component={[SizeInput, { exclude: ['auto'] }]}
                  />

                  <Field
                    name={createBorderProperty(position, 'color')}
                    basePath={field.address.parent()}
                    reactions={createReaction(position)}
                    component={[ColorInput]}
                  />
                </Fragment>
              );
            })}
          </div>
        </div>
      </FoldItem.Extra>
    </FoldItem>
  );
});
