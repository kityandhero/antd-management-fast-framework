import React, { useEffect, useRef } from 'react';
import { CursorStatus } from '@designable/core';
import { autorun } from '@formily/reactive';
import { observer } from '@formily/reactive-react';

import { useCursor, useDesigner, usePrefix } from '../../hooks';
import { NodeTitleWidget } from '../NodeTitleWidget';

import './styles.less';

export const GhostWidget = observer(() => {
  const designer = useDesigner();
  const cursor = useCursor();
  const reference = useRef();
  const prefix = usePrefix('ghost');
  const draggingNodes = designer.findDraggingNodes();
  const firstNode = draggingNodes[0];

  useEffect(
    () =>
      autorun(() => {
        const transform = `perspective(1px) translate3d(${
          cursor.position?.topClientX || 0 - 18
        }px,${cursor.position?.topClientY || 0 - 12}px,0) scale(0.8)`;
        if (!reference.current) return;
        reference.current.style.transform = transform;
      }),
    [designer, cursor],
  );

  const renderNodes = () => {
    return (
      <span
        style={{
          whiteSpace: 'nowrap',
        }}
      >
        <NodeTitleWidget node={firstNode} />
        {draggingNodes.length > 1 ? '...' : ''}
      </span>
    );
  };

  if (!firstNode) {
    return null;
  }

  return cursor.status === CursorStatus.Dragging ? (
    <div ref={reference} className={prefix}>
      {renderNodes()}
    </div>
  ) : null;
});

GhostWidget.displayName = 'GhostWidget';
