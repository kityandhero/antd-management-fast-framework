import cls from 'classnames';
import React, { Fragment, useContext, useLayoutEffect, useRef } from 'react';
import { each } from '@designable/shared';

import { DesignerLayoutContext } from '../context';

export const Layout = (properties) => {
  const layout = useContext(DesignerLayoutContext);
  const reference = useRef();

  useLayoutEffect(() => {
    if (reference.current) {
      each(properties.variables, (value, key) => {
        reference.current?.style.setProperty(`--${key}`, value);
      });
    }
  }, []);

  if (layout) {
    return <Fragment>{properties.children}</Fragment>;
  }

  return (
    <div
      ref={reference}
      className={cls({
        [`${properties.prefixCls}app`]: true,
        [`${properties.prefixCls}${properties.theme}`]: properties.theme,
      })}
    >
      <DesignerLayoutContext.Provider
        value={{
          theme: properties.theme,
          prefixCls: properties.prefixCls,
          position: properties.position,
        }}
      >
        {properties.children}
      </DesignerLayoutContext.Provider>
    </div>
  );
};

Layout.defaultProps = {
  theme: 'light',
  prefixCls: 'dn-',
  position: 'fixed',
};
