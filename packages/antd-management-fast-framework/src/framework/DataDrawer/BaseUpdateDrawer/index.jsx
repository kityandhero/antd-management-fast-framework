import { drawerConfig } from 'antd-management-fast-common';

import { BaseLoadDrawer } from '../BaseLoadDrawer';

const primaryCallName = 'DataDrawer::BaseUpdateDrawer';

class BaseUpdateDrawer extends BaseLoadDrawer {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      showBottomBar: true,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  buildBottomBarInnerDefaultConfigList = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'buildBottomBarInnerDefaultConfigList',
    );

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

export { BaseUpdateDrawer };
