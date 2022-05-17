import React from 'react';
import { connect } from 'umi';
import {
  ContactsOutlined,
  VideoCameraOutlined,
  PictureOutlined,
  SoundOutlined,
  LinkOutlined,
} from '@ant-design/icons';

import {
  corsTarget,
  stringIsNullOrWhiteSpace,
  formatDatetime,
  toDatetime,
  getValueByKey,
  inCollection,
} from 'antd-management-fast-framework/es/utils/tools';
import {
  cardConfig,
  datetimeFormat,
  formatCollection,
} from 'antd-management-fast-framework/es/utils/constants';
import BaseUpdateDrawer from 'antd-management-fast-framework/es/framework/DataDrawer/BaseUpdateDrawer';

import { accessWayCollection } from '@/customConfig/config';
import { mediaTypeCollection } from '@/customConfig/constants';

import { mediaItemData } from '../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class Index extends BaseUpdateDrawer {
  componentAuthority = accessWayCollection.article.getMediaItem.permission;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        pageName: '修改媒体',
        loadApiPath: 'article/getMediaItem',
        submitApiPath: 'article/updateMediaItem',
        image: '',
        video: '',
        audio: '',
        attachment: '',
      },
    };
  }

  apiDataConvert = (props) => {
    const {
      article: { data },
    } = props;

    return data;
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      ...(this.supplementRequestParams(o) || {}),
      ...{
        mediaType,
        image,
        video,
        audio,
        attachment,
      },
    };
  };

  supplementRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    const { articleId, id } = {
      ...{
        articleId: '',
        id: '',
      },
      ...(externalData || {}),
    };

    if (!stringIsNullOrWhiteSpace(articleId)) {
      d.articleId = articleId;
    }

    if (!stringIsNullOrWhiteSpace(id)) {
      d.id = id;
    }

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = ({ metaData, metaListData, metaExtra, metaOriginalData }) => {
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
    const { dataLoading, processing, metaData, mediaType, image, video, audio, attachment } =
      this.state;

    const spinning = this.checkInProgress();

    return {
      list: [
        {
          title: {
            icon: <ContactsOutlined />,
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
            icon: <PictureOutlined />,
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
            icon: <VideoCameraOutlined />,
            text: mediaItemData.video.label,
          },
          spinning: processing,
          hidden: !inCollection([mediaTypeCollection.video], mediaType),
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
            icon: <SoundOutlined />,
            text: mediaItemData.audio.label,
          },
          spinning,
          hidden: !inCollection([mediaTypeCollection.audio], mediaType),
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
            icon: <LinkOutlined />,
            text: mediaItemData.attachment.label,
          },
          spinning,
          hidden: !inCollection([mediaTypeCollection.attachment], mediaType),
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
