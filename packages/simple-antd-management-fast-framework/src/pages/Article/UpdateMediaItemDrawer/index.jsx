import React from 'react';
import { connect } from 'umi';
import { ContactsOutlined, VideoCameraOutlined, PictureOutlined } from '@ant-design/icons';

import {
  corsTarget,
  stringIsNullOrWhiteSpace,
  formatDatetime,
  toDatetime,
  getValueByKey,
} from 'antd-management-fast-framework/es/utils/tools';
import {
  cardConfig,
  datetimeFormat,
  formatCollection,
} from 'antd-management-fast-framework/es/utils/constants';
import { accessWayCollection } from '@/customConfig/config';

import BaseUpdateDrawer from 'antd-management-fast-framework/es/framework/DataDrawer/BaseUpdateDrawer';

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

  establishCardCollectionConfig = () => {
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
          spinning: dataLoading || processing,
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
          spinning: dataLoading || processing,
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
          spinning: dataLoading || processing,
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
          items: [
            {
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
            text: '其他信息',
          },
          spinning: dataLoading || processing,
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
