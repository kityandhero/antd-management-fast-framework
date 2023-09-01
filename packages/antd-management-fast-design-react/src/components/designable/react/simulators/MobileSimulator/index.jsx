import cls from 'classnames';
import React from 'react';

import { usePrefix } from '../../hooks';

import { MobileBody } from './body';

import './styles.less';

export const MobileSimulator = (properties) => {
  const prefix = usePrefix('mobile-simulator');
  return (
    <div {...properties} className={cls(prefix, properties.className)}>
      <div className={prefix + '-content'}>
        <MobileBody>{properties.children}</MobileBody>
      </div>
    </div>
  );
};
