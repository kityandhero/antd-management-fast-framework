import React from 'react';

import { connect } from 'easy-soft-dva';
import { buildFieldDescription } from 'easy-soft-utility';

import { FieldExtra } from 'antd-management-fast-component';

import { PageListSelectDrawer } from '../PageListSelectDrawer';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

@connect(({ applicationSource, schedulingControl }) => ({
  applicationSource,
  schedulingControl,
}))
class ApplicationSourceSelectDrawerField extends BaseSelectFieldExtra {
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
    const { label } = {
      label: '',
      ...this.props,
    };

    return (
      <PageListSelectDrawer
        title={buildFieldDescription(label, '选择')}
        width={1200}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

export { ApplicationSourceSelectDrawerField };
