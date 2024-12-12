import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  formatCollection,
  getValueByKey,
  toString,
  whetherNumber,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { singleTreeListAction } from '../../Assist/action';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class Index extends TabPageBase {
  reloadHeaderOnSubmitSuccess = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'section/get',
      submitApiPath: 'section/updateBasicInfo',
      sectionId: null,
      image: '',
      rectangleImage: '',
      video: '',
      audio: '',
      attachment: '',
      parentId: '0',
      sectionTreeData: [],
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  doOtherRemoteRequest = () => {
    this.loadSectionTreeList();
  };

  loadSectionTreeList = () => {
    singleTreeListAction({
      target: this,
      handleData: {
        replenishEmptyOption: whetherNumber.yes,
      },
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          sectionTreeData: remoteListData,
        });
      },
    });
  };

  reloadSectionTreeList = () => {
    this.loadSectionTreeList();
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
    const image = getValueByKey({
      data: metaData,
      key: fieldData.image.name,
    });

    const rectangleImage = getValueByKey({
      data: metaData,
      key: fieldData.rectangleImage.name,
    });

    const video = getValueByKey({
      data: metaData,
      key: fieldData.video.name,
    });

    const audio = getValueByKey({
      data: metaData,
      key: fieldData.audio.name,
    });

    const attachment = getValueByKey({
      data: metaData,
      key: fieldData.attachment.name,
    });

    const parentId = getValueByKey({
      data: metaData,
      key: fieldData.parentId.name,
      convert: convertCollection.string,
    });

    this.setState({
      image,
      rectangleImage,
      video,
      audio,
      attachment,
      parentId,
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const {
      sectionId,
      image,
      rectangleImage,
      video,
      audio,
      attachment,
      parentId,
    } = this.state;

    d.sectionId = sectionId;
    d.image = image;
    d.rectangleImage = rectangleImage;
    d.video = video;
    d.audio = audio;
    d.attachment = attachment;
    d.parentId = parentId;

    return d;
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image });
  };

  afterRectangleImageUploadSuccess = (image) => {
    this.setState({ rectangleImage: image });
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
      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      });

      values[fieldData.sort.name] = getValueByKey({
        data: metaData,
        key: fieldData.sort.name,
        convert: convertCollection.number,
      });

      values[fieldData.keyword.name] = getValueByKey({
        data: metaData,
        key: fieldData.keyword.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const {
      metaData,
      image,
      rectangleImage,
      video,
      audio,
      attachment,
      sectionTreeData,
      parentId,
    } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
              {
                buildType: cardConfig.extraBuildType.save,
                hidden: !checkHasAuthority(
                  accessWayCollection.section.updateBasicInfo.permission,
                ),
              },
            ],
          },
          items: [
            {
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.name,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.treeSelect,
              fieldData: fieldData.parentId,
              value: parentId,
              require: true,
              listData: sectionTreeData,
              addonAfter: buildButton({
                text: '',
                icon: iconBuilder.reload(),
                handleClick: () => {
                  this.reloadSectionTreeList();
                },
              }),
              dataConvert: (o) => {
                const { name: title, code: value } = o;

                return {
                  title,
                  value,
                };
              },
              onChange: ({ value }) => {
                this.setState({
                  parentId: toString(value),
                });
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
              require: false,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '配图上传',
            subText: '[上传后需点击保存按钮保存!]',
          },
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.imageUpload,
              icon: iconBuilder.upload(),
              title: fieldData.image.label,
              helper: fieldData.image.helper,
              image,
              action: `/section/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.imageUpload,
              icon: iconBuilder.upload(),
              title: fieldData.rectangleImage.label,
              helper: fieldData.rectangleImage.helper,
              image: rectangleImage,
              action: `/section/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterRectangleImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '关键词与描述信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.keyword,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
            },
          ],
        },
        {
          title: {
            text: '媒体、附件信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.videoUpload,
              fieldData: fieldData.video,
              video: video,
              showPreview: true,
              action: `/section/uploadVideo`,
              afterChangeSuccess: (videoData) => {
                this.afterVideoChangeSuccess(videoData);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.audioUpload,
              fieldData: fieldData.audio,
              audio: audio,
              showPreview: true,
              action: `/section/uploadAudio`,
              afterChangeSuccess: (audioData) => {
                this.afterAudioChangeSuccess(audioData);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.fileUpload,
              fieldData: fieldData.attachment,
              file: attachment,
              action: `/section/uploadFile`,
              afterChangeSuccess: (fileData) => {
                this.afterAttachmentChangeSuccess(fileData);
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '其他信息',
          },
          items: [
            {
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.createTime,
              value: getValueByKey({
                data: metaData,
                key: fieldData.createTime.name,
                format: formatCollection.datetime,
              }),
            },
            {
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.updateTime,
              value: getValueByKey({
                data: metaData,
                key: fieldData.updateTime.name,
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
