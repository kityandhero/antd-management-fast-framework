import React from 'react';
import { connect } from 'umi';
import { ContactsOutlined, VideoCameraOutlined, PictureOutlined } from '@ant-design/icons';

import {
  corsTarget,
  stringIsNullOrWhiteSpace,
  getPathValue,
  formatDatetime,
  toDatetime,
} from 'antd-management-fast-framework/lib/utils/tools';
import {
  formContentConfig,
  datetimeFormat,
} from 'antd-management-fast-framework/lib/utils/constants';
import { accessWayCollection } from '@/customConfig/config';

import BaseUpdateDrawer from 'antd-management-fast-framework/lib/framework/DataDrawer/BaseUpdateDrawer';

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
      },
    };
  }

  getApiData = (props) => {
    const {
      article: { data },
    } = props;

    return data;
  };

  fillFormInitialValuesAfterLoad = ({
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
      values[mediaItemData.title.name] = getPathValue(metaData, mediaItemData.title.name);
      values[mediaItemData.sort.name] = getPathValue(metaData, mediaItemData.sort.name);
      values[mediaItemData.description.name] = getPathValue(
        metaData,
        mediaItemData.description.name,
      );
      values[mediaItemData.link.name] = getPathValue(metaData, mediaItemData.link.name);

      values[mediaItemData.createTime.name] = formatDatetime(
        getPathValue(metaData, mediaItemData.createTime.name),
        datetimeFormat.monthDayHourMinuteSecond,
        '',
      );
      values[mediaItemData.updateTime.name] = formatDatetime(
        getPathValue(metaData, mediaItemData.updateTime.name),
        datetimeFormat.monthDayHourMinuteSecond,
        '',
      );
    }

    console.log(values);
    return values;
  };

  supplementLoadRequestParams = (o) => {
    return this.supplementRequestParams(o);
  };

  supplementSubmitRequestParams = (o) => {
    const { image, video } = this.state;

    return {
      ...(this.supplementRequestParams(o) || {}),
      ...{ image, video },
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
    const { image, video } = metaData;

    this.setState({
      image: image || '',
      video: video || '',
    });
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image });
  };

  afterVideoChangeSuccess = (video) => {
    this.setState({ video });
  };

  renderTitle = () => {
    return '编辑媒体项';
  };

  formContentConfigData = () => {
    const { dataLoading, processing, metaData, image, video } = this.state;

    return {
      list: [
        {
          title: {
            icon: <ContactsOutlined />,
            text: mediaItemData.title.label,
          },
          spinning: dataLoading || processing,
          items: [
            {
              lg: 24,
              type: formContentConfig.contentItemType.input,
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
          spinning: dataLoading || processing,
          items: [
            {
              type: formContentConfig.contentItemType.imageUpload,
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
          spinning: dataLoading || processing,
          items: [
            {
              lg: 24,
              type: formContentConfig.contentItemType.textarea,
              fieldData: mediaItemData.description,
            },
          ],
        },
        {
          title: {
            text: mediaItemData.link.label,
          },
          spinning: dataLoading || processing,
          items: [
            {
              lg: 24,
              type: formContentConfig.contentItemType.input,
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
          items: [
            {
              type: formContentConfig.contentItemType.videoUpload,
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
            text: '其他信息',
          },
          spinning: dataLoading || processing,
          items: [
            {
              type: formContentConfig.contentItemType.onlyShowInput,
              fieldData: mediaItemData.createTime,
              value:
                metaData == null
                  ? null
                  : formatDatetime(
                      toDatetime(getPathValue(metaData, mediaItemData.createTime.name, '')),
                      datetimeFormat.monthDayHourMinuteSecond,
                    ),
            },
            {
              type: formContentConfig.contentItemType.onlyShowInput,
              fieldData: mediaItemData.updateTime,
              value:
                metaData == null
                  ? null
                  : formatDatetime(
                      toDatetime(getPathValue(metaData, mediaItemData.updateTime.name, '')),
                      datetimeFormat.monthDayHourMinuteSecond,
                    ),
            },
          ],
        },
      ],
    };
  };
}

export default Index;
