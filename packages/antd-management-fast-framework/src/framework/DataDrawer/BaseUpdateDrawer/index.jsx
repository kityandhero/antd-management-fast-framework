import { drawerConfig } from 'antd-management-fast-common';

import { BaseLoadDrawer } from '../BaseLoadDrawer';

class BaseUpdateDrawer extends BaseLoadDrawer {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      showBottomBar: true,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

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

export { BaseUpdateDrawer };
