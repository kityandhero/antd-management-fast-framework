import React from 'react';
import { ClosestPosition } from '@designable/core';
import { observer } from '@formily/reactive-react';

import { useDragon, usePrefix } from '../../hooks';

export const Insertion = observer(() => {
  const viewportDragon = useDragon();
  const prefix = usePrefix('aux-insertion');
  const createInsertionStyle = () => {
    const closestDirection = viewportDragon.closestDirection;
    const closestRect = viewportDragon.closestOffsetRect;
    const isInlineLayout = viewportDragon.getClosestLayout() === 'horizontal';
    const baseStyle = {
      position: 'absolute',
      transform: 'perspective(1px) translate3d(0,0,0)',
      top: 0,
      left: 0,
    };

    if (!closestRect) {
      return baseStyle;
    }

    switch (closestDirection) {
      case ClosestPosition.Before:
      case ClosestPosition.ForbidBefore: {
        baseStyle.width = 2;
        baseStyle.height = closestRect.height;
        baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`;

        break;
      }
      case ClosestPosition.After:
      case ClosestPosition.ForbidAfter: {
        baseStyle.width = 2;
        baseStyle.height = closestRect.height;
        baseStyle.transform = `perspective(1px) translate3d(${
          closestRect.x + closestRect.width - 2
        }px,${closestRect.y}px,0)`;

        break;
      }
      case ClosestPosition.InnerAfter:
      case ClosestPosition.Under:
      case ClosestPosition.ForbidInnerAfter:
      case ClosestPosition.ForbidUnder: {
        if (isInlineLayout) {
          baseStyle.width = 2;
          baseStyle.height = closestRect.height;
          baseStyle.transform = `perspective(1px) translate3d(${
            closestRect.x + closestRect.width - 2
          }px,${closestRect.y}px,0)`;
        } else {
          baseStyle.width = closestRect.width;
          baseStyle.height = 2;
          baseStyle.transform = `perspective(1px) translate3d(${
            closestRect.x
          }px,${closestRect.y + closestRect.height - 2}px,0)`;
        }

        break;
      }
      case ClosestPosition.InnerBefore:
      case ClosestPosition.Upper:
      case ClosestPosition.ForbidInnerBefore:
      case ClosestPosition.ForbidUpper: {
        if (isInlineLayout) {
          baseStyle.width = 2;
          baseStyle.height = closestRect.height;
          baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`;
        } else {
          baseStyle.width = closestRect.width;
          baseStyle.height = 2;
          baseStyle.transform = `perspective(1px) translate3d(${closestRect.x}px,${closestRect.y}px,0)`;
        }

        break;
      }
      // No default
    }

    if (closestDirection.includes('FORBID')) {
      baseStyle.backgroundColor = 'red';
    }

    return baseStyle;
  };

  return <div className={prefix} style={createInsertionStyle()}></div>;
});

Insertion.displayName = 'Insertion';
