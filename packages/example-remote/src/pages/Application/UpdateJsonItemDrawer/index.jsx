import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  toNumber,
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
import { renderFormJsonItemTypeSelect } from '../../../customSpecialComponents';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = '64d04c95cccf4bc19fe586e94d15bfe2';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class UpdateJsonItemDrawer extends BaseUpdateDrawer {
  componentAuthority =
    accessWayCollection.application.getCustomGlobalDataItem.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '修改项',
      loadApiPath: 'application/getCustomGlobalDataItem',
      submitApiPath: 'application/updateCustomGlobalDataItem',
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
      ...this.supplementRequestParams({
        text: '',
        multiText: '',
        link: '',
        ...o,
      }),
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

    const { applicationId, id } = {
      applicationId: '',
      id: '',
      ...externalData,
    };

    if (!checkStringIsNullOrWhiteSpace(applicationId)) {
      d.applicationId = applicationId;
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
      convert: convertCollection.number,
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
      type,
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

  onTypeChange = (v) => {
    this.setState({ type: toNumber(v) });
  };

  renderPresetTitleIcon = () => null;

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

      values[keyValueItemData.type.name] = getValueByKey({
        data: metaData,
        key: keyValueItemData.type.name,
        convert: convertCollection.string,
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
    const { type, image, video, audio, attachment } = this.state;

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
              type: cardConfig.contentItemType.component,
              component: renderFormJsonItemTypeSelect({
                helper: keyValueItemData.type.helper,
                onChange: (event) => {
                  this.onTypeChange(event);
                },
              }),
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: keyValueItemData.title,
              require: true,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.form(),
            text: '设置文本',
          },
          hidden: !checkInCollection([keyValueTypeCollection.text], type),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: keyValueItemData.text,
              require: false,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.form(),
            text: '设置长文本',
          },
          hidden: !checkInCollection([keyValueTypeCollection.multiText], type),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: keyValueItemData.multiText,
              require: false,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.form(),
            text: '设置链接',
          },
          hidden: !checkInCollection([keyValueTypeCollection.link], type),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: keyValueItemData.link,
              require: false,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: keyValueItemData.image.label,
            subText: '[上传后需点击保存按钮保存]',
          },
          hidden: !checkInCollection(
            [keyValueTypeCollection.image, keyValueTypeCollection.video],
            type,
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
              action: `/application/uploadImage`,
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
              action: `/application/uploadVideo`,
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
              action: `/application/uploadAudio`,
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
              action: `/application/uploadFile`,
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

export { UpdateJsonItemDrawer };
