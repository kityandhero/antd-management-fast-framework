import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  formatCollection,
  getValueByKey,
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

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = '64849bbfc3d944d3bd7a4fcb3f5f8616';

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class UpdateMediaItemDrawer extends BaseUpdateDrawer {
  componentAuthority = accessWayCollection.section.getMediaItem.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '修改媒体',
      loadApiPath: 'section/getMediaItem',
      submitApiPath: 'section/updateMediaItem',
      type: keyValueTypeCollection.text,
      image: '',
      video: '',
      audio: '',
      attachment: '',
    };
  }

  supplementLoadRequestParams = (o) => {
    return this.supplementRequestParams(o);
  };

  supplementSubmitRequestParams = (o) => {
    const { type, image, video, audio, attachment } = this.state;

    return {
      ...this.supplementRequestParams(o),
      type,
      image,
      video,
      audio,
      attachment,
    };
  };

  supplementRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    const { sectionId, id } = {
      sectionId: '',
      id: '',
      ...externalData,
    };

    if (!checkStringIsNullOrWhiteSpace(sectionId)) {
      d.sectionId = sectionId;
    }

    if (!checkStringIsNullOrWhiteSpace(id)) {
      d.id = id;
    }

    return d;
  };

  doOtherAfterLoadSuccess = ({
    metaData,
    // eslint-disable-next-line no-unused-vars
    metaListData,
    // eslint-disable-next-line no-unused-vars
    metaExtra,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData,
  }) => {
    const type = getValueByKey({
      data: metaData,
      key: keyValueItemData.type.name,
    });

    const image = getValueByKey({
      data: metaData,
      key: keyValueItemData.image.name,
    });

    const video = getValueByKey({
      data: metaData,
      key: keyValueItemData.video.name,
    });

    const audio = getValueByKey({
      data: metaData,
      key: keyValueItemData.audio.name,
    });

    const attachment = getValueByKey({
      data: metaData,
      key: keyValueItemData.attachment.name,
    });

    this.setState({
      type: type,
      image,
      video,
      audio,
      attachment,
    });
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

  renderPresetTitle = () => {
    return '编辑媒体项';
  };

  fillInitialValuesAfterLoad = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
      values[keyValueItemData.title.name] = getValueByKey({
        data: metaData,
        key: keyValueItemData.title.name,
      });

      values[keyValueItemData.text.name] = getValueByKey({
        data: metaData,
        key: keyValueItemData.text.name,
      });

      values[keyValueItemData.multiText.name] = getValueByKey({
        data: metaData,
        key: keyValueItemData.multiText.name,
      });

      values[keyValueItemData.link.name] = getValueByKey({
        data: metaData,
        key: keyValueItemData.link.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { type, metaData, image, video, audio, attachment } = this.state;

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
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: keyValueItemData.typeNote,
              value: getValueByKey({
                data: metaData,
                key: keyValueItemData.typeNote.name,
              }),
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
        {
          title: {
            text: '其他信息',
          },
          items: [
            {
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: keyValueItemData.createTime,
              value: getValueByKey({
                data: metaData,
                key: keyValueItemData.createTime.name,
                format: formatCollection.datetime,
              }),
            },
            {
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: keyValueItemData.updateTime,
              value: getValueByKey({
                data: metaData,
                key: keyValueItemData.updateTime.name,
                format: formatCollection.datetime,
              }),
            },
          ],
        },
      ],
    };
  };
}

export { UpdateMediaItemDrawer };
