import { Form } from 'antd';
import React from 'react';

import { isFunction } from 'easy-soft-utility';

import { HiddenWrapper } from '../../HiddenWrapper';
import { ItemChildren } from '../ItemChildren';

const { Item: FormItem } = Form;

export function Item(properties) {
  const { hidden, render, children, ...rest } = properties;

  return (
    <HiddenWrapper hidden={hidden}>
      <FormItem {...rest}>
        {React.isValidElement(children) && isFunction(render) ? (
          <ItemChildren render={render}>{children}</ItemChildren>
        ) : (
          children
        )}
      </FormItem>
    </HiddenWrapper>
  );
}
