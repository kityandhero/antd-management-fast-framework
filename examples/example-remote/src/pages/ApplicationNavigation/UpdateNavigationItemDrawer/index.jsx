import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  renderFormApplicationNavigationAccessibilitySelect,
  renderFormApplicationNavigationOperationTypeSelect,
  renderFormApplicationNavigationVisibilitySelect,
} from '../../../customSpecialComponents';
import { navigationItemData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = '6ae68ff23a4e4b55a8f5acfc44c5dc11';

@connect(({ applicationNavigation, schedulingControl }) => ({
  applicationNavigation,
  schedulingControl,
}))
class UpdateNavigationItemDrawer extends BaseUpdateDrawer {
  componentAuthority =
    accessWayCollection.applicationNavigation.updateNavigationItem.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'applicationNavigation/getNavigationItem',
      submitApiPath: 'applicationNavigation/updateNavigationItem',
      icon: '',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d.id = getValueByKey({
      data: externalData,
      key: navigationItemData.id.name,
    });

    d.applicationNavigationId = getValueByKey({
      data: externalData,
      key: navigationItemData.applicationNavigationId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData, icon } = this.state;

    d.id = getValueByKey({
      data: externalData,
      key: navigationItemData.id.name,
    });

    d.applicationNavigationId = getValueByKey({
      data: externalData,
      key: navigationItemData.applicationNavigationId.name,
    });

    d.icon = icon;

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
    const icon = getValueByKey({
      data: metaData,
      key: navigationItemData.icon.name,
    });

    this.setState({ icon });
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ icon: image });
  };

  renderPresetTitle = () => {
    return '编辑页面导航';
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
      values[navigationItemData.title.name] = getValueByKey({
        data: metaData,
        key: navigationItemData.title.name,
      });

      values[navigationItemData.path.name] = getValueByKey({
        data: metaData,
        key: navigationItemData.path.name,
      });

      values[navigationItemData.exteriorMicroAppId.name] = getValueByKey({
        data: metaData,
        key: navigationItemData.exteriorMicroAppId.name,
      });

      values[navigationItemData.operationType.name] = getValueByKey({
        data: metaData,
        key: navigationItemData.operationType.name,
        convert: convertCollection.string,
      });

      values[navigationItemData.accessibility.name] = getValueByKey({
        data: metaData,
        key: navigationItemData.accessibility.name,
        convert: convertCollection.string,
      });

      values[navigationItemData.visibility.name] = getValueByKey({
        data: metaData,
        key: navigationItemData.visibility.name,
        convert: convertCollection.string,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData, icon } = this.state;

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
              fieldData: navigationItemData.title,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormApplicationNavigationOperationTypeSelect({}),
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: navigationItemData.path,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: navigationItemData.exteriorMicroAppId,
              require: false,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormApplicationNavigationAccessibilitySelect({}),
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormApplicationNavigationVisibilitySelect({}),
              require: true,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '设置图标',
            subText: '[上传后需点击保存按钮保存!]',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageUpload,
              image: icon,
              action: `/applicationNavigation/uploadImage`,
              afterUploadSuccess: (image) => {
                this.afterImageUploadSuccess(image);
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
              fieldData: navigationItemData.description,
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
              fieldData: navigationItemData.createTime,
              value: getValueByKey({
                data: metaData,
                key: navigationItemData.createTime.name,
                format: formatCollection.datetime,
              }),
            },
            {
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: navigationItemData.updateTime,
              value: getValueByKey({
                data: metaData,
                key: navigationItemData.updateTime.name,
                format: formatCollection.datetime,
              }),
            },
          ],
        },
      ],
    };
  };
}

export default UpdateNavigationItemDrawer;
