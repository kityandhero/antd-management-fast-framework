import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  getValueByKey,
  toNumber,
  toString,
  whetherNumber,
  zeroInt,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import { DataForm } from 'antd-management-fast-framework';

import {
  buildNowTimeFieldItem,
  renderFormGalleryTypeSelect,
} from '../../../customSpecialComponents';
import { singleTreeListAction as categorySingleTreeListAction } from '../../GalleryCategory/Assist/action';
import { fieldData, typeCollection } from '../Common/data';

const { BaseAddForm } = DataForm;

@connect(({ gallery, schedulingControl }) => ({
  gallery,
  schedulingControl,
}))
class AddBasicInfo extends BaseAddForm {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '新增展示图',
      submitApiPath: 'gallery/addBasicInfo',
      categoryTreeData: [],
      categoryId: '',
      image: '',
      selectType: 0,
    };
  }

  doOtherRemoteRequest = () => {
    this.loadCategoryTreeList({ refresh: whetherNumber.no });
  };

  loadCategoryTreeList = ({ refresh = whetherNumber.no }) => {
    categorySingleTreeListAction({
      target: this,
      handleData: { refresh },
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          categoryTreeData: remoteListData,
        });
      },
    });
  };

  reloadCategoryTreeList = () => {
    this.loadCategoryTreeList({ refresh: whetherNumber.yes });
  };

  supplementSubmitRequestParams = (o) => {
    const d = { ...o };

    const { image, categoryId, selectType } = this.state;

    d[fieldData.imageUrl.name] = image;
    d[fieldData.categoryId.name] = categoryId;
    d[fieldData.type.name] = toString(selectType);

    return d;
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image: image });
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
    const galleryId = getValueByKey({
      data: singleData,
      key: fieldData.galleryId.name,
    });

    this.goToPath(`/assistTools/gallery/edit/load/${galleryId}/1/basicInfo`);
  };

  fillDefaultInitialValues = () => {
    const initialValues = {};

    initialValues[fieldData.sort.name] = zeroInt;

    return initialValues;
  };

  establishCardCollectionConfig = () => {
    const { image, categoryId, selectType, categoryTreeData } = this.state;

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
                buildType: cardConfig.extraBuildType.save,
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
              type: cardConfig.contentItemType.treeSelect,
              fieldData: fieldData.categoryId,
              value: categoryId,
              require: true,
              listData: categoryTreeData,
              addonAfter: buildButton({
                text: '',
                icon: iconBuilder.reload(),
                handleClick: () => {
                  this.reloadCategoryTreeList();
                },
              }),
              dataConvert: (o) => {
                const { name: title, code: value } = o;

                return {
                  title,
                  value,
                };
              },
              // eslint-disable-next-line no-unused-vars
              onChange: ({ value, label, extra }) => {
                this.setState({
                  categoryId: toString(value),
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
            text: '类型设置',
          },
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: renderFormGalleryTypeSelect({
                onChange: (event) => {
                  this.setState({ selectType: toString(event) });
                },
              }),
              require: true,
            },
            {
              lg: 18,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.url,
              require: true,
              hidden: !checkInCollection(
                [typeCollection.html, typeCollection.page],
                toNumber(selectType),
              ),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '图片上传',
            subText: '[上传后需点击保存按钮保存!]',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageUpload,
              image: image,
              action: `/gallery/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介 - 描述 - 备注',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
              require: false,
            },
          ],
        },
        buildNowTimeFieldItem({}),
      ],
    };
  };
}

export default AddBasicInfo;
