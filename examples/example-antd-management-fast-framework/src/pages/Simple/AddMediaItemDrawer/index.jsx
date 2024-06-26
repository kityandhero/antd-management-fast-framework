import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  toNumber,
} from 'easy-soft-utility';

import { cardConfig, getCorsDomain } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { mediaItemData } from '../../../businessData/data';
import {
  accessWayCollection,
  mediaTypeCollection,
} from '../../../customConfig';
import { renderFormMediaTypeSelect } from '../../../customSpecialComponents';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = '7e84caa4d70d4f039b06eb5f0a84839e';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class Index extends BaseAddDrawer {
  componentAuthority = accessWayCollection.simple.addMediaItem.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,

      dataLoading: false,
      loadRemoteRequestAfterMount: false,
      pageTitle: '新增媒体',
      submitApiPath: 'simple/addMediaItem',
      mediaType: mediaTypeCollection.paragraph,
      image: '',
      video: '',
      audio: '',
      attachment: '',
    };
  }

  executeOtherAfterDoOtherWhenChangeVisible = (
    // eslint-disable-next-line no-unused-vars
    preProperties,
    // eslint-disable-next-line no-unused-vars
    preState,
    // eslint-disable-next-line no-unused-vars
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
      ...this.supplementRequestParams(o),

      image,
      video,
      audio,
      attachment,
    };
  };

  supplementRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    const { simpleId, forwardId } = {
      simpleId: '',
      forwardId: '',
      ...externalData,
    };

    if (!checkStringIsNullOrWhiteSpace(simpleId)) {
      d.simpleId = simpleId;
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

  renderPresetTitleIcon = () => iconBuilder.plusSquare();

  renderPresetTitle = () => {
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
              type: cardConfig.contentItemType.component,
              component: renderFormMediaTypeSelect({
                onChange: (event) => {
                  this.onTypeChange(event);
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
              type: cardConfig.contentItemType.nowTime,
            },
          ],
        },
      ],
    };
  };
}

export default Index;
