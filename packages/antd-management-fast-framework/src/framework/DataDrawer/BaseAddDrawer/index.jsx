import { SaveOutlined } from '@ant-design/icons';

import { drawerConfig } from '../../../utils/constants';

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
    this.fillForm({});
  };

  buildBottomBarInnerDefaultConfigList = () => {
    const buttonProcessing = this.getSaveButtonProcessing();

    const that = this;

    return [
      {
        buildType: drawerConfig.bottomBarBuildType.generalButton,
        type: 'primary',
        icon: <SaveOutlined />,
        text: '保存',
        disabled: buttonProcessing,
        onClick: (e) => {
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
