import classNames from 'classnames';
import { PureComponent } from 'react';
import { animalType } from '../../../../utils/constants';
import ContentView from '../../ContentView';
import styles from '../devices.less';

class IphoneX extends PureComponent {
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

IphoneX.defaultProps = {
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

export default IphoneX;
