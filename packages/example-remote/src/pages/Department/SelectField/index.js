import React from 'react';

import { connect } from 'easy-soft-dva';
import { buildFieldDescription } from 'easy-soft-utility';

import { FieldExtra } from 'antd-management-fast-component';

import PageListDrawer from '../PageListDrawer';

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

  openDrawer = () => {
    PageListDrawer.open();
  };

  renderPresetSelectDrawer = () => {
    const { label, searchParams } = this.props;

    return (
      <PageListDrawer
        searchParams={searchParams}
        title={buildFieldDescription(label, '选择')}
        width={1200}
        afterSelectSuccess={this.afterDrawerSelectSuccess}
      />
    );
  };
}

DepartmentSelectField.defaultProps = {
  ...BaseSelectFieldExtra.defaultProps,
  searchParams: {},
};

export { DepartmentSelectField };
