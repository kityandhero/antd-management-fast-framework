import React from 'react';

import { connect } from 'easy-soft-dva';

import { FieldExtra } from 'antd-management-fast-component';

import PageListDrawer from '../PageListDrawer';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

@connect(({ smsCategory, schedulingControl }) => ({
  smsCategory,
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
    PageListDrawer.open();
  };

  renderPresetSelector = () => {
    const { label } = this.props;

    return (
      <PageListDrawer
        title={label}
        width={1200}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

SelectField.defaultProps = {
  ...BaseSelectFieldExtra.defaultProps,
};

export { SelectField };
