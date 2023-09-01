import { Button } from 'antd';
import cls from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import { IconWidget, usePrefix } from '../../../react';

import './styles.less';

const isValid = (value) => value !== undefined && value !== null;

const getEventValue = (event) => {
  if (event?.target) {
    if (isValid(event.target.value)) return event.target.value;
    if (isValid(event.target.checked)) return event.target.checked;
    return;
  }
  return event;
};

const createTypes = (types, exclude, include) => {
  return types.filter(({ type }) => {
    if (Array.isArray(include) && include.length > 0) {
      return include.includes(type);
    }
    if (Array.isArray(exclude) && exclude.length > 0) {
      return !exclude.includes(type);
    }
    return true;
  });
};

const transformOnChangeValue = (value, type) => {
  return type?.toChangeValue ? type?.toChangeValue(value) : value;
};

function createPolyInputCore(
  { className, style, value, onChange, exclude, include, ...properties },
  polyTypes,
) {
  const prefix = usePrefix('poly-input');
  const types = createTypes(polyTypes, exclude, include);
  const [current, setCurrent] = useState(types[0]?.type);
  const type = types?.find(({ type }) => type === current);
  const component = type?.component;
  const typesValue = useRef({});

  useEffect(() => {
    if (types)
      for (const { checker, type } of types) {
        if (checker(value)) {
          setCurrent(type);
        }
      }
  }, [value]);

  const getNextType = () => {
    const currentIndex = types?.findIndex(({ type }) => type === current);
    const nextIndex =
      currentIndex + 1 > types?.length - 1 ? 0 : currentIndex + 1;

    return types[nextIndex];
  };

  return (
    <div className={cls(prefix, className)} style={style}>
      {component && (
        <div className={prefix + '-content'}>
          {React.createElement(component, {
            ...properties,
            value: type?.toInputValue ? type?.toInputValue(value) : value,
            onChange: (event) => {
              const value = getEventValue(event);
              typesValue.current[type?.type] = value;
              onChange?.(transformOnChangeValue(value, type));
            },
          })}
        </div>
      )}

      <Button
        className={prefix + '-controller'}
        style={{
          width: component ? 'auto' : '100%',
        }}
        block
        onClick={() => {
          const nextType = getNextType();
          if (nextType === type) return;
          setCurrent(nextType?.type);
          onChange?.(
            transformOnChangeValue(
              typesValue.current[nextType?.type],
              nextType,
            ),
          );
        }}
      >
        {type?.icon ? (
          <IconWidget infer={type.icon} />
        ) : (
          type?.title || type?.type
        )}
      </Button>
    </div>
  );
}

export function createPolyInput(polyTypes = []) {
  return ({
    className,
    style,
    value,
    onChange,
    exclude,
    include,
    ...properties
  }) => {
    return createPolyInputCore(
      {
        className,
        style,
        value,
        onChange,
        exclude,
        include,
        ...properties,
      },
      polyTypes,
    );
  };
}
