import React from 'react';
import { connect } from 'umi';
import {
  PlusSquareOutlined,
  ContactsOutlined,
  VideoCameraOutlined,
  PictureOutlined,
} from '@ant-design/icons';

import {
  corsTarget,
  stringIsNullOrWhiteSpace,
} from 'antd-management-fast-framework/lib/utils/tools';
import { formContentConfig } from 'antd-management-fast-framework/lib/utils/constants';
import { accessWayCollection } from '@/customConfig/config';

import BaseAddDrawer from 'antd-management-fast-framework/lib/framework/DataDrawer/BaseAddDrawer';

import { mediaItemData } from '../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class Index extends BaseAddDrawer {
  componentAuthority = accessWayCollection.article.addMediaItem;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        dataLoading: false,
        loadDataAfterMount: false,
        pageName: '新增媒体',
        submitApiPath: 'article/addMediaItem',
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

  executeAfterDoOtherWhenChangeVisible = () => {
    this.setState({
      image: '',
      video: '',
    });
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

    const { articleId, forwardId } = {
      ...{
        articleId: '',
        forwardId: '',
      },
      ...(externalData || {}),
    };

    if (!stringIsNullOrWhiteSpace(articleId)) {
      d.articleId = articleId;
    }

    if (!stringIsNullOrWhiteSpace(forwardId)) {
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

  renderTitleIcon = () => <PlusSquareOutlined />;

  renderTitle = () => {
    return '添加媒体项';
  };

  formContentConfigData = () => {
    const { processing, image, video } = this.state;

    return {
      list: [
        {
          title: {
            icon: <ContactsOutlined />,
            text: mediaItemData.title.label,
          },
          spinning: processing,
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
          spinning: processing,
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
          spinning: processing,
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
          spinning: processing,
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
              lg: 24,
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
          spinning: processing,
          items: [
            {
              type: formContentConfig.contentItemType.nowTime,
            },
          ],
        },
      ],
    };
  };
}

export default Index;
