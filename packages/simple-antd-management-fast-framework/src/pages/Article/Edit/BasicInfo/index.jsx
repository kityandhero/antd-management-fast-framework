import React from 'react';
import { connect } from 'umi';
import {
  PictureOutlined,
  InfoCircleFilled,
  FormOutlined,
  SortAscendingOutlined,
} from '@ant-design/icons';

import {
  formatDatetime,
  corsTarget,
  getDerivedStateFromPropsForUrlParams,
  toDatetime,
  getValueByKey,
  showInfoMessage,
} from 'antd-management-fast-framework/es/utils/tools';
import {
  getTokenKeyName,
  getToken,
} from 'antd-management-fast-framework/es/utils/globalStorageAssist';
import { pretreatmentRemoteSingleData } from 'antd-management-fast-framework/es/utils/requestAssistor';
import {
  cardConfig,
  datetimeFormat,
  convertCollection,
  formatCollection,
} from 'antd-management-fast-framework/es/utils/constants';
import ColorText from 'antd-management-fast-framework/es/customComponents/ColorText';
import {
  buildColorText,
  buildCustomGrid,
} from 'antd-management-fast-framework/es/customComponents/FunctionComponent';

import { accessWayCollection } from '@/customConfig/config';
import { renderCustomArticleStatusSelect } from '@/customSpecialComponents/FunctionSupplement/ArticleStatus';

