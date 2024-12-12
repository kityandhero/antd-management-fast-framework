import React from 'react';

import { connect } from 'easy-soft-dva';

import { FieldExtra } from 'antd-management-fast-component';

import { PageListSelectModal } from '../PageListSelectModal';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

@connect(({ emailSenderAgent, schedulingControl }) => ({
  emailSenderAgent,
  schedulingControl,
}))
class SelectField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { name } = {
      name: '',
      ...data,
    };

    return name;
  };

  openSelector = () => {
    PageListSelectModal.open();
  };

  renderPresetSelector = () => {
    const { label } = {
      label: '',
      ...this.props,
    };

    return (
      <PageListSelectModal
        title={label}
        width={1200}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

export { SelectField };
