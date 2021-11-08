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
} from 'antd-management-fast-framework/es/utils/tools';
import { cardConfig } from 'antd-management-fast-framework/es/utils/constants';
import { accessWayCollection } from '@/customConfig/config';

import BaseAddDrawer from 'antd-management-fast-framework/es/framework/DataDrawer/BaseAddDrawer';

import { mediaItemData } from '../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class Index extends BaseAddDrawer {
  componentAuthority = accessWayCollection.article.addMediaItem.permission;

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

  executeOtherAfterDoOtherWhenChangeVisible = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    preProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    preState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    snapshot,
  ) => {
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

  establishCardCollectionConfig = () => {
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
          spinning: processing,
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
          spinning: processing,
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
          spinning: processing,
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
            text: '其他信息',
          },
          spinning: processing,
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

export default Index;
