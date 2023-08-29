import React from 'react';
import { ClosestPosition } from '@designable/core';
import { observer } from '@formily/reactive-react';

import { useOutlineDragon, usePrefix } from '../../hooks';

export const Insertion = observer(({ workspaceId }) => {
  const outlineDragon = useOutlineDragon(workspaceId);
  const prefix = usePrefix('outline-tree-insertion');

  const createInsertionStyle = () => {
    const closestDirection = outlineDragon.closestDirection;
    const closestRect = outlineDragon.closestOffsetRect;

    const baseStyle = {
      position: 'absolute',
      transform: 'perspective(1px) translate3d(0,0,0)',
      top: 0,
      left: 0,
    };

    if (!closestRect) {
      return baseStyle;
    }

    if (
      closestDirection === ClosestPosition.After ||
      closestDirection === ClosestPosition.InnerAfter ||
      closestDirection === ClosestPosition.Under ||
      closestDirection === ClosestPosition.ForbidAfter ||
      closestDirection === ClosestPosition.ForbidInnerAfter ||
      closestDirection === ClosestPosition.ForbidUnder
    ) {
      baseStyle.width = closestRect.width;
      baseStyle.height = 2;
      baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${
        closestRect.y + closestRect.height - 2
      }px,0)`;
    } else if (
      closestDirection === ClosestPosition.Before ||
      closestDirection === ClosestPosition.InnerBefore ||
      closestDirection === ClosestPosition.Upper ||
      closestDirection === ClosestPosition.ForbidBefore ||
      closestDirection === ClosestPosition.ForbidInnerBefore ||
      closestDirection === ClosestPosition.ForbidUpper
    ) {
      baseStyle.width = closestRect.width;
      baseStyle.height = 2;
      baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`;
    }

    baseStyle.backgroundColor = closestDirection.includes('FORBID')
      ? 'red'
      : '';

    return baseStyle;
  };

  if (!outlineDragon?.closestNode) return null;

  return <div className={prefix} style={createInsertionStyle()}></div>;
});

Insertion.displayName = 'Insertion';
