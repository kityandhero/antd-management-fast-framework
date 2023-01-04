import { drawerConfig } from 'antd-management-fast-common/es/utils/constants';
import { iconBuilder } from 'antd-management-fast-component/es/customComponents/Icon';

import BaseNeedlessLoadDrawer from '../BaseNeedlessLoadDrawer';

class BaseAddDrawer extends BaseNeedlessLoadDrawer {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        showBottomBar: true,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
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
        handleClick: (e) => {
          that.handleOk(e);
        },
      },
      {
        buildType: drawerConfig.bottomBarBuildType.close,
      },
    ];
  };
}

export default BaseAddDrawer;
