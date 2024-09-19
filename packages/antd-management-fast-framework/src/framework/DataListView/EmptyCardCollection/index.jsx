import { Empty } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

import { switchControlAssist } from '../../../utils/switchControlAssist';

@connect(({ switchControl }) => ({
  switchControl,
}))
class EmptyCardCollection extends PureComponent {
  getProperties = () => {
    return {
      ...this.props,
    };
  };

  render() {
    const { switchControl, flag } = this.getProperties();

    const loading = switchControlAssist.check(switchControl, flag);

    return loading ? <div style={{ height: '130px' }} /> : <Empty />;
  }
}

export { EmptyCardCollection };
