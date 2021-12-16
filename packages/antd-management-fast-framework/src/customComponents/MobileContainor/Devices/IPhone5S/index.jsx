import React, { PureComponent } from 'react';
import classNames from 'classnames';

import { inCollection } from '../../../../utils/tools';

import styles from '../devices.less';

class Index extends PureComponent {
  render() {
    const { type: typeSource, children } = this.props;

    const type = inCollection(['black', 'silver', 'gold'], typeSource)
      ? typeSource
      : 'silver';

    return (
      <div className={styles.devices}>
        <div
          className={classNames(
            styles['marvel-device'],
            styles.iphone5s,
            styles[type],
          )}
        >
          <div className={styles['top-bar']} />
          <div className={styles.sleep} />
          <div className={styles.volume} />
          <div className={styles.camera} />
          <div className={styles.sensor} />
          <div className={styles.speaker} />
          <div className={styles.screen}>{children}</div>
          <div className={styles.home} />
          <div className={styles['bottom-bar']} />
        </div>
      </div>
    );
  }
}

Index.defaultProps = {
  type: 'silver',
};

export default Index;