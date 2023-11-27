import React from 'react';

import styles from './index.less';

function CellMarker(properties) {
  const {
    data,
    highlight,
    highlightMode,
    onClick: onClickCallback,
  } = properties;

  return (
    <div
      className={styles.cellMarker}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        ...(highlight ? { backgroundColor: 'rgba(90, 72, 0, 0.6)' } : {}),
      }}
      onClick={() => {
        onClickCallback(data, highlightMode);
      }}
    ></div>
  );
}

export { CellMarker };
