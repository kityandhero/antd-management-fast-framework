import { Spin } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

import { switchControlAssist } from '../../utils/switchControlAssist';

@connect(({ switchControl }) => ({
  switchControl,
}))
class LoadingOverlay extends PureComponent {
  render() {
    const { children, switchControl, flag } = this.props;

    const spinning = switchControlAssist.check(switchControl, flag);

    return <Spin spinning={spinning}>{children}</Spin>;
  }
}

export { LoadingOverlay };
