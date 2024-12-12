import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseAddAttachmentModal } from '../../../pageBases';
import { fieldData as fieldDataWorkflowCase } from '../../WorkflowCase/Common/data';
import { addBasicInfoAction } from '../Assist/action';

const visibleFlag = '71bbf2f5e44142dc896be77fb10cadc9';

@connect(({ workflowCaseFormAttachment, schedulingControl }) => ({
  workflowCaseFormAttachment,
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
      key: fieldDataWorkflowCase.workflowCaseId.name,
      defaultValue: '0',
    });
  };

  addBasicInfo = (data) => {
    addBasicInfoAction(data);
  };

  closeAttachmentModal = () => {
    AddAttachmentModal.close();
  };

  getUploadAction = () => `/workflowCaseFormAttachment/uploadFile`;
}

export { AddAttachmentModal };
