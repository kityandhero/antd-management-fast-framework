import classNames from 'classnames';
import React from 'react';

import { isFunction } from 'easy-soft-utility';

import styles from './index.less';

function CellMarker(properties) {
  const {
    useHover,
    data,
    highlight,
    highlightMode,
    onClick: onClickCallback,
  } = properties;

  return (
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
}

CellMarker.defaultProps = {
  useHover: true,
};

export { CellMarker };
