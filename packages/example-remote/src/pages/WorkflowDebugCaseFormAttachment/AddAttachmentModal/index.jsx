import { connect } from 'easy-soft-dva';
import { getValueByKey, showInfoMessage } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { fieldData as fieldDataWorkflowDebugCase } from '../../WorkflowDebugCase/Common/data';
import { addBasicInfoAction } from '../Assist/action';

const { BaseDisplayModal } = DataModal;

const visibleFlag = '57eb4b6eeead42de99f5a960aaa13e43';

@connect(
  ({ workflowDebugCaseFormAttachment, uploadHistory, schedulingControl }) => ({
    workflowDebugCaseFormAttachment,
    uploadHistory,
    schedulingControl,
  }),
)
class AddAttachmentModal extends BaseDisplayModal {
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
      pageTitle: '上传附件',
      file: '',
    };
  }

  doOtherWhenChangeVisibleToHide = () => {
    this.setState({ file: '' });
  };

  afterFileUploadSuccess = (file, data) => {
    const that = this;

    const { uploadHistoryId } = {
      uploadHistoryId: '',
      ...data,
    };

    that.setState({ file }, () => {
      showInfoMessage({
        text: '附件上传成功，即将设置附件信息',
        onClose: () => {
          that.addAttachment({ uploadHistoryId });
        },
      });
    });
  };

  addAttachment = (data) => {
    const { uploadHistoryId } = data;
    const { externalData } = this.state;

    const workflowId = getValueByKey({
      data: externalData,
      key: fieldDataWorkflowDebugCase.workflowId.name,
    });

    const flowCaseId = getValueByKey({
      data: externalData,
      key: fieldDataWorkflowDebugCase.workflowDebugCaseId.name,
    });

    addBasicInfoAction({
      target: this,
      handleData: {
        workflowId: workflowId || 0,
        flowCaseId: flowCaseId || 0,
        uploadHistoryId: uploadHistoryId || 0,
      },
      successCallback: () => {
        setTimeout(() => {
          AddAttachmentModal.close();
        }, 400);
      },
    });
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '70px',
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    return values;
  };

  establishCardCollectionConfig = () => {
    const { file } = this.state;

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.fileUpload,
              fieldData: {
                label: '选择文件',
                name: 'name',
                helper: '',
              },
              file,
              action: `/uploadHistory/uploadFile`,
              afterUploadSuccess: (fileData, data) => {
                this.afterFileUploadSuccess(fileData, data);
              },
            },
          ],
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '上传成功将自动保存, 上传成功后关闭窗口即可。',
        },
      ],
    };
  };
}

export { AddAttachmentModal };
