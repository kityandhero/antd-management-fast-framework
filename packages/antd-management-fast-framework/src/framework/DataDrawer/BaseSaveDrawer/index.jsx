import { drawerConfig } from 'antd-management-fast-common';

import { BaseFormDrawer } from '../BaseFormDrawer';

const primaryCallName = 'DataDrawer::BaseSaveDrawer';

/**
 * base save drawer
 * @namespace framework.DataDrawer
 * @class BaseSaveDrawer
 * @extends BaseFormDrawer
 */
class BaseSaveDrawer extends BaseFormDrawer {
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
    return [
      {
        buildType: drawerConfig.bottomBarBuildType.save,
      },
      {
        buildType: drawerConfig.bottomBarBuildType.close,
      },
    ];
  };
}

export { BaseSaveDrawer };
