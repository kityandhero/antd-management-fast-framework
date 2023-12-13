import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { cardConfig, getCorsDomain } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { mediaItemData } from '../../../businessData/data';
import { accessWayCollection } from '../../../customConfig';
import { mediaTypeCollection } from '../../../customConfig/constants';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = 'b901740eb37b46fbade7931ce2ae875c';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class UpdateBasicInfoDrawer extends BaseUpdateDrawer {
  componentAuthority = accessWayCollection.simple.getMediaItem.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,

      pageTitle: '修改媒体',
      loadApiPath: 'simple/getMediaItem',
      submitApiPath: 'simple/updateMediaItem',
      image: '',
      video: '',
      audio: '',
      attachment: '',
    };
  }

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
      values[mediaItemData.title.name] = getValueByKey({
        data: metaData,
        key: mediaItemData.title.name,
      });

      values[mediaItemData.sort.name] = getValueByKey({
        data: metaData,
        key: mediaItemData.sort.name,
      });

      values[mediaItemData.description.name] = getValueByKey({
        data: metaData,
        key: mediaItemData.description.name,
      });

      values[mediaItemData.link.name] = getValueByKey({
        data: metaData,
        key: mediaItemData.link.name,
      });
    }

    return values;
  };

  supplementLoadRequestParams = (o) => {
    return this.supplementRequestParams(o);
  };

  supplementSubmitRequestParams = (o) => {
    const { mediaType, image, video, audio, attachment } = this.state;

    return {
      ...this.supplementRequestParams(o),

      mediaType,
      image,
      video,
      audio,
      attachment,
    };
  };

  supplementRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    const { simpleId, id } = {
      simpleId: '',
      id: '',
      ...externalData,
    };

    if (!checkStringIsNullOrWhiteSpace(simpleId)) {
      d.simpleId = simpleId;
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
    const mediaType = getValueByKey({
      data: metaData,
      key: mediaItemData.mediaType.name,
    });

    const image = getValueByKey({
      data: metaData,
      key: mediaItemData.image.name,
    });

    const video = getValueByKey({
      data: metaData,
      key: mediaItemData.video.name,
    });

    const audio = getValueByKey({
      data: metaData,
      key: mediaItemData.audio.name,
    });

    const attachment = getValueByKey({
      data: metaData,
      key: mediaItemData.attachment.name,
    });

    this.setState({
      mediaType,
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

  establishCardCollectionConfig = () => {
    const { processing, metaData, mediaType, image, video, audio, attachment } =
      this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: mediaItemData.title.label,
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: mediaItemData.title,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: mediaItemData.image.label,
            subText: '[上传后需点击保存按钮保存！]',
          },
          items: [
            {
              type: cardConfig.contentItemType.imageUpload,
              image,
              uploadProps: {
                singleMode: {
                  width: '140px',
                  emptyImage: '',
                },
              },
              action: `${getCorsDomain()}/simple/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            text: mediaItemData.description.label,
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: mediaItemData.description,
            },
          ],
        },
        {
          title: {
            text: mediaItemData.link.label,
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: mediaItemData.link,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.videoCamera(),
            text: mediaItemData.video.label,
          },
          spinning: processing,
          hidden: !checkInCollection([mediaTypeCollection.video], mediaType),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.videoUpload,
              fieldData: mediaItemData.video,
              video,
              showPreview: true,
              action: `${getCorsDomain()}/simple/uploadVideo`,
              afterChangeSuccess: (videoData) => {
                this.afterVideoChangeSuccess(videoData);
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.sound(),
            text: mediaItemData.audio.label,
          },
          hidden: !checkInCollection([mediaTypeCollection.audio], mediaType),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.audioUpload,
              fieldData: mediaItemData.audio,
              audio,
              showPreview: true,
              action: `${getCorsDomain()}/simple/uploadAudio`,
              afterChangeSuccess: (audioData) => {
                this.afterAudioChangeSuccess(audioData);
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.link(),
            text: mediaItemData.attachment.label,
          },
          hidden: !checkInCollection(
            [mediaTypeCollection.attachment],
            mediaType,
          ),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.fileUpload,
              fieldData: mediaItemData.attachment,
              file: attachment,
              showPreview: true,
              action: `${getCorsDomain()}/simple/uploadFile`,
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
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: mediaItemData.createTime,
              value: getValueByKey({
                data: metaData,
                key: mediaItemData.createTime.name,
                format: formatCollection.datetime,
              }),
            },
            {
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: mediaItemData.updateTime,
              value: getValueByKey({
                data: metaData,
                key: mediaItemData.updateTime.name,
                format: formatCollection.datetime,
              }),
            },
          ],
        },
      ],
    };
  };
}

export default UpdateBasicInfoDrawer;
