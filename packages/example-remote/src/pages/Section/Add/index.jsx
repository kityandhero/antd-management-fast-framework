import { connect } from 'easy-soft-dva';
import { checkHasAuthority, getValueByKey, toString } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataForm } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { renderFormBusinessModeSelect } from '../../../customSpecialComponents';
import { singleTreeListAction } from '../Assist/action';
import { fieldData } from '../Common/data';

const { BaseAddForm } = DataForm;

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class Add extends BaseAddForm {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '新增品类',
      submitApiPath: 'section/addBasicInfo',
      image: '',
      parentId: '0',
      sectionTreeData: [],
    };
  }

  doOtherRemoteRequest = () => {
    singleTreeListAction({
      target: this,
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          sectionTreeData: [
            {
              title: '无上级',
              code: '0',
            },
            ...remoteListData,
          ],
        });
      },
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = { ...o };

    const { image, rectangleImage, parentId } = this.state;

    d.image = image;
    d.rectangleImage = rectangleImage;
    d.parentId = parentId;

    return d;
  };

  buildNotificationDescription = ({
    // eslint-disable-next-line no-unused-vars
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
    return `数据已经保存成功，请进行下一步操作。`;
  };

  doOtherAfterSubmitSuccess = ({
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
    const sectionId = getValueByKey({
      data: singleData,
      key: fieldData.sectionId.name,
    });

    this.redirectToPath(`/news/section/edit/load/${sectionId}/1/basicInfo`);
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image: image });
  };

  afterRectangleImageUploadSuccess = (image) => {
    this.setState({ rectangleImage: image });
  };

  fillDefaultInitialValues = () => {
    const values = {};

    values[fieldData.sort.name] = 0;

    return values;
  };

  establishCardCollectionConfig = () => {
    const { image, rectangleImage, sectionTreeData, parentId } = this.state;

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
                hidden: !checkHasAuthority(
                  accessWayCollection.section.addBasicInfo.permission,
                ),
                text: '保存并进入下一步',
              },
            ],
          },

          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.name,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.customSelect,
              component: renderFormBusinessModeSelect({}),
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.treeSelect,
              fieldData: fieldData.parentId,
              value: parentId,
              require: true,
              listData: sectionTreeData,
              dataConvert: (o) => {
                const { title, code: value } = o;

                return {
                  title,
                  value,
                };
              },
              onChange: (v) => {
                this.setState({
                  parentId: toString(v),
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
            text: '其他信息',
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
            icon: iconBuilder.contacts(),
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
