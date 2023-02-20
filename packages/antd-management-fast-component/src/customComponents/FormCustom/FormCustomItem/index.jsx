import { Form } from 'antd';
import React from 'react';

import { FormCustomItemChildren } from '../FormCustomItemChildren';

export function FormCustomItem(properties) {
  const { render, children, ...rest } = properties;

  return (
    <Form.Item {...rest}>
      {React.isValidElement(children) ? (
        <FormCustomItemChildren render={render}>
          {children}
        </FormCustomItemChildren>
      ) : (
        children
      )}
    </Form.Item>
  );
}
