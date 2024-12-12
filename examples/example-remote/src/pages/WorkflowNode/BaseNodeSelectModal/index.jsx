import { getValueByKey } from 'easy-soft-utility';

import { DataModal } from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseSelectModal } = DataModal;

class BaseNodeSelectModal extends BaseSelectModal {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '选择流程节点',
      loadApiPath: 'workflowNode/singleList',
    };
  }

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.props;

    d[fieldData.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowId.name,
    });

    return d;
  };
}

export { BaseNodeSelectModal };
