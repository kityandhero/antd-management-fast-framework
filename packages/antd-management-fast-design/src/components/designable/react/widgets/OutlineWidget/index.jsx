import cls from 'classnames';
import React, { useLayoutEffect, useRef } from 'react';
import { globalThisPolyfill } from '@designable/shared';
import { observer } from '@formily/reactive-react';

import { useOutline, usePrefix, useTree, useWorkbench } from '../../hooks';

import { NodeContext } from './context';
import { Insertion } from './Insertion';
import { OutlineTreeNode } from './OutlineNode';

export const OutlineTreeWidget = observer(
  ({
    // onClose,
    style,
    renderActions,
    renderTitle,
    className,
    ...properties
  }) => {
    const reference = useRef();
    const prefix = usePrefix('outline-tree');
    const workbench = useWorkbench();
    const current = workbench?.activeWorkspace || workbench?.currentWorkspace;
    const workspaceId = current?.id;
    const tree = useTree(workspaceId);
    const outline = useOutline(workspaceId);
    const outlineReference = useRef();

    useLayoutEffect(() => {
      if (!workspaceId) {
        return;
      }

      if (outlineReference.current && outlineReference.current !== outline) {
        outlineReference.current.onUnmount();
      }

      if (reference.current && outline) {
        outline.onMount(reference.current, globalThisPolyfill);
      }

      outlineReference.current = outline;

      return () => {
        outline.onUnmount();
      };
    }, [workspaceId, outline]);

    if (!outline || !workspaceId) {
      return null;
    }

    return (
      <NodeContext.Provider value={{ renderActions, renderTitle }}>
        <div
          {...properties}
          className={cls(prefix + '-container', className)}
          style={style}
        >
          <div className={prefix + '-content'} ref={reference}>
            <OutlineTreeNode node={tree} workspaceId={workspaceId} />
            <div
              className={prefix + '-aux'}
              style={{
                pointerEvents: 'none',
              }}
            >
              <Insertion workspaceId={workspaceId} />
            </div>
          </div>
        </div>
      </NodeContext.Provider>
    );
  },
);
