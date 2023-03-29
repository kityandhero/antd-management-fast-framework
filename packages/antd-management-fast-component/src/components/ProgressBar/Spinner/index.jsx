import React from 'react';

import styles from './index.less';

const Spinner = () => (
  <div className={styles.amfProgressSpinner}>
    <div className={styles.amfProgressSpinnerInner} />
  </div>
);

export { Spinner };
