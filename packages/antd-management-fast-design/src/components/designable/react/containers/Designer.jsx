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

  useEffect(() => {
    if (properties.engine) {
      if (
        properties.engine &&
        reference.current &&
        properties.engine !== reference.current
      ) {
        reference.current.unmount();
      }
      properties.engine.mount();
      reference.current = properties.engine;
    }
    return () => {
      if (properties.engine) {
        properties.engine.unmount();
      }
    };
  }, [properties.engine]);

  if (engine)
    throw new Error(
      'There can only be one Designable Engine Context in the React Tree',
    );

  return (
    <Layout {...properties}>
      <DesignerEngineContext.Provider value={properties.engine}>
        {properties.children}
        <GhostWidget />
      </DesignerEngineContext.Provider>
    </Layout>
  );
};

Designer.defaultProps = {
  prefixCls: 'dn-',
  theme: 'light',
};
