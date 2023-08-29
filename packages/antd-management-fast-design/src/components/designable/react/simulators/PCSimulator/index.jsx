import cls from 'classnames';
import React from 'react';

import { usePrefix } from '../../hooks';

import './styles.less';

export const PCSimulator = (properties) => {
  const prefix = usePrefix('pc-simulator');

  return (
    <div {...properties} className={cls(prefix, properties.className)}>
      {properties.children}
    </div>
  );
};
