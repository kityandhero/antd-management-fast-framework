import { Checkbox } from 'antd';

import { connect } from 'easy-soft-dva';
import { getValueByKey, toString, whetherNumber } from 'easy-soft-utility';

import { cardConfig, drawerConfig } from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import {
  buildNowTimeFieldItem,
  renderFormBusinessModeSelect,
} from '../../../customSpecialComponents';
import { singleTreeListAction } from '../Assist/action';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = '6ad4fe82bd0b4d6a9f1980358e68a786';

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class AddBasicInfoDrawer extends BaseAddDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增栏目',
      submitApiPath: 'section/addBasicInfo',
      image: '',
      rectangleImage: '',
      parentId: '0',
      sectionTreeData: [],
      goToEditAfterAdd: true,
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadSectionTreeList();
  };

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      image: '',
      rectangleImage: '',
      parentId: '0',
      goToEditAfterAdd: true,
    });
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

  supplementSubmitRequestParams = (o) => {
    const d = { ...o };

    const { image, rectangleImage, parentId } = this.state;

    d.image = image;
    d.rectangleImage = rectangleImage;
    d.parentId = parentId;

    return d;
  };

  buildNotificationDescription = (
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
  ) => {
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
    const { goToEditAfterAdd } = this.state;

    if (!goToEditAfterAdd) {
      return;
    }

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

  buildBottomBarInnerLeftItemConfigList = () => {
    const { goToEditAfterAdd } = this.state;

    return [
      {
        buildType: drawerConfig.bottomBarBuildType.component,
        component: (
          <Checkbox
            style={{ marginLeft: '4px' }}
            checked={goToEditAfterAdd}
            onChange={(event) => {
              const {
                target: { checked },
              } = event;

              this.setState({
                goToEditAfterAdd: checked,
              });
            }}
          >
            保存后跳转详情页
          </Checkbox>
        ),
      },
    ];
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
          items: [
            {
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.name,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormBusinessModeSelect({}),
              require: true,
            },
            {
              lg: 12,
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
              lg: 12,
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
        buildNowTimeFieldItem({}),
      ],
    };
  };
}

export { AddBasicInfoDrawer };
