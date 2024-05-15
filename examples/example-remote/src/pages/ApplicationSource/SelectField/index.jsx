import React from 'react';

import { connect } from 'easy-soft-dva';

import { FieldExtra } from 'antd-management-fast-component';

import SelectModal from '../SelectModal';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

@connect(({ applicationSource, schedulingControl }) => ({
  applicationSource,
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
    SelectModal.open();
  };

  renderPresetSelector = () => {
    const { label } = this.props;

    return (
      <SelectModal title={label} afterSelectSuccess={this.afterSelectSuccess} />
    );
  };
}

SelectField.defaultProps = {
  ...BaseSelectFieldExtra.defaultProps,
};

export default SelectField;
