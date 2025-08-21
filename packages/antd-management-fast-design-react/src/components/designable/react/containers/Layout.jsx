import cls from 'classnames';
import React, { Fragment, useContext, useLayoutEffect, useRef } from 'react';
import { each } from '@designable/shared';

import { DesignerLayoutContext } from '../context';

export const Layout = (properties) => {
  const layout = useContext(DesignerLayoutContext);
  const reference = useRef();

  const propertiesAdjust = {
    theme: 'light',
    prefixCls: 'dn-',
    position: 'fixed',
    ...properties,
  };

  useLayoutEffect(() => {
    if (reference.current) {
      each(propertiesAdjust.variables, (value, key) => {
        reference.current?.style.setProperty(`--${key}`, value);
      });
    }
  }, []);

  if (layout) {
    return <Fragment>{propertiesAdjust.children}</Fragment>;
  }

  return (
    <div
      ref={reference}
      className={cls({
        [`${propertiesAdjust.prefixCls}app`]: true,
        [`${propertiesAdjust.prefixCls}${propertiesAdjust.theme}`]:
          propertiesAdjust.theme,
      })}
    >
      <DesignerLayoutContext.Provider
        value={{
          theme: propertiesAdjust.theme,
          prefixCls: propertiesAdjust.prefixCls,
          position: propertiesAdjust.position,
        }}
      >
        {propertiesAdjust.children}
      </DesignerLayoutContext.Provider>
    </div>
  );
};
