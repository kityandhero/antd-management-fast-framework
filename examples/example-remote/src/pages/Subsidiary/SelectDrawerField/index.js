import React from 'react';

import { connect } from 'easy-soft-dva';
import { buildFieldDescription, replaceWithKeep } from 'easy-soft-utility';

import { FieldExtra } from 'antd-management-fast-component';

import { PageListSelectDrawer } from '../PageListSelectDrawer';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class SubsidiarySelectDrawerField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { nickname, userId } = {
      nickname: '',
      ...data,
    };

    return nickname || replaceWithKeep(userId, '***', 2, 6);
  };

  openSelector = () => {
    PageListSelectDrawer.open();
  };

  renderPresetSelector = () => {
    const { label } = {
      label: '',
      ...this.props,
    };

    return (
      <PageListSelectDrawer
        title={buildFieldDescription(label, '选择')}
        width={1200}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

export { SubsidiarySelectDrawerField };
