import cls from 'classnames';
import React, { useEffect, useState } from 'react';

import { usePrefix } from '../../../react';

import './styles.less';

export const PositionInput = (properties) => {
  const prefix = usePrefix('position-input');
  const [current, setCurrent] = useState(properties.value);
  useEffect(() => {
    if (!properties.value) {
      setCurrent('center');
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
      <div className={prefix + '-row'}>
        <div {...createCellProperties('top')}>┳</div>
      </div>
      <div className={prefix + '-row'}>
        <div {...createCellProperties('left')}>┣</div>
        <div {...createCellProperties('center')}>╋</div>
        <div {...createCellProperties('right')}>┫</div>
      </div>
      <div className={prefix + '-row'}>
        <div {...createCellProperties('bottom')}>┻</div>
      </div>
    </div>
  );
};
