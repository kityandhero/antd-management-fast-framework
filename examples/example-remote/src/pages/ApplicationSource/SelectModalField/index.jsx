import React from 'react';

import { connect } from 'easy-soft-dva';

import { FieldExtra } from 'antd-management-fast-component';

import { SelectModal } from '../SelectModal';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

@connect(({ applicationSource, schedulingControl }) => ({
  applicationSource,
  schedulingControl,
}))
class ApplicationSourceSelectModalField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { name } = {
      name: '',
      ...data,
    };

    return name;
  };

  openSelector = () => {
    SelectModal.open();
  };

  renderPresetSelector = () => {
    const { label, helper, labelWidth } = {
      label: '',
      helper: '',
      labelWidth: 100,
      ...this.props,
    };

    return (
      <SelectModal
        label={label}
        helper={helper}
        labelWidth={labelWidth}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

export { ApplicationSourceSelectModalField };
