import { connect } from '@umijs/max';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { cardConfig, corsTarget } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataDrawer } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig/config';
import { mediaTypeCollection } from '../../../customConfig/constants';
import { mediaItemData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class Index extends BaseUpdateDrawer {
  componentAuthority = accessWayCollection.article.getMediaItem.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      pageName: '修改媒体',
      loadApiPath: 'article/getMediaItem',
      submitApiPath: 'article/updateMediaItem',
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

    const { articleId, id } = {
      articleId: '',
      id: '',
      ...externalData,
    };

    if (!checkStringIsNullOrWhiteSpace(articleId)) {
      d.articleId = articleId;
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

  renderTitle = () => {
    return '编辑媒体项';
  };

  establishCardCollectionConfig = () => {
    const { processing, metaData, mediaType, image, video, audio, attachment } =
      this.state;

    const spinning = this.checkInProgress();

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: mediaItemData.title.label,
          },
          spinning,
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
          spinning,
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
              action: `${corsTarget()}/article/uploadImage`,
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
          spinning,
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
          spinning,
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
              action: `${corsTarget()}/article/uploadVideo`,
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
          spinning,
          hidden: !checkInCollection([mediaTypeCollection.audio], mediaType),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.audioUpload,
              fieldData: mediaItemData.audio,
              audio,
              showPreview: true,
              action: `${corsTarget()}/article/uploadAudio`,
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
          spinning,
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
              action: `${corsTarget()}/article/uploadFile`,
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
          spinning,
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

export default Index;
