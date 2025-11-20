import React from 'react';

import { FieldExtra } from 'antd-management-fast-component';

import { SimpleMultiPageSingleSelectDrawer } from '../../Drawers/Multi/SelectDrawer/SimpleMultiPageSingleSelectDrawer';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

class SelectDrawerField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { title } = {
      title: '',
      ...data,
    };

    return title;
  };

  openSelector = () => {
    SimpleMultiPageSingleSelectDrawer.open();
  };

  renderPresetSelector = () => {
    const { label } = this.props;

    return (
      <SimpleMultiPageSingleSelectDrawer
        title={label}
        width={1200}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

SelectDrawerField.defaultProps = {
  ...BaseSelectFieldExtra.defaultProps,
};

export { SelectDrawerField };
