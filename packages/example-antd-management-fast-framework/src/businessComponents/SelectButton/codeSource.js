export const code = `import React from 'react';

import { connect } from 'easy-soft-dva';

import { ElasticitySelectButton } from 'antd-management-fast-component';

import SimpleMultiPageSingleSelectDrawer from '../Drawers/Multi/SimpleMultiPageSingleSelectDrawer';

const { BaseElasticitySelectButton } = ElasticitySelectButton;

@connect(({ smsCategory, schedulingControl }) => ({
  smsCategory,
  schedulingControl,
}))
class SelectButton extends BaseElasticitySelectButton {
  openDrawer = () => {
    SimpleMultiPageSingleSelectDrawer.open();
  };

  renderPresetSelectDrawer = () => {
    return (
      <SimpleMultiPageSingleSelectDrawer
        width={1200}
        afterSelectSuccess={this.afterDrawerSelectSuccess}
      />
    );
  };

  getFieldData = () => {
    const { label, valueText, helper } = this.props;

    return {
      fieldText: valueText || '',
      fieldTitle: label,
      fieldPlaceholder: helper,
    };
  };
}

SelectButton.defaultProps = {
  ...BaseElasticitySelectButton.defaultProps,
};

export { SelectButton };
`;
