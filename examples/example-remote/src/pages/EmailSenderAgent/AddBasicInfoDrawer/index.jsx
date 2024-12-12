import { connect } from 'easy-soft-dva';
import { whetherString, zeroInt } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import {
  buildNowTimeFieldItem,
  renderFormEmailSenderAgentTypeSelect,
} from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = '291e3072b86d4266b93dc78af53dcbbf';

@connect(({ emailSenderAgent, schedulingControl }) => ({
  emailSenderAgent,
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
      submitApiPath: 'emailSenderAgent/addBasicInfo',
    };
  }

  getPresetPageTitle = () => {
    return '新增转发信息';
  };

  fillDefaultInitialValues = () => {
    const initialValues = {};

    initialValues[fieldData.whetherSsl.name] = whetherString.no;
    initialValues[fieldData.sort.name] = zeroInt;

    return initialValues;
  };

  establishCardCollectionConfig = () => {
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
              fieldData: fieldData.title,
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
            text: '转发域配置',
          },
          items: [
            {
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.host,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.port,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.whetherSelect,
              fieldData: fieldData.whetherSsl,
              require: true,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: renderFormEmailSenderAgentTypeSelect({
                required: true,
              }),
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

export default AddBasicInfoDrawer;
