import React, { PureComponent } from 'react';

import styles from './index.less';

class ConventView extends PureComponent {
  render() {
    const { children } = this.props;

    return <div className={styles.deviceInner}>{children}</div>;
  }
}

export default ConventView;
