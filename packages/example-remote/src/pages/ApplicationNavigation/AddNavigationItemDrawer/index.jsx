import { connect } from 'easy-soft-dva';
import { getValueByKey, toString } from 'easy-soft-utility';

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
import {
  accessibilityCollection,
  navigationItemData,
  operationTypeCollection,
  visibilityCollection,
} from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = '12c23121ab814f8ca0f84668621a9a41';

@connect(({ applicationNavigation, schedulingControl }) => ({
  applicationNavigation,
  schedulingControl,
}))
class AddNavigationItemDrawer extends BaseAddDrawer {
  componentAuthority =
    accessWayCollection.applicationNavigation.addNavigationItem.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增导航项',
      submitApiPath: 'applicationNavigation/addNavigationItem',
      icon: '',
    };
  }

  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisible = (preProperties, preState, snapshot) => {
    this.setState({ icon: '' });
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData, icon } = this.state;

    d.applicationNavigationId = getValueByKey({
      data: externalData,
      key: navigationItemData.applicationNavigationId.name,
    });

    d.icon = icon;

    return d;
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ icon: image });
  };

  fillDefaultInitialValues = () => {
    const initialValues = {};

    initialValues[navigationItemData.operationType.name] = toString(
      operationTypeCollection.microAppPage,
    );

    initialValues[navigationItemData.accessibility.name] = toString(
      accessibilityCollection.allow,
    );

    initialValues[navigationItemData.visibility.name] = toString(
      visibilityCollection.visible,
    );

    return initialValues;
  };

  establishCardCollectionConfig = () => {
    const { icon } = this.state;

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
              type: cardConfig.contentItemType.nowTime,
            },
          ],
        },
      ],
    };
  };
}

export { AddNavigationItemDrawer };
