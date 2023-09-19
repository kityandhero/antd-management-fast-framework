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
  selectValueText = (data) => {
    const { title } = {
      title: '',
      ...data,
    };

    return title;
  };

  openSelector = () => {
    PageListDrawer.open();
  };

  renderPresetSelector = () => {
    const { drawerVisible } = this.state;

    return (
      <PageListDrawer
        visible={drawerVisible || false}
        width={1200}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

SelectField.defaultProps = {
  ...BaseSelectFieldExtra.defaultProps,
};

export default SelectField;
