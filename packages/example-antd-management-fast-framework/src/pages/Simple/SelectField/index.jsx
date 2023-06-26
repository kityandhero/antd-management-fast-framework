import { connect } from 'easy-soft-dva';

import { FieldExtra } from 'antd-management-fast-component';

import PageListDrawer from '../PageListDrawer';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SelectField extends BaseSelectFieldExtra {
  renderPresetSelectDrawer = () => {
    const { drawerVisible } = this.state;

    return (
      <PageListDrawer
        visible={drawerVisible || false}
        width={1200}
        afterSelectSuccess={this.afterDrawerSelectSuccess}
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
