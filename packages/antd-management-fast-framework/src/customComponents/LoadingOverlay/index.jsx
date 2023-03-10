import { Spin } from 'antd';
import React from 'react';

import { connect } from 'easy-soft-dva';

import { BaseComponent } from 'antd-management-fast-component';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class LoadingOverlay extends BaseComponent {
  renderFurther() {
    const {
      schedulingControl: { remoteLoading },
      children,
    } = this.props;

    console.log(this.props);

    return <Spin spinning={remoteLoading}>{children}</Spin>;
  }
}

export { LoadingOverlay };
