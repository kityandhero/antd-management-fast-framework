import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  buildNowTimeFieldItem,
  renderFormBusinessModeSelect,
  renderFormQuestionTypeSelect,
} from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '094daf5864ef418c9e23455cef111145';

@connect(({ question, schedulingControl }) => ({
  question,
  schedulingControl,
}))
class AddBasicInfoDrawer extends BaseAddDrawer {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  componentAuthority = accessWayCollection.question.addBasicInfo.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增问题',
      submitApiPath: 'question/addBasicInfo',
      image: '',
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.setState({
      image: '',
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = { ...o };

    const { image } = this.state;

    d[fieldData.image.name] = image;

    return d;
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image: image });
  };

  establishCardCollectionConfig = () => {
    const { image } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.title,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormQuestionTypeSelect({}),
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormBusinessModeSelect({}),
              require: true,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '图例上传',
            subText: '[上传后需点击保存按钮保存!]',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageUpload,
              image: image,
              action: `/question/uploadImage`,
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
            },
          ],
        },
        buildNowTimeFieldItem({}),
      ],
    };
  };
}

export { AddBasicInfoDrawer };
