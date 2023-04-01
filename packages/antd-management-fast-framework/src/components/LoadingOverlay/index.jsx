import { Spin } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

@connect(({ loadingControl }) => ({
  loadingControl,
}))
class LoadingOverlay extends PureComponent {
  render() {
    const { flag, loadingControl, children } = this.props;

    const loading = !!loadingControl[flag];

    return <Spin spinning={loading}>{children}</Spin>;
  }
}

export { LoadingOverlay };
