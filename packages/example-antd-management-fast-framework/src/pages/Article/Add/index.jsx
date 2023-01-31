import { Space } from 'antd';
import { connect } from 'umi';

import {
  cardConfig,
  corsTarget,
  getDerivedStateFromPropsForUrlParams,
  showInfoMessage,
} from 'antd-management-fast-common';
import QueueListBox, {
  FadeBox,
  iconBuilder,
  IconInfo,
  QueueBox,
} from 'antd-management-fast-component';
import BaseAddForm from 'antd-management-fast-framework/es/framework/DataForm/BaseAddForm';

import { accessWayCollection } from '@/customConfig/config';

import { parseUrlParamsForSetState } from '../Assist/config';
import { fieldData } from '../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class Index extends BaseAddForm {
  componentAuthority = accessWayCollection.article.addBasicInfo.permission;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        dataLoading: false,
        pageName: '发布文章',
        submitApiPath: 'article/addBasicInfo',
        image: '',
        fadeBoxShow: true,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  afterImageUploadSuccess = (image) => {
    this.setState({ image });
  };

  doAfterSubmitSuccess = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    singleData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extraData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submitData = null,
  }) => {
    const { articleId } = singleData;

    this.goToPath(`/news/article/edit/load/${articleId}/1/basicInfo`);
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
    this.goToPath(`/news/article/pageList/key`);
  };

  establishToolBarConfig = () => {
    return {
      stick: false,
      title: '工具栏',
      tools: [
        {
          title: '按钮提示1',
          component: this.renderGeneralButton({
            text: '按钮1',
            handleClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
            disabled: false,
          }),
        },
        {
          title: '按钮提示2',
          hidden: false,
          component: this.renderGeneralButton({
            text: '按钮2',
            handleClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
          }),
        },
        {
          title: '按钮提示2',
          hidden: false,
          component: this.renderGeneralButton({
            text: '按钮2',
            handleClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
            processing: true,
          }),
        },
        {
          title: '按钮提示4',
          hidden: false,
          component: this.renderGeneralButton({
            text: '按钮4',
            handleClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
            confirm: {
              placement: 'topRight',
              title: '将要进行操作，确定吗？',
              okText: '确定',
              cancelText: '取消',
            },
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
          text: '简要说明：这里可以显示需要提示的信息。',
        },
        {
          text: '简要说明：这里可以显示需要提示的信息。',
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

    const spinning = this.checkInProgress();

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
          spinning,
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
          spinning,
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.imageUpload,
              icon: iconBuilder.picture(),
              title: fieldData.image.label,
              helper: fieldData.image.helper,
              image,
              action: `${corsTarget()}/article/uploadImage`,
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
              action: `${corsTarget()}/article/uploadImage`,
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
          spinning,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.videoUpload,
              fieldData: fieldData.video,
              video: video,
              showPreview: true,
              action: `${corsTarget()}/article/uploadVideo`,
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
              action: `${corsTarget()}/article/uploadAudio`,
              afterChangeSuccess: (audioData) => {
                this.afterAudioChangeSuccess(audioData);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.fileUpload,
              fieldData: fieldData.attachment,
              file: attachment,
              action: `${corsTarget()}/article/uploadFile`,
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
          spinning,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <>
                  <FadeBox show={fadeBoxShow}>
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

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '简要说明：这里可以显示需要提示的信息。',
        },
        {
          text: '简要说明：这里可以显示需要提示的信息。',
        },
      ],
    };
  };
}

export default Index;
