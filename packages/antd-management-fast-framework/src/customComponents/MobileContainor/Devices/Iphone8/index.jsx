import classNames from 'classnames';
import { PureComponent } from 'react';
import { animalType } from '../../../../utils/constants';
import { inCollection } from '../../../../utils/tools';
import ContentView from '../../ContentView';
import styles from '../devices.less';

class Iphone8 extends PureComponent {
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
            styles.iphone8,
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

Iphone8.defaultProps = {
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

export default Iphone8;
