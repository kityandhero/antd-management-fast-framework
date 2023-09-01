import { Button } from 'antd';
import React from 'react';
import { observer } from '@formily/reactive-react';

import { useDesigner, usePrefix } from '../../hooks';
import { IconWidget } from '../IconWidget';

export const DragHandler = observer(({ node, style }) => {
  const designer = useDesigner();
  const prefix = usePrefix('aux-drag-handler');
  if (node === node.root || !node.allowDrag()) return null;

  const handlerProperties = {
    [designer.props.nodeDragHandlerAttrName]: 'true',
  };

  return (
    <Button
      {...handlerProperties}
      className={prefix}
      style={style}
      type="primary"
    >
      <IconWidget infer="Move" />
    </Button>
  );
});

DragHandler.displayName = 'DragHandler';
