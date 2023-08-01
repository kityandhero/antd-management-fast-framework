import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  toNumber,
  toString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import {
  accessWayCollection,
  keyValueItemData,
  keyValueTypeCollection,
} from '../../../customConfig';
import { renderFormJsonItemTypeSelect } from '../../../customSpecialComponents';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = '4c33cdd25f1b4b8da103d59ead1b02d8';

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class AddMediaItemDrawer extends BaseAddDrawer {
  componentAuthority = accessWayCollection.section.addMediaItem.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增媒体',
      submitApiPath: 'section/addMediaItem',
      mediaType: keyValueTypeCollection.text,
      image: '',
      video: '',
      audio: '',
      attachment: '',
    };
  }

  executeOtherAfterDoOtherWhenChangeVisible = () => {
    this.setState({
      mediaType: keyValueTypeCollection.text,
      image: '',
      video: '',
      audio: '',
      attachment: '',
    });
  };

  supplementSubmitRequestParams = (o) => {
    const { image, video, audio, attachment } = this.state;

    return {
      ...this.supplementRequestParams(o),

      image,
      video,
      audio,
      attachment,
    };
  };

  supplementRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    const { sectionId, forwardId } = {
      sectionId: '',
      forwardId: '',
      ...externalData,
    };

    if (!checkStringIsNullOrWhiteSpace(sectionId)) {
      d.sectionId = sectionId;
    }

    if (!checkStringIsNullOrWhiteSpace(forwardId)) {
      d.forwardId = forwardId;
    }

    return d;
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image });
  };

  afterVideoChangeSuccess = (video) => {
    this.setState({ video });
  };

  afterAudioChangeSuccess = (audio) => {
    this.setState({ audio });
  };

  afterAttachmentChangeSuccess = (attachment) => {
    this.setState({ attachment });
  };

  onTypeChange = (v) => {
    this.setState({ mediaType: toNumber(v) });
  };

  renderPresetTitleIcon = () => iconBuilder.addCircle();

  renderPresetTitle = () => {
    return '添加媒体项';
  };

  fillDefaultInitialValues = () => {
    const values = {};

    values[keyValueItemData.type.name] = toString(keyValueTypeCollection.text);

    return values;
  };

  establishCardCollectionConfig = () => {
    const { mediaType, image, video, audio, attachment } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: keyValueItemData.title.label,
          },

          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: renderFormJsonItemTypeSelect({
                onChange: (event) => {
                  this.onTypeChange(event);
                },
              }),
              require: true,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: keyValueItemData.image.label,
            subText: '[上传后需点击保存按钮保存]',
          },

          hidden: !checkInCollection(
            [keyValueTypeCollection.image, keyValueTypeCollection.video],
            mediaType,
          ),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageUpload,
              image,
              uploadProps: {
                singleMode: {
                  width: '140px',
                  emptyImage: '',
                },
              },
              action: `/section/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            text: keyValueItemData.multiText.label,
          },

          hidden: !checkInCollection([keyValueTypeCollection.text], mediaType),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: keyValueItemData.multiText,
            },
          ],
        },
        {
          title: {
            text: keyValueItemData.link.label,
          },

          hidden: !checkInCollection([keyValueTypeCollection.link], mediaType),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: keyValueItemData.link,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.video(),
            text: keyValueItemData.video.label,
          },

          hidden: !checkInCollection([keyValueTypeCollection.video], mediaType),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.videoUpload,
              fieldData: keyValueItemData.video,
              video,
              showPreview: true,
              action: `/section/uploadVideo`,
              afterChangeSuccess: (videoData) => {
                this.afterVideoChangeSuccess(videoData);
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.sound(),
            text: keyValueItemData.audio.label,
          },

          hidden: !checkInCollection([keyValueTypeCollection.audio], mediaType),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.audioUpload,
              fieldData: keyValueItemData.audio,
              audio,
              showPreview: true,
              action: `/section/uploadAudio`,
              afterChangeSuccess: (audioData) => {
                this.afterAudioChangeSuccess(audioData);
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.link(),
            text: keyValueItemData.attachment.label,
          },

          hidden: !checkInCollection(
            [keyValueTypeCollection.attachment],
            mediaType,
          ),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.fileUpload,
              fieldData: keyValueItemData.attachment,
              file: attachment,
              showPreview: true,
              action: `/section/uploadFile`,
              afterChangeSuccess: (attachmentData) => {
                this.afterAttachmentChangeSuccess(attachmentData);
              },
            },
          ],
        },
        {
          title: {
            text: '其他信息',
          },

          items: [
            {
              type: cardConfig.contentItemType.nowTime,
            },
          ],
        },
      ],
    };
  };
}

export { AddMediaItemDrawer };
