import React, { Fragment } from 'react';
import { observer } from '@formily/reactive-react';

import {
  useCursor,
  useDesigner,
  useDragon,
  usePrefix,
  useSelection,
  useTree,
  useValidNodeOffsetRect,
} from '../../hooks';

import { Helpers } from './Helpers';
import { ResizeHandler } from './ResizeHandler';
import { TranslateHandler } from './TranslateHandler';

export const SelectionBox = (properties) => {
  const designer = useDesigner();
  const prefix = usePrefix('aux-selection-box');
  const innerPrefix = usePrefix('aux-selection-box-inner');
  const nodeRect = useValidNodeOffsetRect(properties.node);

  const createSelectionStyle = () => {
    const baseStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      boxSizing: 'border-box',
    };

    if (nodeRect) {
      baseStyle.transform = `perspective(1px) translate3d(${nodeRect.x}px,${nodeRect.y}px,0)`;
      baseStyle.height = nodeRect.height;
      baseStyle.width = nodeRect.width;
    }

    return baseStyle;
  };

  if (!nodeRect) {
    return null;
  }

  if (!nodeRect.width || !nodeRect.height) {
    return null;
  }

  const selectionId = {
    [designer.props?.nodeSelectionIdAttrName]: properties.node.id,
  };

  return (
    <div {...selectionId} className={prefix} style={createSelectionStyle()}>
      <div className={innerPrefix}></div>
      <ResizeHandler node={properties.node} />
      <TranslateHandler node={properties.node} />
      {properties.showHelpers && (
        <Helpers {...properties} node={properties.node} nodeRect={nodeRect} />
      )}
    </div>
  );
};

export const Selection = observer(() => {
  const selection = useSelection();
  const tree = useTree();
  const cursor = useCursor();
  const viewportDragon = useDragon();

  if (cursor.status !== 'NORMAL' && viewportDragon.touchNode) {
    return null;
  }

  return (
    <Fragment>
      {selection.selected.map((id) => {
        const node = tree.findById(id);
        if (!node) return;
        if (node.hidden) return;
        return (
          <SelectionBox
            key={id}
            node={node}
            showHelpers={selection.selected.length === 1}
          />
        );
      })}
    </Fragment>
  );
});

Selection.displayName = 'Selection';
