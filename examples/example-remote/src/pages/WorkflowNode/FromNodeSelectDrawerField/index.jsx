import React from 'react';

import { buildFieldDescription } from 'easy-soft-utility';

import { FieldExtra } from 'antd-management-fast-component';

import { FromNodePageListSelectDrawer } from '../FromNodePageListSelectDrawer';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

class FromNodeSelectDrawerField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { label } = {
      label: '',
      ...data,
    };

    return label;
  };

  openSelector = () => {
    FromNodePageListSelectDrawer.open();
  };

  renderPresetSelector = () => {
    const { label, externalData } = {
      label: '',
      externalData: {},
      ...this.props,
    };

    return (
      <FromNodePageListSelectDrawer
        title={buildFieldDescription(label, '选择')}
        width={1200}
        externalData={externalData || {}}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

export { FromNodeSelectDrawerField };
