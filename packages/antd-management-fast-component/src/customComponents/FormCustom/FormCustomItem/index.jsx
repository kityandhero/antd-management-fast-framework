import { Form } from 'antd';
import React from 'react';

import { FormCustomItemChildren } from '../FormCustomItemChildren';

function FormCustomItem(props) {
  const { render, children, ...rest } = props;

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

export { FormCustomItem };
