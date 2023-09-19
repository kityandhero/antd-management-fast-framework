import React from 'react';

import { connect } from 'easy-soft-dva';

import { ElasticitySelectButton } from 'antd-management-fast-component';

import { SimpleSingleSelectModal } from '../../Modals/SimpleSingleSelectModal';

const { BaseElasticitySelectButton } = ElasticitySelectButton;

@connect(({ smsCategory, schedulingControl }) => ({
  smsCategory,
  schedulingControl,
}))
class SelectModalButton extends BaseElasticitySelectButton {
  openSelector = () => {
    SimpleSingleSelectModal.open();
  };

  renderPresetSelector = () => {
    const { label, helper } = this.props;

    return (
      <SimpleSingleSelectModal
        label={label}
        helper={helper}
        labelWidth={100}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

SelectModalButton.defaultProps = {
  ...BaseElasticitySelectButton.defaultProps,
  label: 'Label',
  helper: '',
};

export { SelectModalButton };
