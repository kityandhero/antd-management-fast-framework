import composeProps from 'rc-util/es/composeProps';
import React from 'react';

export function FormCustomItemChildren(properties) {
  const { render, children, ...rest } = properties;

  // composeProps 合并执行 Form.Item 传的 onChange 以及组件本身的方法
  const _children = React.cloneElement(
    children,
    composeProps(children.props, rest, true),
  );

  if (render) {
    return render(_children);
  }

  return _children;
}
