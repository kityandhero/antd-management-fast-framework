import React from 'react';

import { connect } from 'easy-soft-dva';
import { buildFieldDescription } from 'easy-soft-utility';

import { FieldExtra } from 'antd-management-fast-component';

import { PageListModal } from '../PageListModal';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

@connect(({ subsidiary, schedulingControl }) => ({
  subsidiary,
  schedulingControl,
}))
class SubsidiarySelectModalField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { fullName, shortName } = {
      shortName: '',
      fullName: '',
      ...data,
    };

    return shortName || fullName;
  };

  openSelector = () => {
    PageListModal.open();
  };

  renderPresetSelector = () => {
    const { label } = {
      label: '选择企业',
      ...this.props,
    };

    return (
      <PageListModal
        title={buildFieldDescription(label, '选择')}
        width={1200}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

export { SubsidiarySelectModalField };
