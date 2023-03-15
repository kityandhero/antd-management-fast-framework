import { connect } from 'easy-soft-dva';

import { FieldExtension } from 'antd-management-fast-framework';

import PageListDrawer from '../PageListDrawer';

const {
  SelectFieldDrawer: { SelectFieldInteractiveBase },
} = FieldExtension;

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SelectField extends SelectFieldInteractiveBase {
  renderPresetSelectDrawer = () => {
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
