import { Spin } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

@connect(({ remoteLoadingControl }) => ({
  remoteLoadingControl,
}))
class LoadingOverlay extends PureComponent {
  render() {
    const {
      remoteLoadingControl: { remoteLoading },
      children,
    } = this.props;

    return <Spin spinning={remoteLoading}>{children}</Spin>;
  }
}

export { LoadingOverlay };
