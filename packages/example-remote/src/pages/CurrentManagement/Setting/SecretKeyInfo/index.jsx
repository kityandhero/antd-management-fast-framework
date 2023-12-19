import { connect } from 'easy-soft-dva';
import { checkHasAuthority, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { testSecretKeyAction } from '../../Assist/action';
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
      submitApiPath: 'currentManagement/updateSecretKeyInfo',
      logo: '',
    };
  }

  testSecretKey = () => {
    const { metaData } = this.state;

    testSecretKeyAction({
      target: this,
      handleData: metaData,
    });
  };

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
      values[fieldData.privateKey.name] = getValueByKey({
        data: metaData,
        key: fieldData.privateKey.name,
      });

      values[fieldData.publicKey.name] = getValueByKey({
        data: metaData,
        key: fieldData.publicKey.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { firstLoadSuccess } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '密钥配置',
            subtext: '请谨慎操作',
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.generalButton,
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.currentManagement.testSecretKey
                    .permission,
                ),
                icon: iconBuilder.read(),
                text: '测试密钥',
                handleClick: () => {
                  this.testSecretKey();
                },
              },
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
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.privateKey,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.publicKey,
            },
          ],
        },
      ],
    };
  };
}

export default Index;
