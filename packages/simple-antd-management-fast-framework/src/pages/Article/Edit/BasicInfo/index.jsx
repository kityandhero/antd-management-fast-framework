import moment from 'moment';
import { connect } from 'umi';

import {
  buildColorText,
  buildCustomGrid,
} from 'antd-management-fast-framework/es/customComponents/FunctionComponent';
import IconInfo from 'antd-management-fast-framework/es/customComponents/IconInfo';
import {
  cardConfig,
  convertCollection,
  datetimeFormat,
  formatCollection,
  iconCollection,
} from 'antd-management-fast-framework/es/utils/constants';
import {
  getToken,
  getTokenKeyName,
} from 'antd-management-fast-framework/es/utils/globalStorageAssist';
import { pretreatmentRemoteSingleData } from 'antd-management-fast-framework/es/utils/requestAssistor';
import {
  convertTarget,
  corsTarget,
  formatTarget,
  getValueByKey,
  showInfoMessage,
} from 'antd-management-fast-framework/es/utils/tools';

import { accessWayCollection } from '@/customConfig/config';
import { renderCustomArticleStatusSelect } from '@/customSpecialComponents/FunctionSupplement/ArticleStatus';

import { fieldData as fieldDataArticleImage } from '../../../ArticleImage/Common/data';
import {
  addGalleryImageAction,
  removeGalleryImageConfirmAction,
  singleListTreeAction,
} from '../../Assist/action';
import ChangeImageSortModal from '../../ChangeImageSortModal';
import { fieldData } from '../../Common/data';
import TabPageBase from '../../TabPageBase';

