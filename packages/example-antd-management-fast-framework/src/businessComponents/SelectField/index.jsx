import React from 'react';

import { connect } from 'easy-soft-dva';

import { FieldExtra } from 'antd-management-fast-component';

import SimpleMultiPageSingleSelectDrawer from '../Drawers/Multi/SimpleMultiPageSingleSelectDrawer';
import { SimpleSingleSelectModal } from '../Modals/SimpleSingleSelectModal';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

@connect(({ smsCategory, schedulingControl }) => ({
  smsCategory,
  schedulingControl,
}))
class SelectField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { title } = {
      title: '',
      ...data,
    };

    return title;
  };

  openDrawer = () => {
    SimpleMultiPageSingleSelectDrawer.open();
  };

  openModal = () => {
    SimpleSingleSelectModal.open();
  };

  renderPresetSelectDrawer = () => {
    const { label } = this.props;

    return (
      <SimpleMultiPageSingleSelectDrawer
        title={label}
        width={1200}
        afterSelectSuccess={this.afterDrawerSelectSuccess}
      />
    );
  };

  renderPresetSelectModal = () => {
    const { label, helper, labelWidth } = this.props;

    return (
      <SimpleSingleSelectModal
        label={label}
        helper={helper}
        labelWidth={labelWidth}
        afterSelectSuccess={this.afterModalSelectSuccess}
      />
    );
  };
}

SelectField.defaultProps = {
  ...BaseSelectFieldExtra.defaultProps,
};

export { SelectField };
