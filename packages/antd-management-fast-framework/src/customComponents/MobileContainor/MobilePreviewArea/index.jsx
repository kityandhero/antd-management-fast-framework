import { Affix } from 'antd';
import React from 'react';

import {
  animalType,
  cardConfig,
  isArray,
  isObject,
  mobileTypeCollection,
  whetherNumber,
} from 'antd-management-fast-common';
import {
  buildOptionItem,
  iconBuilder,
  MobileSimulation,
} from 'antd-management-fast-component';

import { Base } from '../../../framework/DataDrawer/Base';

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
            icon: iconBuilder.mobile(),
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
    const { affix, affixOffsetTop, affixOffsetBottom } = this.props;

    if (!affix) {
      return this.buildCardCollection(this.establishCardCollectionConfig());
    }

    const affixProps = {
      ...(affixOffsetBottom > 0 ? { offsetBottom: affixOffsetBottom } : {}),
      ...(affixOffsetTop > 0 ? { offsetTop: affixOffsetTop } : {}),
    };

    return (
      <Affix {...affixProps}>
        {this.buildCardCollection(this.establishCardCollectionConfig())}
      </Affix>
    );
  }
}

MobilePreviewArea.defaultProps = {
  affix: false,
  affixOffsetBottom: 0,
  affixOffsetTop: 0,
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

export { MobilePreviewArea };
