import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BasePreviewDrawer } from '../../../pageBases';
import { fieldData } from '../Common/data';

const visibleFlag = '0ac8f79e1e1347aba69655bc25222fef';

@connect(({ workflowDebugCaseFormAttachment, schedulingControl }) => ({
  workflowDebugCaseFormAttachment,
  schedulingControl,
}))
class PreviewDrawer extends BasePreviewDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'workflowDebugCaseFormAttachment/get',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.workflowDebugCaseFormAttachmentId.name] =
      this.getFlowCaseFormAttachmentId(externalData);

    return d;
  };

  getFlowCaseFormAttachmentId = (o) => {
    return getValueByKey({
      data: o,
      key: fieldData.workflowDebugCaseFormAttachmentId.name,
      defaultValue: '',
    });
  };

  getFlowCaseFormAttachmentIdLabel = () => {
    return fieldData.workflowDebugCaseFormAttachmentId.label;
  };
}

export { PreviewDrawer };
