import React from 'react';

import { connect } from 'easy-soft-dva';

import { ElasticitySelectButton } from 'antd-management-fast-component';

import { SimpleMultiPageSingleSelectDrawer } from '../../Drawers/Multi/SelectDrawer/SimpleMultiPageSingleSelectDrawer';

const { BaseElasticitySelectButton } = ElasticitySelectButton;

@connect(({ smsCategory, schedulingControl }) => ({
  smsCategory,
  schedulingControl,
}))
class SelectDrawerButton extends BaseElasticitySelectButton {
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

SelectDrawerButton.defaultProps = {
  ...BaseElasticitySelectButton.defaultProps,
  label: 'Label',
  helper: '',
};

export { SelectDrawerButton };
