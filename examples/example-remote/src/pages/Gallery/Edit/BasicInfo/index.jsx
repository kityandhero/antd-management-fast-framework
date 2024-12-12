import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  convertCollection,
  getValueByKey,
  toNumber,
  toString,
  whetherNumber,
  zeroString,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';

import {
  buildUpdateTimeAndOperatorFieldItem,
  renderFormGalleryTypeSelect,
} from '../../../../customSpecialComponents';
import { singleTreeListAction as categorySingleTreeListAction } from '../../../GalleryCategory/Assist/action';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData, typeCollection } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ gallery, schedulingControl }) => ({
  gallery,
  schedulingControl,
}))
class Index extends TabPageBase {
  reloadHeaderOnSubmitSuccess = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'gallery/get',
      submitApiPath: 'gallery/updateBasicInfo',
      categoryTreeData: [],
      galleryId: '',
      categoryId: '',
      image: '',
      selectType: 0,
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

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { galleryId } = this.state;

    d[fieldData.galleryId.name] = galleryId;

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { galleryId, image, categoryId, selectType } = this.state;

    d[fieldData.galleryId.name] = galleryId;
    d[fieldData.imageUrl.name] = image;
    d[fieldData.categoryId.name] = categoryId;
    d[fieldData.type.name] = toString(selectType);

    return d;
  };

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const categoryId = getValueByKey({
      data: metaData,
      key: fieldData.categoryId.name,
      convert: convertCollection.string,
    });

    const type = getValueByKey({
      data: metaData,
      key: fieldData.type.name,
      convert: convertCollection.number,
    });

    this.setState({
      categoryId: categoryId === zeroString ? '' : categoryId,
      selectType: type,
    });
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image: image });
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
      values[fieldData.title.name] = getValueByKey({
        data: metaData,
        key: fieldData.title.name,
      });

      values[fieldData.sort.name] = getValueByKey({
        data: metaData,
        key: fieldData.sort.name,
      });

      values[fieldData.type.name] = getValueByKey({
        data: metaData,
        key: fieldData.type.name,
        convert: convertCollection.string,
      });

      values[fieldData.url.name] = getValueByKey({
        data: metaData,
        key: fieldData.url.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData, image, categoryId, selectType, categoryTreeData } =
      this.state;

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
              value: toString(categoryId),
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
        buildUpdateTimeAndOperatorFieldItem({ data: metaData, line: 1 }),
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '角色名称尽可能表达出实际含义。',
        },
      ],
    };
  };
}

export default Index;
