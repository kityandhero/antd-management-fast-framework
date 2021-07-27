import React from 'react';
import { Button, Divider } from 'antd';
import { SaveOutlined, LoadingOutlined, CloseCircleOutlined } from '@ant-design/icons';

import BaseLoadDrawer from '../BaseLoadDrawer';

class BaseUpdateDrawer extends BaseLoadDrawer {
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

  renderButton = () => {
    const { loadSuccess, dataLoading, processing } = this.state;

    return (
      <>
        <Button
          type="primary"
          disabled={dataLoading || processing || !loadSuccess}
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
          disabled={dataLoading || processing}
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

export default BaseUpdateDrawer;
