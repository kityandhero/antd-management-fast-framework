import React, { PureComponent } from 'react';
import classNames from 'classnames';

import { animalType } from '../../../../utils/constants';
import ContentView from '../../ContentView';

import styles from '../devices.less';

class GalaxyNote8 extends PureComponent {
  render() {
    const {
      alertVisible,
      alertAnimationType,
      alertMessage,
      alertDescription,
      alertIcon,
      alertType,
      alertButtonText,
      children,
      afterAlertClick,
    } = this.props;

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
        </div>
      </div>
    );
  }
}

GalaxyNote8.defaultProps = {
  alertVisible: false,
  alertAnimationType: animalType.fade,
  alertMessage: '',
  alertDescription: '',
  alertType: 'info',
  alertIcon: true,
  alertButtonText: '刷新',
  afterAlertClick: null,
};

export default GalaxyNote8;
