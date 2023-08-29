import cls from 'classnames';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { reaction } from '@formily/reactive';

import { usePrefix, useViewport } from '../../hooks';

import { Copy } from './Copy';
import { Delete } from './Delete';
import { DragHandler } from './DragHandler';
import { Selector } from './Selector';

const HELPER_DEBOUNCE_TIMEOUT = 100;

export const Helpers = ({ node, nodeRect }) => {
  const prefix = usePrefix('aux-helpers');
  const viewport = useViewport();
  const unmountReference = useRef(false);
  const reference = useRef();
  const [position, setPosition] = useState('top-right');

  useLayoutEffect(() => {
    let request = null;

    const getYInViewport = (nodeRect, helpersRect) => {
      if (nodeRect.top - viewport.scrollY > helpersRect.height) {
        return 'top';
      } else if (
        viewport.isScrollTop &&
        nodeRect.height + helpersRect.height > viewport.height
      ) {
        return 'inner-top';
      } else if (
        viewport.isScrollBottom &&
        nodeRect.height + helpersRect.height > viewport.height
      ) {
        return 'inner-bottom';
      }

      return 'bottom';
    };

    const getXInViewport = (nodeRect, helpersRect) => {
      const widthDelta = helpersRect.width - nodeRect.width;

      if (widthDelta >= 0) {
        if (nodeRect.x < widthDelta) {
          return 'left';
        } else if (nodeRect.right + widthDelta > viewport.width) {
          return 'right';
        } else {
          return 'center';
        }
      }
      return 'right';
    };

    const update = () => {
      const helpersRect = reference.current?.getBoundingClientRect();
      if (!helpersRect || !nodeRect) return;
      if (unmountReference.current) return;
      setPosition(
        getYInViewport(nodeRect, helpersRect) +
          '-' +
          getXInViewport(nodeRect, helpersRect),
      );
    };

    update();

    return reaction(
      () => [
        viewport.width,
        viewport.height,
        viewport.scrollX,
        viewport.scrollY,
        viewport.isScrollBottom,
        viewport.isScrollTop,
      ],
      () => {
        clearTimeout(request);
        request = setTimeout(update, HELPER_DEBOUNCE_TIMEOUT);
      },
    );
  }, [viewport, nodeRect]);

  if (!nodeRect || !node) return null;

  return (
    <div
      className={cls(prefix, {
        [position]: true,
      })}
      ref={reference}
    >
      <div className={cls(prefix + '-content')}>
        <Selector node={node} />
        {node?.allowClone() === false ? null : <Copy node={node} />}
        {node?.allowDrag() === false ? null : <DragHandler node={node} />}
        {node?.allowDelete() === false ? null : <Delete node={node} />}
      </div>
    </div>
  );
};

Helpers.displayName = 'Helpers';
