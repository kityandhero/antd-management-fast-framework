export const code = `import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  getValueByKey,
  mergeArrowText,
  pretreatmentRemoteSingleData,
  showSimpleInfoMessage,
} from 'easy-soft-utility';

import { cardConfig, getCorsDomain } from 'antd-management-fast-common';
import {
  convertOptionOrRadioData,
  iconBuilder,
} from 'antd-management-fast-component';

import { fieldData } from '../../../businessData/data';
import { accessWayCollection } from '../../../customConfig';
import {
  addGalleryImageAction,
  removeGalleryImageConfirmAction,
} from '../../Simple/Assist/action';
import ChangeImageSortModal from '../../Simple/ChangeImageSortModal';
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
      image: '',
      video: '',
      audio: '',
      attachment: '',
      attachmentBase64: '',
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

      const v = pretreatmentRemoteSingleData({ source: response });

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

  showChangeImageSortModal = () => {
    ChangeImageSortModal.open();
  };

  afterChangeImageSortModalOk = () => {
    this.reloadData({});
  };

  establishCardCollectionConfig = () => {
    const {
      firstLoadSuccess,
      currentCode,
      currentCodeTitle,
      image,
      video,
      audio,
      attachment,
      attachmentBase64,
      fileList,
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
              type: cardConfig.contentItemType.imageUpload,
              image: image,
              action: \`/simple/uploadImage\`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            text: '示例: 图片相册',
            subText:
              '[相册最大容量为8张图片, 大小必须统一640*640 (800*800)，图片相册的添加和删除将自动保, 产品其他信息请在修改后点击保存按钮!]',
          },
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.generalButton,
                hidden: !checkHasAuthority(
                  accessWayCollection.simple.updateImageSort.permission,
                ),
                text: '调整图片顺序',
                icon: iconBuilder.sortAscending(),
                handleClick: (event) => this.showChangeImageSortModal(event),
                disabled: !firstLoadSuccess,
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageUpload,
              action: \`\${getCorsDomain()}/simple/uploadImage\`,
              disabled: !checkHasAuthority(
                accessWayCollection.simple.addImage.permission,
              ),
              multiple: true,
              fileList,
              showUploadList: {
                showPreviewIcon: true,
                showDownloadIcon: true,
                showRemoveIcon: checkHasAuthority(
                  accessWayCollection.simple.removeImage.permission,
                ),
              },
              onItemChange: this.handleGalleryUploadChange,
              onItemRemove: this.onGalleryRemove,
              // showUploadList: true,
            },
          ],
        },
        {
          title: {
            text: '示例',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.videoUpload,
              fieldData: fieldData.video,
              video,
              showPreview: true,
              action: \`/simple/uploadVideo\`,
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
              action: \`/simple/uploadAudio\`,
              afterChangeSuccess: (data) => {
                this.afterAudioChangeSuccess(data);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.fileBase64Upload,
              fieldData: fieldData.fileBase64,
              fileBase64: attachmentBase64,
              action: \`/application/uploadFileBase64\`,
              afterUploadSuccess: (data) => {
                this.afterFileBase64UploadSuccess(data);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.fileUpload,
              fieldData: fieldData.file,
              file: attachment,
              action: \`/application/uploadFile\`,
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

                  showSimpleInfoMessage(\`当前显示 \${v} 源代码\`);
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
`;
