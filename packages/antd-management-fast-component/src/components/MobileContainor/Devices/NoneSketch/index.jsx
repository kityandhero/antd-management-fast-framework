import React, { PureComponent } from 'react';

import { animalType } from 'antd-management-fast-common';

import { ContentView } from '../../ContentView';

import styles from './index.less';

class NoneSketch extends PureComponent {
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
      <div className={styles.noneSketch}>
        <div className={styles.noneSketchInner}>
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
    );
  }
}

NoneSketch.defaultProps = {
  alertVisible: false,
  alertAnimationType: animalType.fade,
  alertMessage: '',
  alertDescription: '',
  alertType: 'info',
  alertIcon: true,
  alertButtonText: '刷新',
  afterAlertClick: null,
};

export { NoneSketch };
