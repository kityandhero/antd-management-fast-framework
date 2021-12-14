import React, { PureComponent } from 'react';

import styles from './index.less';

class MobileContainor extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.device}>
        <div className={styles.deviceInner}>{children}</div>
      </div>
    );
  }
}

export default MobileContainor;
