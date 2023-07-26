export const code = `import React from 'react';

import { connect } from 'easy-soft-dva';

import { ElasticitySelectButton } from 'antd-management-fast-component';

import SimpleMultiPageSingleSelectDrawer from '../Drawers/Multi/SimpleMultiPageSingleSelectDrawer';
import { SimpleSingleSelectModal } from '../Modals/SimpleSingleSelectModal';

const { BaseElasticitySelectButton } = ElasticitySelectButton;

@connect(({ smsCategory, schedulingControl }) => ({
  smsCategory,
  schedulingControl,
}))
class SelectButton extends BaseElasticitySelectButton {
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
    const { label, helper } = this.props;

    return (
      <SimpleSingleSelectModal
        label={label}
        helper={helper}
        labelWidth={100}
        afterSelectSuccess={this.afterModalSelectSuccess}
      />
    );
  };
}

SelectButton.defaultProps = {
  ...BaseElasticitySelectButton.defaultProps,
  label: 'Label',
  helper: '',
};

export { SelectButton };
`;
