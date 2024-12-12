import { getValueByKey, showInfoMessage } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal } from 'antd-management-fast-framework';

import { fieldDataFlowCaseFormAttachment } from '../../../customConfig';

const { BaseDisplayModal } = DataModal;

class BaseAddAttachmentModal extends BaseDisplayModal {
  constructor(properties, visibleFlag) {
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

  getFlowCaseId = () => {
    throw new Error('getFlowCaseId need overrode to implement');
  };

  addAttachment = (data) => {
    const { uploadHistoryId } = data;
    const { externalData } = this.state;

    const workflowId = getValueByKey({
      data: externalData,
      key: fieldDataFlowCaseFormAttachment.workflowId.name,
    });

    const that = this;

    const o = {
      target: this,
      handleData: {
        workflowId: workflowId || 0,
        flowCaseId: that.getFlowCaseId() || '0',
        uploadHistoryId: uploadHistoryId || 0,
      },
      successCallback: () => {
        setTimeout(() => {
          that.closeAttachmentModal();
        }, 400);
      },
    };

    that.addBasicInfo(o);
  };

  // eslint-disable-next-line no-unused-vars
  addBasicInfo = (data) => {
    throw new Error('addBasicInfo need overrode to implement');
  };

  closeAttachmentModal = () => {
    throw new Error('closeAttachmentModal need overrode to implement');
  };

  getUploadAction = () => {
    throw new Error('getUploadAction need overrode to implement');
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
              action: this.getUploadAction(),
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

export { BaseAddAttachmentModal };
