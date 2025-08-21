import React, { useEffect, useRef } from 'react';
import { GlobalRegistry } from '@designable/core';

import { DesignerEngineContext } from '../context';
import { useDesigner } from '../hooks';
import * as icons from '../icons';
import { GhostWidget } from '../widgets';

import { Layout } from './Layout';

GlobalRegistry.registerDesignerIcons(icons);

export const Designer = (properties) => {
  const engine = useDesigner();
  const reference = useRef();

  const propertiesAdjust = {
    prefixCls: 'dn-',
    theme: 'light',
    ...properties,
  };

  useEffect(() => {
    if (propertiesAdjust.engine) {
      if (
        propertiesAdjust.engine &&
        reference.current &&
        propertiesAdjust.engine !== reference.current
      ) {
        reference.current.unmount();
      }
      propertiesAdjust.engine.mount();
      reference.current = propertiesAdjust.engine;
    }
    return () => {
      if (propertiesAdjust.engine) {
        propertiesAdjust.engine.unmount();
      }
    };
  }, [propertiesAdjust.engine]);

  if (engine)
    throw new Error(
      'There can only be one Designable Engine Context in the React Tree',
    );

  return (
    <Layout {...propertiesAdjust}>
      <DesignerEngineContext.Provider value={propertiesAdjust.engine}>
        {propertiesAdjust.children}
        <GhostWidget />
      </DesignerEngineContext.Provider>
    </Layout>
  );
};
