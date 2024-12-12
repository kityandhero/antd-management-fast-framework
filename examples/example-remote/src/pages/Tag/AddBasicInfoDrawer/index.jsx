import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import {
  buildNowTimeFieldItem,
  renderFormBusinessModeSelect,
  renderFormTagDisplayRangeSelect,
  renderFormTagTypeSelect,
} from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = 'd29ae78d6175434392d3d68a37f05ee6';

@connect(({ tag, schedulingControl }) => ({
  tag,
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
      pageTitle: '新增标签',
      submitApiPath: 'tag/addBasicInfo',
      image: '',
    };
  }

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
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.name,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.displayName,
              require: false,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormTagTypeSelect({}),
              require: true,
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
            icon: iconBuilder.contacts(),
            text: '配置信息',
            subText: '[配置信息保存后不可更改!]',
          },
          items: [
            {
              lg: 12,
              type: cardConfig.contentItemType.customSelect,
              component: renderFormTagDisplayRangeSelect({}),
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customSelect,
              component: renderFormBusinessModeSelect({}),
              require: true,
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
              action: `/tag/uploadImage`,
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

export default AddBasicInfoDrawer;
