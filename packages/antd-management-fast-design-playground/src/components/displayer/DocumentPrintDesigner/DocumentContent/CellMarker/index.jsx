import { Popover } from 'antd';
import classNames from 'classnames';
import React from 'react';

import { isFunction } from 'easy-soft-utility';

import { ItemConfigBox } from '../ItemConfigBox';
import { adjustCellConfig } from '../tools';

import styles from './index.less';

function CellMarker(properties) {
  const {
    useHover,
    data,
    highlight,
    highlightMode,
    onClick: onClickCallback,
    onConfigChange,
  } = {
    useHover: true,
    ...properties,
  };

  const currentItem = adjustCellConfig(data);

  const maker = (
    <div
      className={classNames(
        styles.cellMarker,
        useHover ? styles.cellMarkerEdit : null,
      )}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        ...(highlight ? { backgroundColor: 'rgba(90, 72, 0, 0.6)' } : {}),
      }}
      onClick={() => {
        if (!isFunction(onClickCallback)) {
          return;
        }

        onClickCallback(data, highlightMode);
      }}
    ></div>
  );

  if (highlight) {
    return (
      <Popover
        // title="属性配置："
        content={
          <ItemConfigBox
            data={currentItem}
            highlightMode={highlightMode}
            onChange={(o) => {
              if (!isFunction(onConfigChange)) {
                return;
              }

              onConfigChange(o);
            }}
          />
        }
      >
        {maker}
      </Popover>
    );
  }

  return maker;
}

export { CellMarker };
