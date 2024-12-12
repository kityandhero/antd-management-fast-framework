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

@connect(({ positionGrade, schedulingControl }) => ({
  positionGrade,
  schedulingControl,
}))
class PositionGradeSelectModalField extends BaseSelectFieldExtra {
  selectValueText = (data) => {
    const { positionGradeId, name } = {
      positionGradeId: '',
      name: '',
      ...data,
    };

    return `${name}${
      checkStringIsNullOrWhiteSpace(positionGradeId)
        ? ''
        : ` 【${positionGradeId}】`
    }`;
  };

  openSelector = () => {
    PageListModal.open();
  };

  renderPresetSelector = () => {
    const { label } = {
      label: '',
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

export { PositionGradeSelectModalField };
