import { connect } from 'easy-soft-dva';
import { showInfoMessage } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

const { BaseDisplayModal } = DataModal;

const visibleFlag = '1fe51dc90ab142eb918d5385762ab06a';

@connect(({ uploadHistory, schedulingControl }) => ({
  uploadHistory,
  schedulingControl,
}))
class ImportFileModal extends BaseDisplayModal {
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
      pageTitle: '导入用友用户文件',
      file: '',
    };
  }

  doOtherWhenChangeVisibleToHide = () => {
    this.setState({ file: '' });
  };

  afterAudioUploadSuccess = (file) => {
    this.setState({ file }, () => {
      showInfoMessage({
        text: '上传成功，即将关闭窗口',
        onClose: () => {
          setTimeout(() => {
            ImportFileModal.close();
          }, 400);
        },
      });
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
                label: '选择Execl',
                name: 'name',
                helper: '',
              },
              file,
              action: `/yonYouImportHistory/importFile`,
              afterUploadSuccess: (fileData) => {
                this.afterImageUploadSuccess(fileData);
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

export { ImportFileModal };
