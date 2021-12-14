import React, { PureComponent } from 'react';
import classNames from 'classnames';

import styles from '../devices.less';

class Index extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.devices}>
        <div
          className={classNames(styles['marvel-device'], styles['iphone-x'])}
        >
          <div className={styles.notch}>
            <div className={styles.camera} />
            <div className={styles.speaker} />
          </div>
          <div className={styles['top-bar']} />
          <div className={styles.sleep} />
          <div className={styles['bottom-bar']} />
          <div className={styles.volume} />
          <div className={styles.overflow}>
            <div className={classNames(styles.shadow, styles['shadow--tr'])} />
            <div className={classNames(styles.shadow, styles['shadow--tl'])} />
            <div className={classNames(styles.shadow, styles['shadow--br'])} />
            <div className={classNames(styles.shadow, styles['shadow--bl'])} />
          </div>
          <div className={styles['inner-shadow']} />
          <div className={styles.screen}>{children}</div>
        </div>
      </div>
    );
  }
}

export default Index;
