import cls from 'classnames';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { globalThisPolyfill, requestIdle } from '@designable/shared';

import { usePrefix, useViewport } from '../hooks';
import { AuxToolWidget, EmptyWidget } from '../widgets';

export const Viewport = ({ placeholder, dragTipsDirection, ...properties }) => {
  const [loaded, setLoaded] = useState(false);
  const prefix = usePrefix('viewport');
  const viewport = useViewport();
  const reference = useRef();
  const viewportReference = useRef();
  const isFrameReference = useRef(false);

  useLayoutEffect(() => {
    const frameElement = reference.current?.querySelector('iframe');

    if (!viewport) return;

    if (viewportReference.current && viewportReference.current !== viewport) {
      viewportReference.current.onUnmount();
    }

    if (frameElement) {
      frameElement.addEventListener('load', () => {
        viewport.onMount(frameElement, frameElement.contentWindow);
        requestIdle(() => {
          isFrameReference.current = true;
          setLoaded(true);
        });
      });
    } else {
      viewport.onMount(reference.current, globalThisPolyfill);
      requestIdle(() => {
        isFrameReference.current = false;
        setLoaded(true);
      });
    }

    viewportReference.current = viewport;

    return () => {
      viewport.onUnmount();
    };
  }, [viewport]);

  return (
    <div
      {...properties}
      ref={reference}
      className={cls(prefix, properties.className)}
      style={{
        opacity: loaded ? 1 : 0,
        overflow: isFrameReference.current ? 'hidden' : 'overlay',
        ...properties.style,
      }}
    >
      {properties.children}

      <AuxToolWidget />

      <EmptyWidget dragTipsDirection={dragTipsDirection}>
        {placeholder}
      </EmptyWidget>
    </div>
  );
};
