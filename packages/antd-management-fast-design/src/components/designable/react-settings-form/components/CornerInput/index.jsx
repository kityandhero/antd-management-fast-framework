import cls from 'classnames';
import React, { useEffect, useState } from 'react';

import { usePrefix } from '../../../react';

import './styles.less';

export const CornerInput = (properties) => {
  const prefix = usePrefix('corner-input');
  const [current, setCurrent] = useState(properties.value);

  useEffect(() => {
    if (!properties.value) {
      setCurrent('all');
    }
  }, [properties.value]);

  const createCellProperties = (type) => ({
    className: cls(prefix + '-cell', { active: current === type }),
    onClick() {
      setCurrent(type);
      properties.onChange?.(type);
    },
  });

  return (
    <div className={cls(prefix, properties.className)} style={properties.style}>
      <div className={prefix + '-column'}>
        <div {...createCellProperties('topLeft')}>┏</div>
        <div {...createCellProperties('bottomLeft')}>┗</div>
      </div>

      <div className={prefix + '-column'}>
        <div {...createCellProperties('all')}>╋</div>
      </div>

      <div className={prefix + '-column'}>
        <div {...createCellProperties('topRight')}>┓</div>
        <div {...createCellProperties('bottomRight')}>┛</div>
      </div>
    </div>
  );
};
