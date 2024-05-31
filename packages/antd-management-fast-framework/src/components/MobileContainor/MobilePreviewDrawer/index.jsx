import React from 'react';

import { isObject, whetherNumber } from 'easy-soft-utility';

import {
  cardConfig,
  drawerConfig,
  mobileTypeCollection,
} from 'antd-management-fast-common';
import { iconBuilder, MobileContainor } from 'antd-management-fast-component';

import { BaseNeedlessLoadDrawer } from '../../../framework/DataDrawer/BaseNeedlessLoadDrawer';

const { MobileSimulation } = MobileContainor;

class MobilePreviewDrawer extends BaseNeedlessLoadDrawer {
  resetDataAfterLoad = false;

  /**
   * 构造函数
   * @param {Object} properties 属性值集合。
   * @param {string} visibleFlag 可见性标记。
   */
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      placement: 'top',
      height: '100vh',
      showBottomBar: false,
      mobileType: mobileTypeCollection.noneSketch.name,
    };
  }

  /**
   * 渲染标题图标，默认为空，可根据需要重载。
   * @function
   * @returns {Object} 标题图标
   */
  renderPresetTitleIcon = () => {
    return iconBuilder.picture();
  };

  renderPresetTitle = () => {
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
          defaultValue: mobileType,
          list: listConfig,
          dataConvert: (o) => {
            const { label, flag: value } = {
              label: '',
              flag: '',
              ...o,
            };

            return {
              ...o,
              label,
              value,
              alias: label,
            };
          },
          onChange: (v) => {
            this.setState({
              mobileType: v,
            });
          },
        },
      ],
    };
  };

  /**
   * 构造 Card 配置集合。
   * @function
   */
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
}

MobilePreviewDrawer.defaultProps = {};

export { MobilePreviewDrawer };
