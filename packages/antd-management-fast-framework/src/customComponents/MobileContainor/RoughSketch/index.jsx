import React, { PureComponent } from 'react';

import ContentView from '../ContentView';

import styles from './index.less';

class MobileContainor extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.device}>
        <ContentView>{children}</ContentView>
      </div>
    );
  }
}

export default MobileContainor;
