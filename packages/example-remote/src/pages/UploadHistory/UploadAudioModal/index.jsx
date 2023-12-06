import { connect } from 'easy-soft-dva';
import { showInfoMessage } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

const { BaseDisplayModal } = DataModal;

const visibleFlag = 'c54f839996f94340b22b63234c7b0265';

@connect(({ uploadHistory, schedulingControl }) => ({
  uploadHistory,
  schedulingControl,
}))
class UploadAudioModal extends BaseDisplayModal {
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
      pageTitle: '上传音频',
      audio: '',
    };
  }

  doOtherWhenChangeVisibleToHide = () => {
    this.setState({ audio: '' });
  };

  afterAudioUploadSuccess = (audio) => {
    this.setState({ audio }, () => {
      showInfoMessage({
        text: '音频上传成功，即将关闭窗口',
        onClose: () => {
          setTimeout(() => {
            UploadAudioModal.close();
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
    const { audio } = this.state;

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.audioUpload,
              fieldData: {
                label: '选择音频',
                name: 'name',
                helper: '',
              },
              audio,
              action: `/uploadHistory/uploadAudio`,
              afterUploadSuccess: (audioData) => {
                this.afterAudioUploadSuccess(audioData);
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

export { UploadAudioModal };
