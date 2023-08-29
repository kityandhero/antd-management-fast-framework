import cls from 'classnames';
import React, { useContext, useEffect, useRef } from 'react';
import { ClosestPosition, CursorStatus, DragMoveEvent } from '@designable/core';
import { isFn } from '@designable/shared';
import { autorun } from '@formily/reactive';
import { observer } from '@formily/reactive-react';

import {
  useCursor,
  useDesigner,
  useOutlineDragon,
  usePrefix,
  useSelection,
} from '../../hooks';
import { IconWidget } from '../IconWidget';
import { NodeTitleWidget } from '../NodeTitleWidget';

import { NodeContext } from './context';

import './styles.less';

export const OutlineTreeNode = observer(
  ({ node, className, style, workspaceId }) => {
    const prefix = usePrefix('outline-tree-node');
    const engine = useDesigner();
    const reference = useRef();
    const context = useContext(NodeContext);
    const request = useRef(null);
    const cursor = useCursor();
    const selection = useSelection(workspaceId);
    const outlineDragon = useOutlineDragon(workspaceId);

    useEffect(() => {
      return engine.subscribeTo(DragMoveEvent, () => {
        const closestNodeId = outlineDragon?.closestNode?.id;
        const closestDirection = outlineDragon?.closestDirection;
        const id = node.id;

        if (!reference.current) {
          return;
        }

        if (
          closestNodeId === id &&
          closestDirection === ClosestPosition.Inner
        ) {
          if (!reference.current.classList.contains('droppable')) {
            reference.current.classList.add('droppable');
          }

          if (!reference.current.classList.contains('expanded')) {
            if (request.current) {
              clearTimeout(request.current);
              request.current = null;
            }

            request.current = setTimeout(() => {
              reference.current?.classList.add('expanded');
            }, 600);
          }
        } else {
          if (request.current) {
            clearTimeout(request.current);
            request.current = null;
          }

          if (reference.current.classList.contains('droppable')) {
            reference.current.classList.remove('droppable');
          }
        }
      });
    }, [node, outlineDragon, cursor]);

    useEffect(() => {
      return autorun(() => {
        const selectedIds = selection?.selected || [];
        const id = node.id;

        if (!reference.current) {
          return;
        }

        if (selectedIds.includes(id)) {
          if (!reference.current.classList.contains('selected')) {
            reference.current.classList.add('selected');
          }
        } else {
          if (reference.current.classList.contains('selected')) {
            reference.current.classList.remove('selected');
          }
        }

        if (
          cursor.status === CursorStatus.Dragging &&
          outlineDragon?.dragNodes?.length &&
          reference.current.classList.contains('selected')
        ) {
          reference.current.classList.remove('selected');
        }
      });
    }, [node, selection, outlineDragon]);

    if (!node) {
      return null;
    }

    const renderIcon = (node) => {
      const icon = node.designerProps.icon;

      if (icon) {
        return <IconWidget infer={icon} size={12} />;
      }

      if (node === node?.root) {
        return <IconWidget infer="Page" size={12} />;
      } else if (node.designerProps?.droppable) {
        return <IconWidget infer="Container" size={12} />;
      }

      return <IconWidget infer="Component" size={12} />;
    };

    const renderTitle = (node) => {
      if (isFn(context?.renderTitle)) {
        return context?.renderTitle(node);
      }

      return (
        <span>
          <NodeTitleWidget node={node} />
        </span>
      );
    };

    const renderActions = (node) => {
      if (isFn(context?.renderActions)) {
        return context?.renderActions(node);
      }
    };

    return (
      <div
        style={style}
        ref={reference}
        className={cls(prefix, className, 'expanded')}
        data-designer-outline-node-id={node.id}
      >
        <div className={prefix + '-header'}>
          <div
            className={prefix + '-header-head'}
            style={{
              left: -node.depth * 16,
              width: node.depth * 16,
            }}
          ></div>

          <div className={prefix + '-header-content'}>
            <div className={prefix + '-header-base'}>
              {(node?.children?.length > 0 || node === node.root) && (
                <div
                  className={prefix + '-expand'}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (reference.current?.classList?.contains('expanded')) {
                      reference.current?.classList.remove('expanded');
                    } else {
                      reference.current?.classList.add('expanded');
                    }
                  }}
                >
                  <IconWidget infer="Expand" size={10} />
                </div>
              )}
              <div className={prefix + '-icon'}>{renderIcon(node)}</div>
              <div className={prefix + '-title'}>{renderTitle(node)}</div>
            </div>

            <div
              className={prefix + '-header-actions'}
              data-click-stop-propagation
            >
              {renderActions(node)}
              {node !== node.root && (
                <IconWidget
                  className={cls(prefix + '-hidden-icon', {
                    hidden: node.hidden,
                  })}
                  infer={node.hidden ? 'EyeClose' : 'Eye'}
                  size={14}
                  onClick={() => {
                    node.hidden = !node.hidden;
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className={prefix + '-children'}>
          {node.children?.map((child) => {
            return (
              <OutlineTreeNode
                node={child}
                key={child.id}
                workspaceId={workspaceId}
              />
            );
          })}
        </div>
      </div>
    );
  },
);
