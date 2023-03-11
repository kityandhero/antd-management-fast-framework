import { Spin } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class LoadingOverlay extends PureComponent {
  render() {
    const {
      schedulingControl: { remoteLoading },
      children,
    } = this.props;

    return <Spin spinning={remoteLoading}>{children}</Spin>;
  }
}

export { LoadingOverlay };
