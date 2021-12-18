import React, { PureComponent } from 'react';
import classNames from 'classnames';

import { inCollection } from '../../../../utils/tools';
import ContentView from '../../ContentView';

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
            styles.iphone8plus,
            styles[type],
          )}
        >
          <div className={styles['top-bar']} />
          <div className={styles.sleep} />
          <div className={styles.volume} />
          <div className={styles.camera} />
          <div className={styles.sensor} />
          <div className={styles.speaker} />
          <div className={styles.screen}>
            <ContentView>{children}</ContentView>
          </div>
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
