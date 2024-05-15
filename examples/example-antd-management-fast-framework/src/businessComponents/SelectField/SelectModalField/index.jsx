import React from 'react';

import { connect } from 'easy-soft-dva';

import { FieldExtra } from 'antd-management-fast-component';

import { SimpleSingleSelectModal } from '../../Modals/SimpleSingleSelectModal';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

@connect(({ smsCategory, schedulingControl }) => ({
  smsCategory,
  schedulingControl,
}))
class SelectModalField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { title } = {
      title: '',
      ...data,
    };

    return title;
  };

  openSelector = () => {
    SimpleSingleSelectModal.open();
  };

  renderPresetSelector = () => {
    const { label, helper, labelWidth } = this.props;

    return (
      <SimpleSingleSelectModal
        label={label}
        helper={helper}
        labelWidth={labelWidth}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

SelectModalField.defaultProps = {
  ...BaseSelectFieldExtra.defaultProps,
};

export { SelectModalField };
