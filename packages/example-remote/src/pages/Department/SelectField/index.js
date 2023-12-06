import React from 'react';

import { connect } from 'easy-soft-dva';
import { buildFieldDescription } from 'easy-soft-utility';

import { FieldExtra } from 'antd-management-fast-component';

import { PageListSelectDrawer } from '../PageListSelectDrawer';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

@connect(({ department, schedulingControl }) => ({
  department,
  schedulingControl,
}))
class DepartmentSelectField extends BaseSelectFieldExtra {
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
    const { label, searchParams } = this.props;

    return (
      <PageListSelectDrawer
        searchParams={searchParams}
        title={buildFieldDescription(label, '选择')}
        width={1200}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

DepartmentSelectField.defaultProps = {
  ...BaseSelectFieldExtra.defaultProps,
  searchParams: {},
};

export { DepartmentSelectField };
