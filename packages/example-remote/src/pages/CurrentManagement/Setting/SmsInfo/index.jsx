import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

@connect(({ currentManagement, schedulingControl }) => ({
  currentManagement,
  schedulingControl,
}))
class Index extends TabPageBase {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'currentManagement/get',
      submitApiPath: 'currentManagement/updateSmsInfo',
      logo: '',
    };
  }

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
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
      values[fieldData.sms.shortMessagingServiceKey.name] = getValueByKey({
        data: metaData,
        key: fieldData.sms.shortMessagingServiceKey.name,
      });

      values[fieldData.sms.shortMessagingServiceSignature.name] = getValueByKey(
        {
          data: metaData,
          key: fieldData.sms.shortMessagingServiceSignature.name,
        },
      );

      values[fieldData.sms.shortMessagingServiceVerificationCodeTemplate.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.sms.shortMessagingServiceVerificationCodeTemplate.name,
        });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
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
              lg: 18,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.sms.shortMessagingServiceKey,
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.sms.shortMessagingServiceSignature,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '模板配置 ',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData:
                fieldData.sms.shortMessagingServiceVerificationCodeTemplate,
            },
          ],
        },
      ],
    };
  };
}

export default Index;