import TabPageBase from '../../TabPageBase';
import ChangeImageSortModal from '../../ChangeImageSortModal';
import { addGalleryImageAction, removeGalleryImageConfirmAction } from '../../Assist/action';
import { parseUrlParamsForSetState } from '../../Assist/config';
import { fieldData as fieldDataArticleImage } from '../../../ArticleImage/Common/data';
import { fieldData } from '../../Common/data';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.article.get.permission;

  constructor(props) {
    super(props);

    const tokenSetObject = {};

    tokenSetObject[`${getTokenKeyName()}`] = getToken() || '';

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'article/get',
        submitApiPath: 'article/updateBasicInfo',
        tokenSet: tokenSetObject,
        changeImageSortModalVisible: false,
        articleId: null,
        fileBase64: '',
        image: '',
        imageList: [],
        fileList: [],
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

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { articleId, image } = this.state;

    d.articleId = articleId;
    d.image = image;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = ({ metaData, metaListData, metaExtra, metaOriginalData }) => {
    const { image, imageList, imageFileList, videoUrl, fileBase64 } = metaData;

    const fileList = [];

    (imageFileList || []).forEach((item) => {
      const o = {
        uid: item.id,
        name: '',
        status: 'done',
        url: item.url,
      };

      o[fieldDataArticleImage.articleImageId.name] = item.id;

      fileList.push(o);
    });

    this.setState({
      image,
      imageList,
      fileList,
      videoUrl,
      fileBase64,
    });
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image });
  };

  afterVideoChangeSuccess = (video) => {
    this.setState({ videoUrl: video });
  };

  afterFileUploadSuccess = (file) => {
    this.setState({ fileBase64: file });
  };

  handleGalleryUploadChange = ({ file, fileList }) => {
    this.setState({ fileList: [...fileList] });

    if (file.status === 'done') {
      const { response } = file;

      const v = pretreatmentRemoteSingleData(response);

      const { dataSuccess } = v;

      if (dataSuccess) {
        const {
          data: { imageUrl },
        } = v;

        this.addGalleryImage({ file, fileList, imageUrl });
      }
    }
  };

  addGalleryImage = ({ file, fileList, imageUrl }) => {
    const { metaData } = this.state;

    addGalleryImageAction({
      target: this,
      handleData: { ...(metaData || {}), ...{ url: imageUrl } },
      successCallback: ({ target, remoteData }) => {
        (fileList || []).forEach((item) => {
          if (item.uid === file.uid) {
            item[fieldDataArticleImage.articleImageId.name] = getValueByKey({
              data: remoteData,
              key: fieldDataArticleImage.articleImageId.name,
            });
          }
        });

        target.setState({ fileList: [...fileList] });
      },
    });
  };

  onGalleryRemove = (file) => {
    const articleImageId = getValueByKey({
      data: file,
      key: fieldDataArticleImage.articleImageId.name,
    });

    removeGalleryImageConfirmAction({
      target: this,
      handleData: { articleImageId },
      successCallback: ({ target }) => {
        const { fileList } = this.state;

        const list = [];

        (fileList || []).forEach((item) => {
          const itemProductImageId = getValueByKey({
            data: item,
            key: fieldDataArticleImage.articleImageId.name,
          });

          if (itemProductImageId !== articleImageId) {
            list.push(item);
          }
        });

        target.setState({ fileList: [...list] });
      },
    });

    return false;
  };

  showChangeImageSortModal = () => {
    this.setState({ changeImageSortModalVisible: true });
  };

  afterChangeImageSortModalOk = () => {
    this.setState({
      changeImageSortModalVisible: false,
    });

    this.reloadData();
  };

  afterChangeImageSortModalCancel = () => {
    this.setState({
      changeImageSortModalVisible: false,
    });
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
      values[fieldData.title.name] = getValueByKey({
        data: metaData,
        key: fieldData.title.name,
      });

      values[fieldData.subtitle.name] = getValueByKey({
        data: metaData,
        key: fieldData.subtitle.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData, processing, dataLoading, image, videoUrl, fileBase64, imageList, fileList } =
      this.state;

    return {
      list: [
        {
          title: {
            text: '基本信息',
            subText: buildColorText({
              textPrefix: '文本前缀',
              text: '附属文本',
              color: '#8909ef',
              wrapperBuilder: (c) => {
                return <>【{c}】</>;
              },
            }),
          },
          extra: {
            affix: true,
            split: false,
            list: [
              {
                buildType: cardConfig.extraBuildType.iconInfo,
                icon: <InfoCircleFilled />,
                text: '一些说明',
              },
              {
                buildType: cardConfig.extraBuildType.component,
                component: renderCustomArticleStatusSelect({
                  global: this.getGlobal(),
                }),
              },
              {
                buildType: cardConfig.extraBuildType.generalButton,
                icon: <FormOutlined />,
                text: '一般按钮',
              },
              {
                buildType: cardConfig.extraBuildType.generalButton,
                hidden: true,
                icon: <FormOutlined />,
                text: '隐藏按钮',
              },
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
              {
                buildType: cardConfig.extraBuildType.save,
              },
            ],
          },
          spinning: this.checkInProgress(),
          items: [
            {
              lg: 18,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.articleId,
              value: getValueByKey({
                data: metaData,
                key: fieldData.articleId.name,
              }),
              canCopy: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '分隔线',
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.subtitle,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
            },
            {
              lg: 18,
              type: cardConfig.contentItemType.videoUpload,
              fieldData: fieldData.videoUrl,
              video: videoUrl,
              showPreview: true,
              action: `${corsTarget()}/article/uploadVideo`,
              afterChangeSuccess: (videoData) => {
                this.afterVideoChangeSuccess(videoData);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.fileBase64Upload,
              fieldData: fieldData.fileBase64,
              fileBase64,
              action: `${corsTarget()}/application/uploadFile`,
              afterUploadSuccess: (file) => {
                this.afterFileUploadSuccess(file);
              },
            },
          ],
          instruction: {
            title: '局部操作说明',
            showDivider: false,
            showNumber: true,
            list: [
              {
                text: '这是一些操作说明1',
              },
              {
                text: '这是一些操作说明2',
              },
            ],
          },
        },
        {
          title: {
            icon: <PictureOutlined />,
            text: '配图上传',
            subText: '[上传后需点击保存按钮保存！]',
          },
          spinning: this.checkInProgress(),
          items: [
            {
              type: cardConfig.contentItemType.imageUpload,
              image,
              action: `${corsTarget()}/article/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            icon: <PictureOutlined />,
            text: '单配图纯展示',
            subText: '[上传后需点击保存按钮保存！]',
          },
          spinning: this.checkInProgress(),
          items: [
            {
              type: cardConfig.contentItemType.imageShow,
              image,
              imageBoxContainorStyle: {
                width: '120px',
              },
            },
          ],
        },
        {
          title: {
            text: '图片相册',
            subText:
              '[相册最大容量为8张图片，大小必须统一640*640（800*800），图片相册的添加和删除将自动保存，产品其他信息请在修改后点击保存按钮!]',
          },
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.generalButton,
                hidden: !this.checkAuthority(
                  accessWayCollection.article.updateImageSort.permission,
                ),
                text: '调整图片顺序',
                icon: <SortAscendingOutlined />,
                handleClick: (e) => this.showChangeImageSortModal(e),
                disabled: this.checkInProgress(),
              },
            ],
          },
          spinning: this.checkInProgress(),
          items: [
            {
              type: cardConfig.contentItemType.imageUpload,
              action: `${corsTarget()}/article/uploadImage`,
              disabled: !this.checkAuthority(accessWayCollection.article.addImage.permission),
              multiple: true,
              fileList,
              showUploadList: {
                showPreviewIcon: true,
                showDownloadIcon: true,
                showRemoveIcon: this.checkAuthority(
                  accessWayCollection.article.removeImage.permission,
                ),
              },
              onItemChange: this.handleGalleryUploadChange,
              onItemRemove: this.onGalleryRemove,
              // showUploadList: true,
            },
          ],
        },
        {
          title: {
            text: '表格展示',
          },
          spinning: this.checkInProgress(),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: buildCustomGrid({
                list: [
                  {
                    label: fieldData.articleId.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.articleId.name,
                    }),
                    canCopy: true,
                  },
                  {
                    label: fieldData.title.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.title.name,
                    }),
                  },
                  {
                    label: fieldData.sort.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.sort.name,
                      convert: convertCollection.string,
                    }),
                  },
                  {
                    label: fieldData.subtitle.label,
                    value: '',
                    emptyValue: '空白值演示',
                  },
                  {
                    span: 2,
                    label: fieldData.description.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.description.name,
                    }),
                  },
                ],
                props: {
                  bordered: true,
                  column: 3,
                  emptyStyle: {
                    color: '#cccccc',
                  },
                  emptyValue: '待完善',
                  labelStyle: {
                    width: '140px',
                  },
                },
              }),
            },
          ],
        },
        {
          title: {
            icon: <PictureOutlined />,
            text: '配图集合纯展示',
            subText: '[上传后需点击保存按钮保存！]',
          },
          spinning: this.checkInProgress(),
          items: [
            {
              type: cardConfig.contentItemType.imageListShow,
              imageList,
            },
          ],
        },
        {
          title: {
            text: '简介描述',
          },
          spinning: this.checkInProgress(),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
              require: true,
            },
          ],
          instruction: [
            {
              title: '局部操作说明1',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '这是一些操作说明1',
                },
                {
                  text: '这是一些操作说明2',
                },
              ],
            },
            {
              title: '局部操作说明2',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '这是一些操作说明1',
                },
                {
                  text: '这是一些操作说明2',
                },
              ],
            },
          ],
        },
        {
          title: {
            text: '其他信息',
          },
          spinning: this.checkInProgress(),
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
            {
              lg: 24,
              type: cardConfig.contentItemType.save,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.button,
              config: {
                text: '一般按钮',
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.actionList,
              config: [
                {
                  buildType: cardConfig.extraBuildType.refresh,
                },
                {
                  buildType: cardConfig.extraBuildType.save,
                },
                {
                  buildType: cardConfig.extraBuildType.generalButton,
                  text: '一般按钮',
                },
              ],
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

  renderOther = () => {
    const { metaData, changeImageSortModalVisible } = this.state;

    const l = getValueByKey({
      data: null,
      key: fieldData.imageList.name,
      convert: convertCollection.array,
    });

    console.log(l);

    return (
      <ChangeImageSortModal
        externalData={metaData}
        visible={changeImageSortModalVisible}
        afterOK={this.afterChangeImageSortModalOk}
        afterCancel={this.afterChangeImageSortModalCancel}
      />
    );
  };
}

export default BasicInfo;
