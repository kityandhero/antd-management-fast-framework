import { connect } from 'easy-soft-dva';
import {
  getValueByKey,
  mergeArrowText,
  pretreatmentRemoteSingleData,
  showSimpleInfoMessage,
} from 'easy-soft-utility';

import { cardConfig, getCorsDomain } from 'antd-management-fast-common';
import { convertOptionOrRadioData } from 'antd-management-fast-component';

import { fieldData } from '../../../businessData/data';
import {
  addGalleryImageAction,
  removeGalleryImageConfirmAction,
} from '../../Simple/Assist/action';
import { fieldData as fieldDataSimpleImage } from '../../SimpleImage/Common/data';
import BaseView from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeUploadView } from './codeSource';

// eslint-disable-next-line no-unused-vars
function dataConvert(o, index) {
  const { flag, name } = o;

  return { label: name, value: flag, disabled: false, ...o };
}

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class NormalView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Upload 示例',
      currentCodeTitle: 'UploadView',
      currentCode: codeUploadView,
      attachmentBase64: '',
      image: '',
      rectangleImage: '',
    };
  }

  afterImageUploadSuccess = (image) => {
    this.setState({ image });
  };

  afterRectangleImageUploadSuccess = (image) => {
    this.setState({ rectangleImage: image });
  };

  afterVideoChangeSuccess = (video) => {
    this.setState({ video });
  };

  afterAudioChangeSuccess = (audio) => {
    this.setState({ audio });
  };

  afterFileBase64UploadSuccess = (base64) => {
    this.setState({ attachmentBase64: base64 });
  };

  afterFileUploadSuccess = (file) => {
    this.setState({ attachment: file });
  };

  afterAttachmentChangeSuccess = (attachment) => {
    this.setState({ attachment });
  };

  handleGalleryUploadChange = ({ file, fileList }) => {
    this.setState({ fileList: [...fileList] });

    if (file.status === 'done') {
      const { response } = file;

      const v = pretreatmentRemoteSingleData(response);

      const { dataSuccess } = v;

      if (dataSuccess) {
        const {
          data: { imageUrl },
        } = v;

        this.addGalleryImage({ file, fileList, imageUrl });
      }
    }
  };

  addGalleryImage = ({ file, fileList, imageUrl }) => {
    const { metaData } = this.state;

    addGalleryImageAction({
      target: this,
      handleData: { ...metaData, url: imageUrl },
      successCallback: ({ target, remoteData }) => {
        for (const item of fileList || []) {
          if (item.uid === file.uid) {
            item[fieldDataSimpleImage.simpleImageId.name] = getValueByKey({
              data: remoteData,
              key: fieldDataSimpleImage.simpleImageId.name,
            });
          }
        }

        target.setState({ fileList: [...fileList] });
      },
    });
  };

  onGalleryRemove = (file) => {
    const simpleImageId = getValueByKey({
      data: file,
      key: fieldDataSimpleImage.simpleImageId.name,
    });

    removeGalleryImageConfirmAction({
      target: this,
      handleData: { simpleImageId },
      successCallback: ({ target }) => {
        const { fileList } = this.state;

        const list = [];

        for (const item of fileList || []) {
          const itemProductImageId = getValueByKey({
            data: item,
            key: fieldDataSimpleImage.simpleImageId.name,
          });

          if (itemProductImageId !== simpleImageId) {
            list.push(item);
          }
        }

        target.setState({ fileList: [...list] });
      },
    });

    return false;
  };

  afterChangeImageSortModalOk = () => {
    this.reloadData({});
  };

  establishCardCollectionConfig = () => {
    const {
      currentCode,
      currentCodeTitle,
      video,
      audio,
      attachment,
      attachmentBase64,
    } = this.state;

    const that = this;

    return {
      list: [
        {
          title: {
            text: '示例',
          },
          extra: {
            affix: true,
            split: false,
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
              {
                buildType: cardConfig.extraBuildType.save,
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.videoUpload,
              fieldData: fieldData.video,
              video,
              showPreview: true,
              action: `${getCorsDomain()}/simple/uploadVideo`,
              afterChangeSuccess: (data) => {
                this.afterVideoChangeSuccess(data);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.audioUpload,
              fieldData: fieldData.audio,
              audio,
              showPreview: true,
              action: `${getCorsDomain()}/simple/uploadAudio`,
              afterChangeSuccess: (data) => {
                this.afterAudioChangeSuccess(data);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.fileBase64Upload,
              fieldData: fieldData.fileBase64,
              fileBase64: attachmentBase64,
              action: `${getCorsDomain()}/application/uploadFileBase64`,
              afterUploadSuccess: (data) => {
                this.afterFileBase64UploadSuccess(data);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.fileUpload,
              fieldData: fieldData.file,
              file: attachment,
              action: `${getCorsDomain()}/application/uploadFile`,
              afterUploadSuccess: (data) => {
                this.afterFileUploadSuccess(data);
              },
            },
          ],
        },
        {
          title: {
            text: '代码示例',
            subText: mergeArrowText('Code', currentCodeTitle),
          },
          extra: {
            affix: true,
            split: false,
            list: [
              {
                buildType: cardConfig.extraBuildType.flexSelect,
                label: '显示源代码',
                size: 'small',
                defaultValue: 'UploadView',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'BaseView',
                    name: 'BaseView',
                  },
                  {
                    flag: 'UploadView',
                    name: 'UploadView',
                  },
                ],
                dataConvert: convertOptionOrRadioData,
                onChange: (v) => {
                  let code = '';

                  switch (v) {
                    case 'BaseView': {
                      code = codeBaseView;
                      break;
                    }

                    case 'UploadView': {
                      code = codeUploadView;
                      break;
                    }
                  }

                  that.setState({
                    currentCodeTitle: v,
                    currentCode: code,
                  });

                  showSimpleInfoMessage(`当前显示 ${v} 源代码`);
                },
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.syntaxHighlighterView,
              fieldData: 'syntaxHighlighter',
              value: currentCode,
              language: 'js',
              innerProps: {
                showLineNumbers: false,
                wrapLines: false,
              },
            },
          ],
        },
      ],
    };
  };

  renderPresetPageFooter = () => {
    return 'PageFooter';
  };
}

export default NormalView;
