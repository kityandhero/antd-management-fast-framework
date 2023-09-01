import cls from 'classnames';
import React from 'react';

import { usePrefix } from '../../hooks';

export const ResizeHandleType = {
  Resize: 'RESIZE',
  ResizeWidth: 'RESIZE_WIDTH',
  ResizeHeight: 'RESIZE_HEIGHT',
};

export const ResizeHandle = (properties) => {
  const prefix = usePrefix('resize-handle');

  return (
    <div
      {...properties}
      data-designer-resize-handle={properties.type}
      className={cls(prefix, {
        [`${prefix}-${properties.type}`]: !!properties.type,
      })}
    >
      {properties.children}
    </div>
  );
};
