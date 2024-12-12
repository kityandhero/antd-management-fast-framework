import React from 'react';

import { connect } from 'easy-soft-dva';

import { FieldExtra } from 'antd-management-fast-component';

import PageListDrawer from '../PageListDrawer';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

@connect(({ emailSenderAgent, schedulingControl }) => ({
  emailSenderAgent,
  schedulingControl,
}))
class SelectDrawerField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { name } = {
      name: '',
      ...data,
    };

    return name;
  };

  openSelector = () => {
    PageListDrawer.open();
  };

  renderPresetSelector = () => {
    const { label } = {
      label: '',
      ...this.props,
    };

    return (
      <PageListDrawer
        title={label}
        width={1200}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

export { SelectDrawerField };
