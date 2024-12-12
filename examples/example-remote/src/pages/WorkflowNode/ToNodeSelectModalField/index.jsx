import React from 'react';

import { FieldExtra } from 'antd-management-fast-component';

import { ToNodeSelectModal } from '../ToNodeSelectModal';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

class ToNodeSelectModalField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { label } = {
      label: '',
      ...data,
    };

    return label;
  };

  openSelector = () => {
    ToNodeSelectModal.open();
  };

  renderPresetSelector = () => {
    const { label, helper, labelWidth, externalData } = {
      label: '',
      helper: '',
      labelWidth: 100,
      externalData: {},
      ...this.props,
    };

    return (
      <ToNodeSelectModal
        label={label}
        helper={helper}
        labelWidth={labelWidth}
        externalData={externalData || {}}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

export { ToNodeSelectModalField };
