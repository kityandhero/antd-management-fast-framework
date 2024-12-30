import { Popover } from 'antd';
import classNames from 'classnames';
import React from 'react';

import { isFunction } from 'easy-soft-utility';

import { TitleConfigBox } from '../TitleConfigBox';
import { adjustTitleConfig } from '../tools';

import styles from './index.less';

function TitleMarker(properties) {
  const { data, onChange } = {
    ...properties,
  };

  const currentItem = adjustTitleConfig(data);

  const maker = (
    <div
      className={classNames(styles.cellMarker)}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
      }}
    ></div>
  );

  return (
    <Popover
      content={
        <TitleConfigBox
          data={currentItem}
          onChange={(o) => {
            if (!isFunction(onChange)) {
              return;
            }

            onChange(o);
          }}
        />
      }
    >
      {maker}
    </Popover>
  );
}

export { TitleMarker };
