import cls from 'classnames';
import React from 'react';

import { useDesigner, usePrefix } from '../../hooks';

export const ResizeHandler = (properties) => {
  const designer = useDesigner();
  const prefix = usePrefix('aux-node-resize-handler');
  const createHandler = (value) => {
    return {
      [designer.props.nodeResizeHandlerAttrName]: value,
      className: cls(prefix, value),
    };
  };
  const allowResize = properties.node.allowResize();

  if (!allowResize) {
    return null;
  }

  const allowX = allowResize.includes('x');
  const allowY = allowResize.includes('y');

  return (
    <>
      {allowX && <div {...createHandler('x-start')}></div>}
      {allowX && <div {...createHandler('x-end')}></div>}
      {allowY && <div {...createHandler('y-start')}></div>}
      {allowY && <div {...createHandler('y-end')}></div>}
    </>
  );
};
