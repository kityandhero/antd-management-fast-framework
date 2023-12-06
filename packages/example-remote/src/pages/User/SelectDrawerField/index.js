import React from 'react';

import { connect } from 'easy-soft-dva';
import { buildFieldDescription } from 'easy-soft-utility';

import { FieldExtra } from 'antd-management-fast-component';

import { PageListDrawer } from '../PageListDrawer';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class UserSelectDrawerField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { loginName, username, realName } = {
      loginName: '',
      username: '',
      realName: '',
      ...data,
    };

    return realName || username || loginName;
  };

  openSelector = () => {
    PageListDrawer.open();
  };

  renderPresetSelector = () => {
    const { label } = this.props;

    return (
      <PageListDrawer
        title={buildFieldDescription(label, '选择')}
        width={1200}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

UserSelectDrawerField.defaultProps = {
  ...BaseSelectFieldExtra.defaultProps,
};

export { UserSelectDrawerField };
