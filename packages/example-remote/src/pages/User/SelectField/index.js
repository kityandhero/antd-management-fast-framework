import React from 'react';

import { connect } from 'easy-soft-dva';
import { buildFieldDescription, replaceWithKeep } from 'easy-soft-utility';

import { FieldExtra } from 'antd-management-fast-component';

import PageListDrawer from '../PageListDrawer';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class UserSelectField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { nickname, userId } = {
      nickname: '',
      ...data,
    };

    return nickname || replaceWithKeep(userId, '***', 2, 6);
  };

  openDrawer = () => {
    PageListDrawer.open();
  };

  renderPresetSelectDrawer = () => {
    const { label } = this.props;

    return (
      <PageListDrawer
        title={buildFieldDescription(label, '选择')}
        width={1200}
        afterSelectSuccess={this.afterDrawerSelectSuccess}
      />
    );
  };
}

UserSelectField.defaultProps = {
  ...BaseSelectFieldExtra.defaultProps,
};

export { UserSelectField };
