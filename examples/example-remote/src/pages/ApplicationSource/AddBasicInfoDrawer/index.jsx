import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import {
  renderFormApplicationSourceCreateModeSelect,
  renderFormApplicationSourceTypeSelect,
} from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = 'e5beed5942144933bdd0378fe2648184';

@connect(({ applicationSource, schedulingControl }) => ({
  applicationSource,
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
      pageTitle: '创建应用源',
      loadApiPath: 'applicationSource/get',
      submitApiPath: 'applicationSource/addBasicInfo',
      applicationSourceId: null,
      logo: '',
    };
  }

  supplementSubmitRequestParams = (o) => {
    const d = { ...o };

    const { logo } = this.state;

    d.logo = logo;

    return d;
  };

  afterUploadSuccess = (image) => {
    this.setState({ logo: image });
  };

  establishCardCollectionConfig = () => {
    const { logo } = this.state;

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
              fieldData: fieldData.shortName,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customSelect,
              component: renderFormApplicationSourceTypeSelect({}),
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customSelect,
              component: renderFormApplicationSourceCreateModeSelect({}),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '设置应用图标',
            subText: '[上传后需点击保存按钮保存!]',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageUpload,
              image: logo,
              action: `/applicationSource/uploadImage`,
              afterUploadSuccess: (image) => {
                this.afterUploadSuccess(image);
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
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
            },
            {
              type: cardConfig.contentItemType.nowTime,
            },
          ],
        },
      ],
    };
  };
}

export default AddBasicInfoDrawer;
