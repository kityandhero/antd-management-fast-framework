import { Space } from 'antd';

import { connect } from 'easy-soft-dva';
import { showSimpleInfoMessage } from 'easy-soft-utility';

import {
  cardConfig,
  getCorsDomain,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import {
  buildButton,
  FadeBox,
  iconBuilder,
  IconInfo,
  QueueBox,
  QueueListBox,
} from 'antd-management-fast-component';
import { DataForm } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig/config';
import { parseUrlParametersForSetState as parseUrlParametersForSetState } from '../Assist/config';
import { fieldData } from '../Common/data';

const { BaseAddForm } = DataForm;

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class Add extends BaseAddForm {
  /**
   * 在控制台显示组建内调用序列, 仅为进行开发辅助
   */
  showCallProcess = true;

  componentAuthority = accessWayCollection.simple.addBasicInfo.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      dataLoading: false,
      pageTitle: '发布文章',
      submitApiPath: 'simple/addBasicInfo',
      image: '',
      fadeBoxShow: true,
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

  afterImageUploadSuccess = (image) => {
    this.setState({ image });
  };

  doAfterSubmitSuccess = ({
    singleData = null,
    // eslint-disable-next-line no-unused-vars
    listData = [],
    // eslint-disable-next-line no-unused-vars
    extraData = null,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line no-unused-vars
    submitData = null,
  }) => {
    const { simpleId } = singleData;

    this.goToPath(`/simple/edit/load/${simpleId}/1/basicInfo`);
  };

  toggleFadeBoxShow = () => {
    const { fadeBoxShow } = this.state;

    this.setState({
      fadeBoxShow: !fadeBoxShow,
    });
  };

  establishExtraActionGroupConfig = () => {
    const that = this;

    return {
      buttons: [
        {
          key: 'goToPageList',
          text: '返回商品列表',
          icon: iconBuilder.unorderedList(),
          handleButtonClick: ({ handleData }) => {
            that.goToPageList(handleData);
          },
          hidden: false,
        },
      ],
    };
  };

  goToPageList = () => {
    this.goToPath(`/simple/pageList/key`);
  };

  establishToolBarConfig = () => {
    return {
      stick: false,
      title: '工具栏',
      tools: [
        {
          title: '按钮提示1',
          component: buildButton({
            text: '按钮1',
            handleClick: () => {
              showSimpleInfoMessage('click button 1');
            },
            disabled: false,
          }),
        },
        {
          title: '按钮提示2',
          hidden: false,
          component: buildButton({
            title: '按钮2的提示',
            text: '按钮2',
            handleClick: () => {
              showSimpleInfoMessage('click button 2');
            },
          }),
        },
        {
          title: '按钮提示2',
          hidden: false,
          component: buildButton({
            text: '加载中',
            disabled: true,
            processing: true,
          }),
        },
        {
          title: '按钮提示3',
          hidden: false,
          component: buildButton({
            text: '按钮3',
            handleClick: () => {
              showSimpleInfoMessage('click button 3');
            },
            confirm: true,
            placement: 'topRight',
            title: '将要进行操作，确定吗？',
            okText: '确定',
            cancelText: '取消',
          }),
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '简要说明:这里可以显示需要提示的信息。',
        },
        {
          text: '简要说明:这里可以显示需要提示的信息。',
        },
      ],
    };
  };

  fillDefaultInitialValues = () => {
    const v = {};

    v[fieldData.title.name] = '标题1';
    v[fieldData.sort.name] = 0;
    v[fieldData.subtitle.name] = '';

    return v;
  };

  establishCardCollectionConfig = () => {
    const { fadeBoxShow, image, rectangleImage, video, audio, attachment } =
      this.state;

    return {
      list: [
        {
          title: {
            text: '基本信息',
          },
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.generalButton,
                icon: iconBuilder.form(),
                text: '切换FadeBox显示',
                handleClick: () => {
                  this.toggleFadeBoxShow();
                },
              },
              {
                buildType: cardConfig.extraBuildType.save,
                text: '保存并进行下一步',
              },
            ],
          },
          items: [
            {
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.author,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.placeholder,
            },
            {
              lg: 18,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.subtitle,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.sort,
            },
          ],
          instruction: {
            title: '局部操作说明',
            showDivider: false,
            showNumber: true,
            list: [
              {
                text: '这是一些操作说明1',
                contentStyle: {
                  color: '#1e94ff',
                },
              },
              {
                text: '这是一些操作说明2',
              },
            ],
          },
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '配图',
            subText: '[上传后需点击保存按钮保存！]',
          },
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.imageUpload,
              icon: iconBuilder.picture(),
              title: fieldData.image.label,
              helper: fieldData.image.helper,
              image,
              action: `${getCorsDomain()}/simple/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.imageUpload,
              icon: iconBuilder.picture(),
              title: fieldData.rectangleImage.label,
              helper: fieldData.rectangleImage.helper,
              image: rectangleImage,
              action: `${getCorsDomain()}/simple/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterRectangleImageUploadSuccess(imageData);
              },
            },
          ],
          instruction: [
            {
              title: '局部操作说明1',
              showDivider: false,
              showNumber: true,
              hidden: true,
              list: [
                {
                  text: '这里是操作说明。',
                },
                {
                  text: '这里是操作说明。',
                },
                {
                  text: '这里是操作说明。',
                },
              ],
            },
            {
              title: '局部操作说明2',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '这里是操作说明。',
                },
                {
                  text: '这里是操作说明。',
                },
                {
                  text: '这里是操作说明。',
                },
              ],
            },
          ],
        },
        {
          title: {
            text: '媒体、简介描述',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
              require: false,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.videoUpload,
              fieldData: fieldData.video,
              video: video,
              showPreview: true,
              action: `${getCorsDomain()}/simple/uploadVideo`,
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
              action: `${getCorsDomain()}/simple/uploadAudio`,
              afterChangeSuccess: (audioData) => {
                this.afterAudioChangeSuccess(audioData);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.fileUpload,
              fieldData: fieldData.attachment,
              file: attachment,
              action: `${getCorsDomain()}/simple/uploadFile`,
              afterChangeSuccess: (fileData) => {
                this.afterAttachmentChangeSuccess(fileData);
              },
            },
          ],
        },
        {
          title: {
            text: '动画展示',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <>
                  <FadeBox visible={fadeBoxShow}>
                    <div>
                      <Space>
                        <IconInfo icon={iconBuilder.form()} text="文字1" />
                        <IconInfo icon={iconBuilder.form()} text="文字2" />
                        <IconInfo icon={iconBuilder.form()} text="文字3" />
                      </Space>
                    </div>
                  </FadeBox>

                  <QueueBox show={fadeBoxShow}>
                    <IconInfo icon={iconBuilder.form()} text="QueueBox" />
                  </QueueBox>

                  <QueueListBox
                    show={fadeBoxShow}
                    style={{
                      marginTop: '20px',
                    }}
                    itemStyle={{
                      marginBottom: '2px',
                    }}
                    items={[
                      {
                        hidden: true,
                        builder: () => {
                          return (
                            <IconInfo
                              icon={iconBuilder.form()}
                              text="QueueListBoxItem 1"
                            />
                          );
                        },
                      },
                      {
                        hidden: false,
                        builder: () => {
                          return (
                            <IconInfo
                              icon={iconBuilder.form()}
                              text="QueueListBoxItem 2"
                            />
                          );
                        },
                      },
                      {
                        hidden: true,
                        builder: () => {
                          return (
                            <IconInfo
                              icon={iconBuilder.form()}
                              text="QueueListBoxItem 3"
                            />
                          );
                        },
                      },
                      {
                        hidden: false,
                        builder: () => {
                          return (
                            <IconInfo
                              icon={iconBuilder.form()}
                              text="QueueListBoxItem 4"
                            />
                          );
                        },
                      },
                    ]}
                  />
                </>
              ),
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

export default Add;
