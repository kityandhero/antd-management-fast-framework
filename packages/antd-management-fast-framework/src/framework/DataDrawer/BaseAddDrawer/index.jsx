import { drawerConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { BaseNeedlessLoadDrawer } from '../BaseNeedlessLoadDrawer';

class BaseAddDrawer extends BaseNeedlessLoadDrawer {
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

  adjustWhenDidMount = () => {
    this.fillData({});
  };

  buildBottomBarInnerDefaultConfigList = () => {
    const buttonProcessing = this.getSaveButtonProcessing();

    const that = this;

    return [
      {
        buildType: drawerConfig.bottomBarBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.save(),
        text: '保存',
        disabled: buttonProcessing,
        handleClick: (event) => {
          that.handleOk(event);
        },
      },
      {
        buildType: drawerConfig.bottomBarBuildType.close,
      },
    ];
  };
}

export { BaseAddDrawer };
