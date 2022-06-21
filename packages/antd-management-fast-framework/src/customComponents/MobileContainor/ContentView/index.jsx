import { Alert, Space } from 'antd';
import { PureComponent } from 'react';

import { animalType, iconCollection } from '../../../utils/constants';
import { inCollection, isFunction } from '../../../utils/tools';
import FadeBox from '../../AnimalBox/FadeBox';
import QueueBox from '../../AnimalBox/QueueBox';
import { buildButton } from '../../FunctionComponent';

import styles from './index.less';

class ConventView extends PureComponent {
  onAlertClick = () => {
    const { afterAlertClick } = this.props;

    if (isFunction(afterAlertClick)) {
      afterAlertClick();
    }
  };

  render() {
    const {
      alertVisible,
      alertAnimationType: alertAnimationTypeSource,
      alertMessage,
      alertDescription,
      alertIcon,
      alertType: alertTypeSource,
      alertButtonText,
      children,
    } = this.props;

    const alertType = inCollection(
      ['success', 'info', 'warning', 'error'],
      alertTypeSource,
    )
      ? alertTypeSource
      : 'info';

    const alertAnimationType = inCollection(
      [animalType.none, animalType.fade, animalType.queue],
      alertAnimationTypeSource,
    )
      ? alertAnimationTypeSource
      : animalType.fade;

    const alert = (
      <Alert
        message={alertMessage}
        description={alertDescription}
        type={alertType}
        showIcon={!!alertIcon}
        style={{ margin: '2px' }}
        action={
          <Space>
            {buildButton({
              size: 'small',
              type: 'ghost',
              icon: iconCollection.reload,
              text: alertButtonText,
              handleClick: this.onAlertClick,
            })}
          </Space>
        }
        closable={false}
      />
    );

    return (
      <div className={styles.deviceInner}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 2,
            width: '100%',
          }}
        >
          {alertAnimationType === animalType.none ? alert : null}

          {alertAnimationType === animalType.fade ? (
            <FadeBox show={alertVisible}>{alert}</FadeBox>
          ) : null}

          {alertAnimationType === animalType.queue ? (
            <QueueBox show={alertVisible}>{alert}</QueueBox>
          ) : null}
        </div>

        <div className={styles.deviceContent}>{children}</div>
      </div>
    );
  }
}

ConventView.defaultProps = {
  alertVisible: false,
  alertAnimationType: animalType.fade,
  alertMessage: '',
  alertDescription: '',
  alertType: 'info',
  alertIcon: true,
  alertButtonText: '刷新',
  afterAlertClick: null,
};

export default ConventView;
