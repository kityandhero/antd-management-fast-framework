import { Spin } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

import { switchControlAssist } from '../../utils/switchControlAssist';

import styles from './index.less';

@connect(({ switchControl }) => ({
  switchControl,
}))
class LoadingOverlay extends PureComponent {
  render() {
    const { children, switchControl, flag, fill } = this.props;

    const result = switchControlAssist.check(switchControl, flag);

    return (
      <Spin
        spinning={result}
        style={fill ? { height: '100%', width: '100%' } : {}}
        wrapperClassName={fill ? styles.fill : null}
      >
        {fill ? (
          <div style={{ height: '100%', width: '100%', overflow: 'auto' }}>
            {children}
          </div>
        ) : (
          children
        )}
      </Spin>
    );
  }
}

LoadingOverlay.defaultProps = {
  flag: '',
  fill: false,
};

export { LoadingOverlay };
