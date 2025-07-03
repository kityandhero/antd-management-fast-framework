import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseAttachmentPreviewDrawer } from '../../../pageBases';
import { fieldData } from '../Common/data';

const visibleFlag = '1862037d2beb46af92d85d33e379acd6';

@connect(({ workflowCaseFormAttachment, schedulingControl }) => ({
  workflowCaseFormAttachment,
  schedulingControl,
}))
class AttachmentPreviewDrawer extends BaseAttachmentPreviewDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'workflowCaseFormAttachment/get',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.workflowCaseFormAttachmentId.name] =
      this.getFlowCaseFormAttachmentId(externalData);

    return d;
  };

  getFlowCaseFormAttachmentId = (o) => {
    return getValueByKey({
      data: o,
      key: fieldData.workflowCaseFormAttachmentId.name,
      defaultValue: '',
    });
  };

  getFlowCaseFormAttachmentIdLabel = () => {
    return fieldData.workflowCaseFormAttachmentId.label;
  };
}

export { AttachmentPreviewDrawer };
