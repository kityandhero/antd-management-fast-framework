import React from 'react';
import { connect } from 'umi';

import SelectFieldInteractiveBase from 'antd-management-fast-framework/es/framework/FieldExtension/SelectFieldDrawer/SelectFieldDrawerBase';

import PageListDrawer from '../PageListDrawer';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class SelectField extends SelectFieldInteractiveBase {
  renderSelectDrawer = () => {
    const { drawerVisible } = this.state;

    return (
      <PageListDrawer
        visible={drawerVisible || false}
        width={1200}
        afterSelectSuccess={this.afterDrawerSelectSuccess}
        afterClose={this.afterDrawerClose}
      />
    );
  };

  getFieldData = () => {
    const { title, label, fieldTitle } = this.props;

    return {
      fieldText: title || '',
      fieldTitle: fieldTitle || label || '文章',
      fieldPlaceholder: '请选择',
    };
  };
}

export default SelectField;
