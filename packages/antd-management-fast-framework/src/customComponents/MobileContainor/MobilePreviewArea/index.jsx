import React from 'react';
import { MobileOutlined } from '@ant-design/icons';

import { isObject, isArray } from '../../../utils/tools';
import {
  cardConfig,
  mobileTypeCollection,
  whetherNumber,
  animalType,
} from '../../../utils/constants';
import Base from '../../../framework/DataOperation/Base';
import MobileSimulation from '../MobileSimulation';
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
                  <MobileSimulation
                    alertVisible={alertVisible}
                    alertAnimationType={alertAnimationType}
                    alertMessage={alertMessage}
                    alertDescription={alertDescription}
                    alertIcon={alertIcon}
                    alertType={alertType}
                    alertButtonText={alertButtonText}
                    afterAlertClick={afterAlertClick}
                    mobileType={mobileType}
                  >
                    {this.renderInnerViewWrapper()}
                  </MobileSimulation>
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
