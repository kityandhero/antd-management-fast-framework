import { connect } from 'umi';

import {
  cardConfig,
  checkInCollection,
  corsTarget,
  toNumber,
  toString,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import BaseAddDrawer from 'antd-management-fast-framework/es/framework/DataDrawer/BaseAddDrawer';

import { accessWayCollection } from '@/customConfig/config';
import { mediaTypeCollection } from '@/customConfig/constants';
import { renderFormMediaTypeSelect } from '@/customSpecialComponents/FunctionSupplement/MediaType';

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
        mediaType: mediaTypeCollection.paragraph,
        image: '',
        video: '',
        audio: '',
        attachment: '',
      },
    };
  }

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
      audio: '',
      attachment: '',
    });
  };

  supplementSubmitRequestParams = (o) => {
    const { image, video, audio, attachment } = this.state;

    return {
      ...(this.supplementRequestParams(o) || {}),
      ...{
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

    const { articleId, forwardId } = {
      ...{
        articleId: '',
        forwardId: '',
      },
      ...(externalData || {}),
    };

    if (!checkStringIsNullOrWhiteSpace(articleId)) {
      d.articleId = articleId;
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
    this.setState({ mediaType: toNumber(v) });
  };

  renderTitleIcon = () => iconBuilder.plusSquare();

  renderTitle = () => {
    return '添加媒体项';
  };

  fillDefaultInitialValues = () => {
    const values = {};

    values[mediaItemData.mediaType.name] = toString(
      mediaTypeCollection.paragraph,
    );

    return values;
  };

  establishCardCollectionConfig = () => {
    const { mediaType, image, video, audio, attachment } = this.state;

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
              type: cardConfig.contentItemType.component,
              component: renderFormMediaTypeSelect({
                metaData: this.getMetaData(),
                onChangeCallback: (e) => {
                  this.onTypeChange(e);
                },
              }),
              require: true,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: mediaItemData.image.label,
            subText: '[上传后需点击保存按钮保存]',
          },
          spinning,
          hidden: !checkInCollection(
            [mediaTypeCollection.image, mediaTypeCollection.video],
            mediaType,
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
          hidden: !checkInCollection(
            [mediaTypeCollection.paragraph],
            mediaType,
          ),
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
          hidden: !checkInCollection([mediaTypeCollection.link], mediaType),
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
          spinning,
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
              type: cardConfig.contentItemType.nowTime,
            },
          ],
        },
      ],
    };
  };
}

export default Index;
