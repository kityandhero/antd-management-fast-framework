import { Drawer } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

@connect(({ switchControl }) => ({
  switchControl,
}))
class DrawerExtra extends PureComponent {
  render() {
    const { flag, switchControl, children, ...rest } = this.props;

    const v = !!switchControl[flag];

    return (
      <Drawer open={v || false} {...rest}>
        {children}
      </Drawer>
    );
  }
}

export { DrawerExtra };
