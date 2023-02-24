import React, { PureComponent } from 'react';

import { isObject, logObject, showSimpleErrorMessage } from 'easy-soft-utility';

import { animalType, mobileTypeCollection } from 'antd-management-fast-common';

import { VerticalBox } from '../../VerticalBox';
import { GalaxyNote8 } from '../Devices/GalaxyNote8';
import { IPhone5S } from '../Devices/IPhone5S';
import { Iphone8 } from '../Devices/Iphone8';
import { Iphone8plus } from '../Devices/Iphone8plus';
import { IphoneX } from '../Devices/IphoneX';
import { RoughSketch } from '../Devices/RoughSketch';

class MobileSimulation extends PureComponent {
  buildMobileTypeArray = () => {
    const list = [];

    for (const o of Object.entries(mobileTypeCollection)) {
      // eslint-disable-next-line no-unused-vars
      const [k, v] = o;
      if (isObject(v)) {
        list.push(v);
      }
    }

    return list;
  };

  renderPresetInnerView = () => {
    const { children } = this.props;

    return children;
  };

  renderPresetInnerViewWrapper = () => {
    return this.renderPresetInnerView();
  };

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
      mobileType,
    } = this.props;

    let mobileView = null;

    switch (mobileType) {
      case mobileTypeCollection.roughSketch.name: {
        mobileView = (
          <RoughSketch
            alertVisible={alertVisible}
            alertAnimationType={alertAnimationType}
            alertMessage={alertMessage}
            alertDescription={alertDescription}
            alertIcon={alertIcon}
            alertType={alertType}
            alertButtonText={alertButtonText}
            afterAlertClick={afterAlertClick}
          >
            {this.renderPresetInnerViewWrapper()}
          </RoughSketch>
        );
        break;
      }

      case mobileTypeCollection.iphoneX.name: {
        mobileView = (
          <IphoneX
            alertVisible={alertVisible}
            alertAnimationType={alertAnimationType}
            alertMessage={alertMessage}
            alertDescription={alertDescription}
            alertIcon={alertIcon}
            alertType={alertType}
            alertButtonText={alertButtonText}
            afterAlertClick={afterAlertClick}
          >
            {this.renderPresetInnerViewWrapper()}
          </IphoneX>
        );
        break;
      }

      case mobileTypeCollection.iphone8.name: {
        mobileView = (
          <Iphone8
            alertVisible={alertVisible}
            alertAnimationType={alertAnimationType}
            alertMessage={alertMessage}
            alertDescription={alertDescription}
            alertIcon={alertIcon}
            alertType={alertType}
            alertButtonText={alertButtonText}
            afterAlertClick={afterAlertClick}
          >
            {this.renderPresetInnerViewWrapper()}
          </Iphone8>
        );
        break;
      }

      case mobileTypeCollection.iphone8plus.name: {
        mobileView = (
          <Iphone8plus
            alertVisible={alertVisible}
            alertAnimationType={alertAnimationType}
            alertMessage={alertMessage}
            alertDescription={alertDescription}
            alertIcon={alertIcon}
            alertType={alertType}
            alertButtonText={alertButtonText}
            afterAlertClick={afterAlertClick}
          >
            {this.renderPresetInnerViewWrapper()}
          </Iphone8plus>
        );
        break;
      }

      case mobileTypeCollection.iPhone5S.name: {
        mobileView = (
          <IPhone5S
            alertVisible={alertVisible}
            alertAnimationType={alertAnimationType}
            alertMessage={alertMessage}
            alertDescription={alertDescription}
            alertIcon={alertIcon}
            alertType={alertType}
            alertButtonText={alertButtonText}
            afterAlertClick={afterAlertClick}
          >
            {this.renderPresetInnerViewWrapper()}
          </IPhone5S>
        );
        break;
      }

      case mobileTypeCollection.galaxyNote8.name: {
        mobileView = (
          <GalaxyNote8
            alertVisible={alertVisible}
            alertAnimationType={alertAnimationType}
            alertMessage={alertMessage}
            alertDescription={alertDescription}
            alertIcon={alertIcon}
            alertType={alertType}
            alertButtonText={alertButtonText}
            afterAlertClick={afterAlertClick}
          >
            {this.renderPresetInnerViewWrapper()}
          </GalaxyNote8>
        );
        break;
      }

      default: {
        mobileView = null;

        const text = 'invalid mobile type，please check in console';

        showSimpleErrorMessage(text);

        logObject({
          message: 'available mobile type list',
          mobileTypeCollection,
        });

        break;
      }
    }

    return (
      <div>
        <VerticalBox
          align="center"
          alignJustify="center"
          style={{
            height: '100%',
          }}
        >
          {mobileView}
        </VerticalBox>
      </div>
    );
  }
}

MobileSimulation.defaultProps = {
  alertVisible: false,
  alertAnimationType: animalType.fade,
  alertMessage: '',
  alertDescription: '',
  alertType: 'info',
  alertIcon: true,
  alertButtonText: '刷新',
  mobileType: mobileTypeCollection.roughSketch.name,
  afterAlertClick: null,
};

export { MobileSimulation };
