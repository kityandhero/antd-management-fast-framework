import React from 'react';
import { observer } from '@formily/reactive-react';

import { useNodeIdProperties, useTreeNode } from '../../hooks';
import { NodeActionsWidget } from '../NodeActionsWidget';
import { NodeTitleWidget } from '../NodeTitleWidget';

import './styles.less';

export const DroppableWidget = observer(
  ({
    node,
    actions,
    height,
    placeholder = true,
    style,
    className,
    hasChildren: hasChildrenProperty,
    ...properties
  }) => {
    const currentNode = useTreeNode();
    const nodeId = useNodeIdProperties(node);
    const target = node ?? currentNode;
    const hasChildren =
      hasChildrenProperty ?? (target?.children?.length || 0) > 0;
    return (
      <div {...nodeId} className={className} style={style}>
        {hasChildren ? (
          properties.children
        ) : placeholder ? (
          <div style={{ height }} className="dn-droppable-placeholder">
            <NodeTitleWidget node={target} />
          </div>
        ) : (
          properties.children
        )}

        {actions?.length ? (
          <NodeActionsWidget>
            {actions.map((action, key) => (
              <NodeActionsWidget.Action {...action} key={key} />
            ))}
          </NodeActionsWidget>
        ) : null}
      </div>
    );
  },
);
