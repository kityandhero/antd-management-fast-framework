import cls from 'classnames';
import React from 'react';
import { CursorStatus, CursorType } from '@designable/core';
import { calcRectByStartEndPoint } from '@designable/shared';
import { observer } from '@formily/reactive-react';

import { useCursor, usePrefix, useViewport } from '../../hooks';

export const FreeSelection = observer(() => {
  const cursor = useCursor();
  const viewport = useViewport();
  const prefix = usePrefix('aux-free-selection');
  const createSelectionStyle = () => {
    const startDragPoint = viewport.getOffsetPoint({
      x: cursor.dragStartPosition.topClientX || 0,
      y: cursor.dragStartPosition.topClientY || 0,
    });

    const currentPoint = viewport.getOffsetPoint({
      x: cursor.position.topClientX || 0,
      y: cursor.position.topClientY || 0,
    });

    const rect = calcRectByStartEndPoint(
      startDragPoint,
      currentPoint,
      viewport.scrollX - (cursor.dragStartScrollOffset.scrollX || 0),
      viewport.scrollY - (cursor.dragStartScrollOffset.scrollY || 0),
    );

    const baseStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0.2,
      borderWidth: 1,
      borderStyle: 'solid',
      transform: `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`,
      height: rect.height,
      width: rect.width,
      pointerEvents: 'none',
      boxSizing: 'border-box',
      zIndex: 1,
    };

    return baseStyle;
  };

  if (
    cursor.status !== CursorStatus.Dragging ||
    cursor.type !== CursorType.Selection
  )
    return null;
  return <div className={cls(prefix)} style={createSelectionStyle()}></div>;
});
