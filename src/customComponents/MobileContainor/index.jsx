import React, { PureComponent } from 'react';

import VerticalBox from '../VerticalBox';

import styles from './index.less';

class MobileContainor extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.deviceContainor}>
        <VerticalBox
          align="center"
          alignJustify="center"
          style={{
            height: '100%',
          }}
        >
          <div className={styles.device}>
            <div className={styles.deviceInner}>{children}</div>
          </div>
        </VerticalBox>
      </div>
    );
  }
}

export default MobileContainor;
