import React from 'react';

import { drawerConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { ElasticityExtraButton } from '../../../components/ElasticityExtraButton';
import { BaseNeedlessLoadDrawer } from '../BaseNeedlessLoadDrawer';

const primaryCallName = 'DataDrawer::BaseAddDrawer';

/**
 * base add drawer
 * @namespace framework.DataDrawer
 * @class BaseAddDrawer
 * @extends BaseNeedlessLoadDrawer
 */
class BaseAddDrawer extends BaseNeedlessLoadDrawer {
  /**
   * 构造函数
   * @param {Object} properties 属性值集合。
   * @param {string} visibleFlag 可见性标记。
   */
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      showBottomBar: true,
    };
  }

  /**
   * get derived state from props。
   * @static
   * @param {Object} nextProperties 即将更改的属性值
   * @param {Object} previousState 之前的 state 值
   * @returns {Object} 更新后的 state 值
   */
  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  adjustWhenDidMount = () => {
    this.logCallTrack({}, primaryCallName, 'adjustWhenDidMount');

    this.fillData({});
  };

  buildBottomBarInnerDefaultConfigList = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'buildBottomBarInnerDefaultConfigList',
    );

    const that = this;

    return [
      {
        buildType: drawerConfig.bottomBarBuildType.component,
        component: (
          <ElasticityExtraButton
            flag={[
              this.viewLoadingFlag,
              this.viewReloadingFlag,
              this.viewRefreshingFlag,
              this.viewProcessingFlag,
            ]}
            type="primary"
            text="保存"
            icon={iconBuilder.save()}
            handleClick={({ completeCallback }) => {
              that.handleOk({ completeCallback });
            }}
          />
        ),
      },
      {
        buildType: drawerConfig.bottomBarBuildType.close,
      },
    ];
  };
}

export { BaseAddDrawer };
