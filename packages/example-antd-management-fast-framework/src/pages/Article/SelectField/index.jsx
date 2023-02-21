import { connect } from '@umijs/max';

import { FieldExtension } from 'antd-management-fast-framework';

import PageListDrawer from '../PageListDrawer';

const {
  SelectFieldDrawer: { SelectFieldInteractiveBase },
} = FieldExtension;

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
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
