import { PureComponent } from 'react';

import { animalType } from '../../../../utils/constants';
import ContentView from '../../ContentView';

import styles from './index.less';

class RoughSketch extends PureComponent {
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
    } = this.props;

    return (
      <div className={styles.device}>
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
    );
  }
}

RoughSketch.defaultProps = {
  alertVisible: false,
  alertAnimationType: animalType.fade,
  alertMessage: '',
  alertDescription: '',
  alertType: 'info',
  alertIcon: true,
  alertButtonText: '刷新',
  afterAlertClick: null,
};

export default RoughSketch;
