import { drawerConfig } from 'antd-management-fast-common';

import { Base } from '../Base';

class BaseSaveDrawer extends Base {
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

  adjustWhenDidMount = () => {
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
