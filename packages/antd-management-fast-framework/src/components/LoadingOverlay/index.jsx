import { Spin } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

@connect(({ switchControl }) => ({
  switchControl,
}))
class LoadingOverlay extends PureComponent {
  render() {
    const { flag, switchControl, children } = this.props;

    const v = !!switchControl[flag];

    return <Spin spinning={v}>{children}</Spin>;
  }
}

export { LoadingOverlay };
