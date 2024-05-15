import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  buildFieldDescription,
  checkStringIsNullOrWhiteSpace,
} from 'easy-soft-utility';

import { FieldExtra } from 'antd-management-fast-component';

import { PageListModal } from '../PageListModal';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class UserSelectModalField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { loginName, username, realName, phone } = {
      loginName: '',
      username: '',
      realName: '',
      phone: '',
      ...data,
    };

    return `${realName || username || loginName}${
      checkStringIsNullOrWhiteSpace(phone) ? '' : ` 【${phone}】`
    }`;
  };

  openSelector = () => {
    PageListModal.open();
  };

  renderPresetSelector = () => {
    const { label } = this.props;

    return (
      <PageListModal
        title={buildFieldDescription(label, '选择')}
        width={1200}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

UserSelectModalField.defaultProps = {
  ...BaseSelectFieldExtra.defaultProps,
};

export { UserSelectModalField };
