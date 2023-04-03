import { Empty } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

import { viewLoadingFlag } from '../../../customConfig';

@connect(({ switchControl }) => ({
  switchControl,
}))
class EmptyCardCollection extends PureComponent {
  render() {
    const { switchControl } = this.props;

    const loading = !!switchControl[viewLoadingFlag];

    return loading ? <div style={{ height: '130px' }} /> : <Empty />;
  }
}

EmptyCardCollection.defaultProps = {};

export { EmptyCardCollection };
