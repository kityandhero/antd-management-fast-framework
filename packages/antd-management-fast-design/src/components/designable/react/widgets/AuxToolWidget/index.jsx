import React, { useEffect, useRef } from 'react';

import { useDesigner, usePrefix, useViewport } from '../../hooks';

import { Cover } from './Cover';
import { DashedBox } from './DashedBox';
import { FreeSelection } from './FreeSelection';
import { Insertion } from './Insertion';
import { Selection } from './Selection';

import './styles.less';

export const AuxToolWidget = () => {
  const engine = useDesigner();
  const viewport = useViewport();
  const prefix = usePrefix('auxtool');
  const reference = useRef();

  useEffect(() => {
    return engine.subscribeWith('viewport:scroll', () => {
      if (viewport.isIframe && reference.current) {
        reference.current.style.transform = `perspective(1px) translate3d(${-viewport.scrollX}px,${-viewport.scrollY}px,0)`;
      }
    });
  }, [engine, viewport]);

  if (!viewport) {
    return null;
  }

  return (
    <div ref={reference} className={prefix}>
      <Insertion />
      <DashedBox />
      <Selection />
      <Cover />
      <FreeSelection />
    </div>
  );
};

AuxToolWidget.displayName = 'AuxToolWidget';
