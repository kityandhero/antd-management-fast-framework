import composeProps from 'rc-util/es/composeProps';
import React from 'react';

export function ItemChildren(properties) {
  const { render, children, ...rest } = properties;

  // composeProps 合并执行 Form.Item 传的 onChange 以及组件本身的方法
  const c = React.cloneElement(
    children,
    composeProps(children.props, rest, true),
  );

  if (render) {
    return render(c);
  }

  return c;
}
