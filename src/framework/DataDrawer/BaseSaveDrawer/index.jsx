import React from 'react';
import { Button, Divider } from 'antd';
import {
  SaveOutlined,
  LoadingOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import Base from '../Base';

class BaseSaveDrawer extends Base {
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
    this.fillForm();
  };

  renderButton = () => {
    const { processing } = this.state;

    return (
      <>
        <Button
          type="primary"
          disabled={processing}
          onClick={e => {
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

export default BaseSaveDrawer;
