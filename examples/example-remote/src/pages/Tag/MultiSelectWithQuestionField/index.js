import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  buildFieldDescription,
  getValueByKey,
  isArray,
  isEmptyArray,
} from 'easy-soft-utility';

import { FieldExtra } from 'antd-management-fast-component';

import { fieldData } from '../Common/data';
import { PageListWithQuestionMultiSelectModal } from '../PageListWithQuestionMultiSelectModal';

const {
  SelectFieldExtra: { BaseSelectFieldExtra },
} = FieldExtra;

@connect(({ tag, schedulingControl }) => ({
  tag,
  schedulingControl,
}))
class TagMultiSelectWithQuestionField extends BaseSelectFieldExtra {
  selectValueText = (list) => {
    if (!isArray(list) || isEmptyArray(list)) {
      return '';
    }

    const nameList = list.map((o) => {
      return getValueByKey({
        data: o,
        key: fieldData.displayName.name,
      });
    });

    return nameList.join(',');
  };

  openSelector = () => {
    PageListWithQuestionMultiSelectModal.open();
  };

  renderPresetSelector = () => {
    const { label, searchParams } = this.props;

    return (
      <PageListWithQuestionMultiSelectModal
        searchParams={searchParams || {}}
        title={buildFieldDescription(label, '选择')}
        width={1200}
        afterSelectSuccess={this.afterSelectSuccess}
      />
    );
  };
}

export { TagMultiSelectWithQuestionField };
