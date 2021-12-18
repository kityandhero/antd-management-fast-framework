import React, { PureComponent } from 'react';
import classNames from 'classnames';

import ContentView from '../../ContentView';

import styles from '../devices.less';

class Index extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.devices}>
        <div className={classNames(styles['marvel-device'], styles.note8)}>
          <div className={styles.inner} />
          <div className={styles.overflow}>
            <div className={styles.shadow} />
          </div>
          <div className={styles.speaker} />
          <div className={styles.sensors} />
          <div className={styles['more-sensors']} />
          <div className={styles.sleep} />
          <div className={styles.volume} />
          <div className={styles.camera} />
          <div className={styles.screen}>
            <ContentView>{children}</ContentView>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
