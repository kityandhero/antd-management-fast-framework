import React from 'react';

import { connect } from 'easy-soft-dva';
import { buildFieldDescription } from 'easy-soft-utility';

import { FieldExtra } from 'antd-management-fast-component';

import { PageListSelectDrawer } from '../PageListSelectDrawer';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class ApplicationSelectDrawerField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { name } = {
      name: '',
      ...data,
    };

    return name;
  };

  openSelector = () => {
    PageListSelectDrawer.open();
  };

  renderPresetSelector = () => {
    const { label } = this.props;

    return (
      <PageListSelectDrawer
        title={buildFieldDescription(label, '选择')}
        width={1200}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

ApplicationSelectDrawerField.defaultProps = {
  ...BaseSelectFieldExtra.defaultProps,
  label: '选择应用',
};

export { ApplicationSelectDrawerField };