@connect(({ article, global, loading }) => ({
  article,
  global,
  loading: loading.models.article,
}))
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.article.get.permission;

  htmlContent = '';

  textContent = '';

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
        attachmentBase64: '',
        image: '',
        rectangleImage: '',
        video: '',
        audio: '',
        attachment: '',
        imageList: [],
        fileList: [],
        initContent: '',
        listTreeData: [],
        parentId: '1',
      },
    };
  }

  initOther = () => {
    singleListTreeAction({
      target: this,
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          listTreeData: remoteListData,
        });
      },
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const {
      articleId,
      image,
      rectangleImage,
      video,
      audio,
      attachment,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      content,
    } = this.state;

    d.articleId = articleId;
    d.image = image;
    d.rectangleImage = rectangleImage;
    d.video = video;
    d.audio = audio;
    d.attachment = attachment;
    d.content = this.htmlContent;

    return d;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = ({ metaData, metaListData, metaExtra, metaOriginalData }) => {
    const {
      image,
      rectangleImage,
      imageList,
      imageFileList,
      video,
      audio,
      attachment,
      attachmentBase64,
      content,
    } = metaData;

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

    this.htmlContent = content;

    this.setState({
      image,
      rectangleImage,
      imageList,
      fileList,
      video,
      audio,
      attachment,
      attachmentBase64,
      initContent: content,
    });
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

  afterFileBase64UploadSuccess = (base64) => {
    this.setState({ attachmentBase64: base64 });
  };

  afterFileUploadSuccess = (file) => {
    this.setState({ attachment: file });
  };

  afterAttachmentChangeSuccess = (attachment) => {
    this.setState({ attachment });
  };

  afterHtmlChange = ({ html, text }) => {
    this.htmlContent = html;
    this.textContent = text;
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
      title: '?????????',
      tools: [
        {
          title: '????????????1',
          component: this.renderGeneralButton({
            text: '??????1',
            handleClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
            disabled: false,
          }),
        },
        {
          title: '????????????2',
          hidden: false,
          component: this.renderGeneralButton({
            text: '??????2',
            handleClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
          }),
        },
        {
          title: '????????????2',
          hidden: false,
          component: this.renderGeneralButton({
            text: '??????2',
            handleClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
            processing: true,
          }),
        },
        {
          title: '????????????4',
          hidden: false,
          component: this.renderGeneralButton({
            text: '??????4',
            handleClick: () => {
              showInfoMessage({
                message: 'click button 4',
              });
            },
            confirm: {
              placement: 'topRight',
              title: '?????????????????????????????????',
              okText: '??????',
              cancelText: '??????',
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

      values[fieldData.timePicker.name] = getValueByKey({
        data: metaData,
        key: fieldData.timePicker.name,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        convertBuilder: (v) => {
          return moment('12:08', datetimeFormat.hourMinute);
        },
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
      attachmentBase64,
      imageList,
      fileList,
      initContent,
      listTreeData,
      parentId,
    } = this.state;

    const spinning = this.checkInProgress();

    return {
      list: [
        {
          title: {
            text: '????????????',
            subText: buildColorText({
              textPrefix: '????????????',
              text: '????????????',
              color: '#8909ef',
              wrapperBuilder: (c) => {
                return <>???{c}???</>;
              },
            }),
          },
          extra: {
            affix: true,
            split: false,
            list: [
              {
                buildType: cardConfig.extraBuildType.iconInfo,
                icon: iconCollection.infoCircle,
                text: '????????????',
              },
              {
                buildType: cardConfig.extraBuildType.component,
                component: renderCustomArticleStatusSelect({
                  global: this.getGlobal(),
                }),
              },
              {
                buildType: cardConfig.extraBuildType.generalButton,
                icon: iconCollection.form,
                text: '????????????',
              },
              {
                buildType: cardConfig.extraBuildType.generalButton,
                hidden: true,
                icon: iconCollection.form,
                text: '????????????',
              },
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
              {
                buildType: cardConfig.extraBuildType.save,
              },
            ],
          },
          spinning,
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
              lg: 6,
              type: cardConfig.contentItemType.datePicker,
              fieldData: fieldData.datePicker,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.timePicker,
              fieldData: fieldData.timePicker,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.select,
              fieldData: fieldData.select1,
              listData: [
                {
                  flag: '1',
                  name: '??????1',
                },
                {
                  flag: '2',
                  name: '??????2',
                },
                {
                  flag: '3',
                  name: '??????3',
                },
              ],
              otherProps: {
                onChange: (v) => {
                  console.log(v);
                },
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.treeSelect,
              fieldData: fieldData.parentId,
              value: parentId,
              require: true,
              listData: listTreeData,
              dataConvert: (o) => {
                const { label, code: value, children } = o;

                return {
                  title: label,
                  value,
                  children: children || [],
                };
              },
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onChangeCallback: ({ value, label, extra, treeData, listData }) => {
                console.log(treeData);

                this.setState({
                  parentId: value,
                });
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '?????????',
            },

            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: <IconInfo icon={iconCollection.edit} text="?????????" ellipsis={false} />,
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
              fieldData: fieldData.video,
              video,
              showPreview: true,
              action: `${corsTarget()}/article/uploadVideo`,
              afterChangeSuccess: (data) => {
                this.afterVideoChangeSuccess(data);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.audioUpload,
              fieldData: fieldData.audio,
              audio,
              showPreview: true,
              action: `${corsTarget()}/article/uploadAudio`,
              afterChangeSuccess: (data) => {
                this.afterAudioChangeSuccess(data);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.fileBase64Upload,
              fieldData: fieldData.fileBase64,
              fileBase64: attachmentBase64,
              action: `${corsTarget()}/application/uploadFileBase64`,
              afterUploadSuccess: (data) => {
                this.afterFileBase64UploadSuccess(data);
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.fileUpload,
              fieldData: fieldData.file,
              file: attachment,
              action: `${corsTarget()}/application/uploadFile`,
              afterUploadSuccess: (data) => {
                this.afterFileUploadSuccess(data);
              },
            },
          ],
          instruction: {
            title: '??????????????????',
            showDivider: false,
            showNumber: true,
            list: [
              {
                text: '????????????????????????1',
              },
              {
                text: '????????????????????????2',
              },
            ],
          },
        },
        {
          title: {
            icon: iconCollection.picture,
            text: '????????????',
            subText: '[???????????????????????????????????????]',
          },
          spinning,
          items: [
            {
              lg: 12,
              type: cardConfig.contentItemType.imageUpload,
              icon: iconCollection.picture,
              title: fieldData.image.label,
              helper: fieldData.image.helper,
              image,
              action: `${corsTarget()}/article/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.imageUpload,
              icon: iconCollection.picture,
              title: fieldData.rectangleImage.label,
              helper: fieldData.rectangleImage.helper,
              image: rectangleImage,
              action: `${corsTarget()}/article/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterRectangleImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            text: '????????????',
            subText:
              '[?????????????????????8??????????????????????????????640*640???800*800?????????????????????????????????????????????????????????????????????????????????????????????????????????!]',
          },
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.generalButton,
                hidden: !this.checkAuthority(
                  accessWayCollection.article.updateImageSort.permission,
                ),
                text: '??????????????????',
                icon: iconCollection.sortAscending,
                handleClick: (e) => this.showChangeImageSortModal(e),
                disabled: this.checkInProgress(),
              },
            ],
          },
          spinning,
          items: [
            {
              lg: 24,
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
            icon: iconCollection.picture,
            text: '??????????????????',
          },
          spinning,
          items: [
            {
              lg: 24,
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
            icon: iconCollection.picture,
            text: '?????????????????????',
          },
          spinning,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageListShow,
              imageList,
            },
          ],
        },
        {
          title: {
            text: '?????????????????????',
          },
          spinning,
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
                    span: 2,
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
                    emptyValue: '???????????????',
                  },
                  {
                    label: '???????????????',
                    value: formatTarget({
                      target: 0.24,
                      format: formatCollection.percentage,
                    }),
                  },
                  {
                    label: '????????????',
                    value: formatTarget({
                      target: 451.31,
                      format: formatCollection.chineseMoney,
                    }),
                  },
                  {
                    label: '???????????????',
                    value: formatTarget({
                      target: new Date(),
                      format: formatCollection.datetime,
                    }),
                  },
                  {
                    label: '???????????????',
                    value: formatTarget({
                      target: 451.31,
                      format: formatCollection.money,
                    }),
                  },
                  {
                    label: '????????????',
                    value: convertTarget({
                      target: 0.24,
                      convert: convertCollection.string,
                    }),
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
                  emptyValue: '?????????',
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
            text: '??????????????????',
          },
          spinning,
          items: [
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.title.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.title.name,
                  }),
                },
                {
                  label: fieldData.subtitle.label,
                  value: '',
                  emptyValue: '???????????????',
                },
                {
                  label: '???????????????',
                  value: formatTarget({
                    target: 0.24,
                    format: formatCollection.percentage,
                  }),
                },
                {
                  label: fieldData.articleId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.articleId.name,
                  }),
                  canCopy: true,
                },
                {
                  label: fieldData.sort.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.sort.name,
                    convert: convertCollection.string,
                  }),
                },
              ],
              props: {
                title: '????????????',
                bordered: true,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '?????????',
                labelStyle: {
                  width: '140px',
                },
              },
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: '????????????',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.chineseMoney,
                  }),
                },
                {
                  label: '???????????????',
                  value: formatTarget({
                    target: new Date(),
                    format: formatCollection.datetime,
                  }),
                },
                {
                  label: '???????????????',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.money,
                  }),
                },
                {
                  label: '????????????',
                  value: convertTarget({
                    target: 0.24,
                    convert: convertCollection.string,
                  }),
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
                title: '????????????',
                bordered: true,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '?????????',
                labelStyle: {
                  width: '100px',
                },
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.title.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.title.name,
                  }),
                },
                {
                  label: fieldData.subtitle.label,
                  value: '',
                  emptyValue: '???????????????',
                },
                {
                  label: '???????????????',
                  value: formatTarget({
                    target: 0.24,
                    format: formatCollection.percentage,
                  }),
                },
                {
                  label: fieldData.articleId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.articleId.name,
                  }),
                  canCopy: true,
                },
                {
                  label: fieldData.sort.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.sort.name,
                    convert: convertCollection.string,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: true,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '?????????',
                labelStyle: {
                  width: '100px',
                },
              },
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: '????????????',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.chineseMoney,
                  }),
                },
                {
                  label: '???????????????',
                  value: formatTarget({
                    target: new Date(),
                    format: formatCollection.datetime,
                  }),
                },
                {
                  label: '???????????????',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.money,
                  }),
                },
                {
                  label: '????????????',
                  value: convertTarget({
                    target: 0.24,
                    convert: convertCollection.string,
                  }),
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
                size: 'small',
                bordered: true,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '?????????',
                labelStyle: {
                  width: '100px',
                },
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.title.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.title.name,
                  }),
                },
                {
                  label: fieldData.subtitle.label,
                  value: '',
                  emptyValue: '???????????????',
                },
                {
                  label: '???????????????',
                  value: formatTarget({
                    target: 0.24,
                    format: formatCollection.percentage,
                  }),
                },
                {
                  label: fieldData.articleId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.articleId.name,
                  }),
                  canCopy: true,
                },
                {
                  label: fieldData.sort.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.sort.name,
                    convert: convertCollection.string,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: false,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '?????????',
                labelStyle: {
                  width: '100px',
                },
              },
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: '????????????',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.chineseMoney,
                  }),
                },
                {
                  label: '???????????????',
                  value: formatTarget({
                    target: new Date(),
                    format: formatCollection.datetime,
                  }),
                },
                {
                  label: '???????????????',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.money,
                  }),
                },
                {
                  label: '????????????',
                  value: convertTarget({
                    target: 0.24,
                    convert: convertCollection.string,
                  }),
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
                size: 'small',
                bordered: false,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '?????????',
                labelStyle: {
                  width: '100px',
                },
                ellipsis: false,
              },
            },
          ],
        },
        {
          title: {
            text: '????????????',
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
              afterChangeSuccess: (file) => {
                this.afterAttachmentChangeSuccess(file);
              },
            },
          ],
          instruction: [
            {
              title: '??????????????????1',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '????????????????????????1',
                },
                {
                  text: '????????????????????????2',
                },
              ],
            },
            {
              title: '??????????????????2',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '????????????????????????1',
                },
                {
                  text: '????????????????????????2',
                },
              ],
            },
          ],
        },
        {
          title: {
            text: fieldData.switch.label,
          },
          spinning,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.switch,
              fieldData: fieldData.switch,
              checked: true,
              require: false,
              otherProps: {
                checkedChildren: '??????',
                unCheckedChildren: '??????',
                onChange: (v) => {
                  console.log(v);
                },
              },
            },
          ],
        },
        {
          title: {
            text: '????????????',
          },
          spinning,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.html,
              html: getValueByKey({
                data: metaData,
                key: fieldData.description.name,
              }),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '????????????',
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.html,
              html: '',
            },
          ],
          instruction: [
            {
              title: '??????',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: 'Html????????????, ??????????????????Empty',
                },
              ],
            },
          ],
        },
        {
          title: {
            text: 'syntaxHighlighter',
          },
          spinning,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.syntaxHighlighterView,
              fieldData: fieldData.syntaxHighlighter,
              value: `SELECT * FROM (SELECT row_number() over (ORDER BY [article].[sort] DESC, [article].[create_time] DESC) AS rowId, ISNULL([article].[id],0) AS [ArticleId] FROM article WHERE 1=1 AND [article].[platform_id] = 1504634917793959936 AND [article].[business_mode] = 400 AND [article].[status] IN ('0','10') ) as t where rowId between 1 and 10`,
              language: 'sql',
              otherProps: {
                showLineNumbers: false,
                wrapLines: false,
              },
            },
          ],
          instruction: [
            {
              title: '??????',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: 'Html?????????????????????????????????Empty',
                },
              ],
            },
          ],
        },
        {
          title: {
            text: '???????????????',
          },
          spinning,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.tinymce,
              content: initContent,
              afterChange: this.afterHtmlChange,
            },
          ],
          instruction: [
            {
              title: '??????',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: 'Html?????????????????????????????????Empty',
                },
              ],
            },
          ],
        },
        {
          title: {
            text: '????????????',
          },
          spinning,
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
                text: '????????????',
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
                  text: '????????????',
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
      title: '????????????',
      list: [
        {
          text: '?????????????????????????????????????????????????????????',
        },
        {
          text: '?????????????????????????????????????????????????????????',
        },
      ],
    };
  };

  renderOther = () => {
    const { metaData, changeImageSortModalVisible } = this.state;

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
