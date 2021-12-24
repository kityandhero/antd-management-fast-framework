import React from 'react';
import { MobileOutlined } from '@ant-design/icons';

import {
  recordObject,
  showErrorMessage,
  isObject,
  isArray,
} from '../../../utils/tools';
import {
  cardConfig,
  mobileTypeCollection,
  whetherNumber,
  animalType,
} from '../../../utils/constants';
import Base from '../../../framework/DataOperation/Base';
import VerticalBox from '../../VerticalBox';
import RoughSketch from '../Devices/RoughSketch';
import IphoneX from '../Devices/IphoneX';
import Iphone8plus from '../Devices/Iphone8plus';
import Iphone8 from '../Devices/Iphone8';
import IPhone5S from '../Devices/IPhone5S';
import GalaxyNote8 from '../Devices/GalaxyNote8';
import { buildOptionItem } from '../../FunctionComponent';

class MobilePreviewArea extends Base {
  resetDataAfterLoad = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        placement: 'top',
        height: '100vh',
        showBottomBar: false,
        mobileType: mobileTypeCollection.roughSketch.name,
      },
    };
  }

  buildMobileTypeArray = () => {
    const list = [];

    Object.entries(mobileTypeCollection).forEach((o) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [k, v] = o;
      if (isObject(v)) {
        list.push(v);
      }
    });

    return list;
  };

  establishCardCollectionConfig = () => {
    const {
      alertVisible,
      alertAnimationType,
      alertMessage,
      alertDescription,
      alertIcon,
      alertType,
      alertButtonText,
      afterAlertClick,
      mobileList,
    } = this.props;
    const { mobileType } = this.state;

    const listConfig = [];

    const mobileCollection =
      isArray(mobileList) && mobileList.length <= 0
        ? this.buildMobileTypeArray()
        : mobileList;

    mobileCollection.forEach((o, index) => {
      if (isObject(o)) {
        const key = `mobileType_${index}`;

        listConfig.push({
          key,
          flag: o.name,
          name: o.label,
          alias: o.label,
          description: '',
          availability: whetherNumber.yes,
        });
      }
    });

    let mobileView = null;

    switch (mobileType) {
      case mobileTypeCollection.roughSketch.name:
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
            {this.renderInnerViewWrapper()}
          </RoughSketch>
        );
        break;

      case mobileTypeCollection.iphoneX.name:
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
            {this.renderInnerViewWrapper()}
          </IphoneX>
        );
        break;

      case mobileTypeCollection.iphone8.name:
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
            {this.renderInnerViewWrapper()}
          </Iphone8>
        );
        break;

      case mobileTypeCollection.iphone8plus.name:
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
            {this.renderInnerViewWrapper()}
          </Iphone8plus>
        );
        break;

      case mobileTypeCollection.iPhone5S.name:
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
            {this.renderInnerViewWrapper()}
          </IPhone5S>
        );
        break;

      case mobileTypeCollection.galaxyNote8.name:
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
            {this.renderInnerViewWrapper()}
          </GalaxyNote8>
        );
        break;

      default:
        mobileView = null;

        const text = 'invalid mobile type，please check in console';

        showErrorMessage({
          message: text,
        });

        recordObject({
          message: 'available mobile type list',
          mobileTypeCollection,
        });

        break;
    }

    return {
      list: [
        {
          title: {
            text: '手机预览',
            icon: <MobileOutlined />,
          },
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.flexSelect,
                size: 'small',
                label: '模拟设备',
                value: mobileType,
                renderItemFunction: () => {
                  return buildOptionItem({
                    list: listConfig,
                  });
                },
                onChangeCallback: (v) => {
                  this.setState({
                    mobileType: v,
                  });
                },
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
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
              ),
            },
          ],
        },
      ],
    };
  };

  renderInnerView = () => {
    return null;
  };

  renderInnerViewWrapper = () => {
    return this.renderInnerView();
  };

  renderFurther() {
    return this.buildCardCollection(this.establishCardCollectionConfig());
  }
}

MobilePreviewArea.defaultProps = {
  alertVisible: false,
  alertAnimationType: animalType.fade,
  alertMessage: '',
  alertDescription: '',
  alertType: 'info',
  alertIcon: true,
  alertButtonText: '刷新',
  mobileList: [],
  afterAlertClick: null,
};

export default MobilePreviewArea;
