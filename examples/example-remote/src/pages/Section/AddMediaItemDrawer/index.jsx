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
import {
  buildNowTimeFieldItem,
  renderFormJsonItemTypeSelect,
} from '../../../customSpecialComponents';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = '7cfebbd20b2842df92d3dd3b8a357ac2';

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
      type: keyValueTypeCollection.text,
      image: '',
      video: '',
      audio: '',
      attachment: '',
    };
  }

  executeOtherAfterDoOtherWhenChangeVisible = () => {
    this.setState({
      type: keyValueTypeCollection.text,
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
    this.setState({ type: toNumber(v) });
  };

  renderPresetTitle = () => {
    return '添加媒体项';
  };

  fillDefaultInitialValues = () => {
    const values = {};

    values[keyValueItemData.type.name] = toString(keyValueTypeCollection.text);

    return values;
  };

  establishCardCollectionConfig = () => {
    const { type, image, video, audio, attachment } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: keyValueItemData.title.label,
          },
          items: [
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormJsonItemTypeSelect({
                onChange: (event) => {
                  this.onTypeChange(event);
                },
              }),
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: keyValueItemData.title,
            },
          ],
        },
        {
          title: {
            text: keyValueItemData.text.label,
          },
          hidden: !checkInCollection([keyValueTypeCollection.text], type),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: keyValueItemData.text,
            },
          ],
        },
        {
          title: {
            text: keyValueItemData.multiText.label,
          },
          hidden: !checkInCollection([keyValueTypeCollection.multiText], type),
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
            icon: iconBuilder.picture(),
            text: keyValueItemData.image.label,
            subText: '[上传后需点击保存按钮保存]',
          },
          hidden: !checkInCollection([keyValueTypeCollection.image], type),
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
            icon: iconBuilder.picture(),
            text: '视频封面图',
            subText: '[上传后需点击保存按钮保存]',
          },
          hidden: !checkInCollection([keyValueTypeCollection.video], type),
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
            icon: iconBuilder.video(),
            text: keyValueItemData.video.label,
          },
          hidden: !checkInCollection([keyValueTypeCollection.video], type),
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
          hidden: !checkInCollection([keyValueTypeCollection.audio], type),
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
            icon: iconBuilder.file(),
            text: keyValueItemData.attachment.label,
          },
          hidden: !checkInCollection([keyValueTypeCollection.attachment], type),
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
            text: keyValueItemData.link.label,
          },
          hidden: !checkInCollection([keyValueTypeCollection.link], type),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: keyValueItemData.link,
            },
          ],
        },
        buildNowTimeFieldItem({}),
      ],
    };
  };
}

export { AddMediaItemDrawer };
