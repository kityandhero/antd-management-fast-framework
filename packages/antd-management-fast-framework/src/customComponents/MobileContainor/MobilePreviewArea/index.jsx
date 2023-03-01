import { Affix } from 'antd';
import React from 'react';

import { isArray, isObject, whetherNumber } from 'easy-soft-utility';

import {
  animalType,
  cardConfig,
  mobileTypeCollection,
} from 'antd-management-fast-common';
import {
  buildOptionItem,
  iconBuilder,
  MobileContainor,
} from 'antd-management-fast-component';

import { Base } from '../../../framework/DataDrawer/Base';

const { MobileSimulation } = MobileContainor;

class MobilePreviewArea extends Base {
  resetDataAfterLoad = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      placement: 'top',
      height: '100vh',
      mobileType: mobileTypeCollection.roughSketch.name,
    };
  }

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

    for (const [index, o] of mobileCollection.entries()) {
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
    }

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
                renderItem: () => {
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
                    {this.renderPresetInnerViewWrapper()}
                  </MobileSimulation>
                </div>
              ),
            },
          ],
        },
      ],
    };
  };

  renderPresetInnerView = () => {
    return null;
  };

  renderPresetInnerViewWrapper = () => {
    return this.renderPresetInnerView();
  };

  renderFurther() {
    const { affix, affixOffsetTop, affixOffsetBottom } = this.props;

    if (!affix) {
      return this.buildCardCollection(this.establishCardCollectionConfig());
    }

    const affixProperties = {
      ...(affixOffsetBottom > 0 ? { offsetBottom: affixOffsetBottom } : {}),
      ...(affixOffsetTop > 0 ? { offsetTop: affixOffsetTop } : {}),
    };

    return (
      <Affix {...affixProperties}>
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
