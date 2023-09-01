import React from 'react';
import { observer } from '@formily/reactive-react';

import { usePrefix } from 'antd-management-fast-design-react';

import './styles.less';

export const Header = observer(({ extra, title }) => {
  const prefix = usePrefix('data-source-setter');
  return (
    <div className={`${prefix + '-layout-item-header'}`}>
      <div className={`${prefix + '-layout-item-title'}`}>{title}</div>
      {extra}
    </div>
  );
});
