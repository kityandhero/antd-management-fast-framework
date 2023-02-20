import React from 'react';

import { isObject } from 'easy-soft-utility';

import {
  cardConfig,
  drawerConfig,
  mobileTypeCollection,
  whetherNumber,
} from 'antd-management-fast-common';
import {
  buildOptionItem,
  iconBuilder,
  MobileContainor,
} from 'antd-management-fast-component';

import { BaseNeedlessLoadDrawer } from '../../../framework/DataDrawer/BaseNeedlessLoadDrawer';

const { MobileSimulation } = MobileContainor;

class MobilePreviewDrawer extends BaseNeedlessLoadDrawer {
  resetDataAfterLoad = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      placement: 'top',
      height: '100vh',
      showBottomBar: false,
      mobileType: mobileTypeCollection.roughSketch.name,
    };
  }

  renderTitleIcon = () => {
    return iconBuilder.picture();
  };

  renderTitle = () => {
    return '设备预览';
  };

  establishExtraActionConfig = () => {
    const { mobileType } = this.state;

    const listConfig = [];

    for (const [index, o] of Object.entries(mobileTypeCollection).entries()) {
      const [k, v] = o;

      if (isObject(v)) {
        const key = `mobileType_${index}`;

        listConfig.push({
          key,
          flag: k,
          name: v.label,
          alias: v.label,
          description: '',
          availability: whetherNumber.yes,
        });
      }
    }

    return {
      list: [
        {
          buildType: drawerConfig.extraBuildType.flexSelect,
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
    };
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
    } = this.props;
    const { mobileType } = this.state;

    return {
      list: [
        {
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
}

MobilePreviewDrawer.defaultProps = {};

export { MobilePreviewDrawer };
