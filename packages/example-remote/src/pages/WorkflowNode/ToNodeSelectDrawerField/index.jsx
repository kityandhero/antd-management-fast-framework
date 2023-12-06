import React from 'react';

import { buildFieldDescription } from 'easy-soft-utility';

import { FieldExtra } from 'antd-management-fast-component';

import { ToNodePageListSelectDrawer } from '../ToNodePageListSelectDrawer';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

class ToNodeSelectDrawerField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { label } = {
      label: '',
      ...data,
    };

    return label;
  };

  openSelector = () => {
    ToNodePageListSelectDrawer.open();
  };

  renderPresetSelector = () => {
    const { label, externalData } = this.props;

    return (
      <ToNodePageListSelectDrawer
        title={buildFieldDescription(label, '选择')}
        width={1200}
        externalData={externalData || {}}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

ToNodeSelectDrawerField.defaultProps = {
  ...BaseSelectFieldExtra.defaultProps,
  externalData: {},
};

export { ToNodeSelectDrawerField };
