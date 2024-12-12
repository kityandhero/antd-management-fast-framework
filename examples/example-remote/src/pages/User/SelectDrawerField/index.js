import React from 'react';

import { connect } from 'easy-soft-dva';
import { buildFieldDescription, replaceWithKeep } from 'easy-soft-utility';

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
    const { userId, loginName, username, realName } = {
      userId: '',
      loginName: '',
      username: '',
      realName: '',
      ...data,
    };

    return (
      realName || username || loginName || replaceWithKeep(userId, '***', 2, 6)
    );
  };

  openSelector = () => {
    PageListDrawer.open();
  };

  renderPresetSelector = () => {
    const { label } = {
      label: '',
      ...this.props,
    };

    return (
      <PageListDrawer
        title={buildFieldDescription(label, '选择')}
        width={1200}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

export { UserSelectDrawerField };
