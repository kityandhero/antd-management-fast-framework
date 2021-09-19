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
    return [
      {
        buildType: drawerConfig.bottomBarBuildType.save,
      },
      {
        buildType: drawerConfig.bottomBarBuildType.close,
      },
    ];
  };

  renderButton = () => {
    const { processing } = this.state;

    return (
      <>
        <Button
          type="primary"
          disabled={processing}
          onClick={(e) => {
            this.handleOk(e);
          }}
        >
          {processing ? <LoadingOutlined /> : <SaveOutlined />}
          保存
        </Button>
        <Divider type="vertical" />
        <Button
          type="default"
          disabled={processing}
          onClick={() => {
            this.onClose();
          }}
        >
          <CloseCircleOutlined />
          关闭
        </Button>
      </>
    );
  };
}

export default BaseAddDrawer;
