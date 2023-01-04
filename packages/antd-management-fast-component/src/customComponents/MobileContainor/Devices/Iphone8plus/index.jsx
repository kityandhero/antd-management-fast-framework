import classNames from 'classnames';
import React, { PureComponent } from 'react';

import { animalType } from 'antd-management-fast-common/es/utils/constants';
import { inCollection } from 'antd-management-fast-common/es/utils/tools';

import ContentView from '../../ContentView';

import styles from '../devices.less';

class Iphone8plus extends PureComponent {
  render() {
    const {
      alertVisible,
      alertAnimationType,
      alertMessage,
      alertDescription,
      alertIcon,
      alertType,
      alertButtonText,
      afterAlertClick,
      children,
      type: typeSource,
    } = this.props;

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
            <ContentView
              alertVisible={alertVisible}
              alertAnimationType={alertAnimationType}
              alertMessage={alertMessage}
              alertDescription={alertDescription}
              alertIcon={alertIcon}
              alertType={alertType}
              alertButtonText={alertButtonText}
              afterAlertClick={afterAlertClick}
            >
              {children}
            </ContentView>
          </div>
          <div className={styles.home} />
          <div className={styles['bottom-bar']} />
        </div>
      </div>
    );
  }
}

Iphone8plus.defaultProps = {
  alertVisible: false,
  alertAnimationType: animalType.fade,
  alertMessage: '',
  alertDescription: '',
  alertType: 'info',
  alertIcon: true,
  alertButtonText: '刷新',
  afterAlertClick: null,
  type: 'black',
};

export default Iphone8plus;
