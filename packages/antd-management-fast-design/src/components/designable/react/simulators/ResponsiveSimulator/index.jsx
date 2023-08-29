import cls from 'classnames';
import React, { useRef } from 'react';
import {
  DragMoveEvent,
  DragStartEvent,
  DragStopEvent,
  ScreenStatus,
} from '@designable/core';
import {
  calcSpeedFactor,
  createUniformSpeedAnimation,
} from '@designable/shared';
import { observer } from '@formily/reactive-react';

import { useDesigner, usePrefix, useScreen } from '../../hooks';
import { IconWidget } from '../../widgets';

import { ResizeHandle, ResizeHandleType } from './handle';

import './styles.less';

const getStyle = (status) => {
  if (status === ResizeHandleType.Resize) return 'nwse-resize';
  if (status === ResizeHandleType.ResizeHeight) return 'ns-resize';
  if (status === ResizeHandleType.ResizeWidth) return 'ew-resize';
};

const useResizeEffect = (container, content, engine) => {
  let status = null;
  let startX = 0;
  let startY = 0;
  let startWidth = 0;
  let startHeight = 0;
  let animationX = null;
  let animationY = null;

  const updateSize = (deltaX, deltaY) => {
    const containerRect = container.current?.getBoundingClientRect();

    switch (status) {
      case ResizeHandleType.Resize: {
        engine.screen.setSize(startWidth + deltaX, startHeight + deltaY);

        container.current.scrollBy(
          containerRect.width + deltaX,
          containerRect.height + deltaY,
        );

        break;
      }

      case ResizeHandleType.ResizeHeight: {
        engine.screen.setSize(startWidth, startHeight + deltaY);

        container.current.scrollBy(
          container.current.scrollLeft,
          containerRect.height + deltaY,
        );

        break;
      }

      case ResizeHandleType.ResizeWidth: {
        engine.screen.setSize(startWidth + deltaX, startHeight);

        container.current.scrollBy(
          containerRect.width + deltaX,
          container.current.scrollTop,
        );

        break;
      }

      // No default
    }
  };

  engine.subscribeTo(DragStartEvent, (event) => {
    if (!engine.workbench.currentWorkspace?.viewport) {
      return;
    }

    const target = event.data.target;

    if (target?.closest('*[data-designer-resize-handle]')) {
      const rect = content.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      status = target.dataset.designerResizeHandle;
      engine.cursor.setStyle(getStyle(status) || '');
      startX = event.data.topClientX || 0;
      startY = event.data.topClientY || 0;
      startWidth = rect.width;
      startHeight = rect.height;

      engine.screen.setStatus(ScreenStatus.Resizing);
    }
  });

  engine.subscribeTo(DragMoveEvent, (event) => {
    if (!engine.workbench.currentWorkspace?.viewport) {
      return;
    }

    if (!status) {
      return;
    }

    const deltaX = (event.data.topClientX || 0) - startX;
    const deltaY = (event.data.topClientY || 0) - startY;
    const containerRect = container.current?.getBoundingClientRect();
    const distanceX = Math.floor(
      containerRect.right - (event.data.topClientX || 0),
    );
    const distanceY = Math.floor(
      containerRect.bottom - (event.data.topClientY || 0),
    );
    const factorX = calcSpeedFactor(distanceX, 10);
    const factorY = calcSpeedFactor(distanceY, 10);

    updateSize(deltaX, deltaY);

    if (distanceX <= 10) {
      if (!animationX) {
        animationX = createUniformSpeedAnimation(1000 * factorX, (delta) => {
          updateSize(deltaX + delta, deltaY);
        });
      }
    } else {
      if (animationX) {
        animationX = animationX();
      }
    }

    if (distanceY <= 10) {
      if (!animationY) {
        animationY = createUniformSpeedAnimation(300 * factorY, (delta) => {
          updateSize(deltaX, deltaY + delta);
        });
      }
    } else {
      if (animationY) {
        animationY = animationY();
      }
    }
  });

  engine.subscribeTo(DragStopEvent, () => {
    if (!status) {
      return;
    }

    status = null;
    engine.cursor.setStyle('');
    engine.screen.setStatus(ScreenStatus.Normal);

    if (animationX) {
      animationX = animationX();
    }
    if (animationY) {
      animationY = animationY();
    }
  });
};

export const ResponsiveSimulator = observer((properties) => {
  const container = useRef();
  const content = useRef();
  const prefix = usePrefix('responsive-simulator');
  const screen = useScreen();

  useDesigner((engine) => {
    useResizeEffect(container, content, engine);
  });

  return (
    <div
      {...properties}
      className={cls(prefix, properties.className)}
      style={{
        height: '100%',
        width: '100%',
        minHeight: 100,
        position: 'relative',
        ...properties.style,
      }}
    >
      <div
        ref={container}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          overflow: 'overlay',
        }}
      >
        <div
          ref={content}
          style={{
            width: screen.width,
            height: screen.height,
            paddingRight: 15,
            paddingBottom: 15,
            position: 'relative',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {properties.children}

          <ResizeHandle type={ResizeHandleType.Resize}>
            <IconWidget infer="DragMove" style={{ pointerEvents: 'none' }} />
          </ResizeHandle>

          <ResizeHandle type={ResizeHandleType.ResizeHeight}>
            <IconWidget infer="Menu" style={{ pointerEvents: 'none' }} />
          </ResizeHandle>

          <ResizeHandle type={ResizeHandleType.ResizeWidth}>
            <IconWidget infer="Menu" style={{ pointerEvents: 'none' }} />
          </ResizeHandle>
        </div>
      </div>
    </div>
  );
});
