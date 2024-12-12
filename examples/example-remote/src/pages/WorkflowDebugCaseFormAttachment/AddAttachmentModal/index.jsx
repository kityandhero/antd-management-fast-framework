import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseAddAttachmentModal } from '../../../pageBases';
import { fieldData as fieldDataWorkflowDebugCase } from '../../WorkflowDebugCase/Common/data';
import { addBasicInfoAction } from '../Assist/action';

const visibleFlag = '37f7b7148abf40d5894975e99bf13955';

@connect(({ workflowDebugCaseFormAttachment, schedulingControl }) => ({
  workflowDebugCaseFormAttachment,
  schedulingControl,
}))
class AddAttachmentModal extends BaseAddAttachmentModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  static close() {
    switchControlAssist.close(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
    };
  }

  getFlowCaseId = () => {
    const { externalData } = this.state;

    return getValueByKey({
      data: externalData,
      key: fieldDataWorkflowDebugCase.workflowDebugCaseId.name,
      defaultValue: '0',
    });
  };

  addBasicInfo = (data) => {
    addBasicInfoAction(data);
  };

  closeAttachmentModal = () => {
    AddAttachmentModal.close();
  };

  getUploadAction = () => `/workflowDebugCaseFormAttachment/uploadFile`;
}

export { AddAttachmentModal };
