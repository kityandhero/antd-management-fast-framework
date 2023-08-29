import cls from 'classnames';
import React, { useState } from 'react';
import { observer, useField } from '@formily/react';

import { IconWidget, usePrefix } from '../../../react';

import './styles.less';

export const CollapseItem = observer((properties) => {
  const prefix = usePrefix('collapse-item');
  const field = useField();
  const [expand, setExpand] = useState(properties.defaultExpand ?? true);
  return (
    <div
      className={cls(prefix, properties.className, { expand })}
      style={properties.style}
    >
      <div
        className={prefix + '-header'}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          setExpand(!expand);
        }}
      >
        <div className={prefix + '-header-expand'}>
          <IconWidget infer="Expand" size={10} />
        </div>

        <div className={prefix + '-header-content'}>{field.title}</div>
      </div>

      <div className={prefix + '-content'}>{properties.children}</div>
    </div>
  );
});
