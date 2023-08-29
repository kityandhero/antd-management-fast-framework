import { useCallback, useEffect, useRef, useState } from 'react';
import { CursorStatus, ScreenStatus } from '@designable/core';
import { cancelIdle, requestIdle } from '@designable/shared';
import { ResizeObserver } from '@juggle/resize-observer';

import { useDesigner } from './useDesigner';
import { useViewport } from './useViewport';

const isEqualRect = (rect1, rect2) => {
  return (
    rect1?.x === rect2?.x &&
    rect1?.y === rect2?.y &&
    rect1?.width === rect2?.width &&
    rect1?.height === rect2?.height
  );
};

export const useValidNodeOffsetRect = (node) => {
  const engine = useDesigner();
  const viewport = useViewport();
  const [, forceUpdate] = useState(null);
  const rectReference = useRef(viewport.getValidNodeOffsetRect(node));
  const idleTaskReference = useRef(null);
  const unmountReference = useRef(false);
  const observerReference = useRef(null);
  const element = viewport.findElementById(node?.id);

  const compute = useCallback(() => {
    if (unmountReference.current) {
      return;
    }

    if (
      engine.cursor.status !== CursorStatus.Normal &&
      engine.screen.status === ScreenStatus.Normal
    ) {
      return;
    }

    const nextRect = viewport.getValidNodeOffsetRect(node);

    if (!isEqualRect(rectReference.current, nextRect) && nextRect) {
      rectReference.current = nextRect;

      forceUpdate(nextRect);
    }
  }, [viewport, node]);

  useEffect(() => {
    if (!element || !element.isConnected) {
      return;
    }

    if (observerReference.current) {
      observerReference.current.disconnect();
    }

    observerReference.current = new ResizeObserver(() => {
      compute();
    });

    observerReference.current.observe(element);

    return () => {
      observerReference.current.disconnect();
    };
  }, [element, viewport]);

  useEffect(() => {
    unmountReference.current = false;

    const requestIdleTask = () => {
      cancelIdle(idleTaskReference.current);
      idleTaskReference.current = requestIdle(() => {
        compute();
        requestIdleTask();
      });
    };

    requestIdleTask();

    return () => {
      unmountReference.current = true;
      cancelIdle(idleTaskReference.current);
    };
  }, [node]);

  return rectReference.current;
};
