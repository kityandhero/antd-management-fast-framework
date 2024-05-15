import React from 'react';

import { connect } from 'easy-soft-dva';

import { FieldExtra } from 'antd-management-fast-component';

import { ApplicationSelectModal } from '../SelectModal';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class ApplicationSelectModalField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { name } = {
      name: '',
      ...data,
    };

    return name;
  };

  openSelector = () => {
    ApplicationSelectModal.open();
  };

  renderSelectModal = () => {
    const { label, externalData } = this.props;

    return (
      <ApplicationSelectModal
        title={label}
        externalData={externalData}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

ApplicationSelectModalField.defaultProps = {
  ...BaseSelectFieldExtra.defaultProps,
  label: '选择应用',
};

export { ApplicationSelectModalField };
