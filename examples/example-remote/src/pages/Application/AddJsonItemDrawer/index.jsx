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

const visibleFlag = '94b9e4d826d7403ab50568c690315fe3';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class AddJsonItemDrawer extends BaseAddDrawer {
  componentAuthority =
    accessWayCollection.application.addCustomGlobalDataItem.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增项',
      submitApiPath: 'application/addCustomGlobalDataItem',
      type: keyValueTypeCollection.text,
      image: '',
      video: '',
      audio: '',
      attachment: '',
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
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
      ...this.supplementRequestParams({
        text: '',
        multiText: '',
        link: '',
        ...o,
      }),
      image,
      video,
      audio,
      attachment,
    };
  };

  supplementRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    const { applicationId, forwardId } = {
      applicationId: '',
      forwardId: '',
      ...externalData,
    };

    if (!checkStringIsNullOrWhiteSpace(applicationId)) {
      d.applicationId = applicationId;
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

  renderPresetTitleIcon = () => null;

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
                helper: keyValueItemData.type.helper,
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
              require: true,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.form(),
            text: '设置文本',
          },
          hidden: !checkInCollection([keyValueTypeCollection.text], type),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: keyValueItemData.text,
              require: false,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.form(),
            text: '设置长文本',
          },
          hidden: !checkInCollection([keyValueTypeCollection.multiText], type),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: keyValueItemData.multiText,
              require: false,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.form(),
            text: '设置链接',
          },
          hidden: !checkInCollection([keyValueTypeCollection.link], type),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: keyValueItemData.link,
              require: false,
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
            type,
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
              action: `/application/uploadImage`,
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
              action: `/application/uploadVideo`,
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
              action: `/application/uploadAudio`,
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
          hidden: !checkInCollection([keyValueTypeCollection.attachment], type),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.fileUpload,
              fieldData: keyValueItemData.attachment,
              file: attachment,
              showPreview: true,
              action: `/application/uploadFile`,
              afterChangeSuccess: (attachmentData) => {
                this.afterAttachmentChangeSuccess(attachmentData);
              },
            },
          ],
        },
        buildNowTimeFieldItem({}),
      ],
    };
  };
}

export { AddJsonItemDrawer };
