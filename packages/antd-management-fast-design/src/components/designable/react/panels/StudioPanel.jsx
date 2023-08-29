import cls from 'classnames';
import React from 'react';

import { Layout } from '../containers';
import { usePosition, usePrefix } from '../hooks';

const StudioPanelInternal = ({ logo, actions, ...properties }) => {
  const prefix = usePrefix('main-panel');
  const position = usePosition();
  const classNameBase = cls('root', position, properties.className);

  if (logo || actions) {
    return (
      <div
        {...properties}
        className={cls(`${prefix}-container`, classNameBase)}
      >
        {/* <div className={prefix + '-header'}>
          <div className={prefix + '-header-logo'}>{logo}</div>
          <div className={prefix + '-header-actions'}>{actions}</div>
        </div> */}
        <div className={prefix}>{properties.children}</div>
      </div>
    );
  }

  return (
    <div {...properties} className={cls(prefix, classNameBase)}>
      {properties.children}
    </div>
  );
};

export const StudioPanel = (properties) => {
  return (
    <Layout
      theme={properties.theme}
      prefixCls={properties.prefixCls}
      position={properties.position}
    >
      <StudioPanelInternal {...properties} />
    </Layout>
  );
};
