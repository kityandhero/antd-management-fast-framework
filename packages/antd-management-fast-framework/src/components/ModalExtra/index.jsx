import { Modal } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

@connect(({ switchControl }) => ({
  switchControl,
}))
class ModalExtra extends PureComponent {
  render() {
    const { flag, switchControl, children, ...rest } = this.props;

    const v = !!switchControl[flag];

    return (
      <Modal open={v || false} {...rest}>
        {children}
      </Modal>
    );
  }
}

export { ModalExtra };
