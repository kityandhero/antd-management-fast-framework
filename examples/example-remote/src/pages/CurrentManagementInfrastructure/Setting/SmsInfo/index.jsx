import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { keyValueEditModeCollection } from '../../../../customConfig';
import { getShortMessagingServiceProviderName } from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { buildInputItem } from '../../../../utils';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';
import { UpdateEffectiveShortMessagingServiceModal } from '../../UpdateEffectiveShortMessagingServiceModal';
import { UpdateKeyValueInfoModal } from '../../UpdateKeyValueInfoModal';

@connect(({ currentManagementInfrastructure, schedulingControl }) => ({
  currentManagementInfrastructure,
  schedulingControl,
}))
class Index extends TabPageBase {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.currentManagementInfrastructureTypeCollection.get,
    };
  }

  showUpdateEffectiveShortMessagingServiceModal = () => {
    UpdateEffectiveShortMessagingServiceModal.open();
  };

  afterUpdateEffectiveShortMessagingServiceModalOk = () => {
    this.reloadData({});
  };

  showUpdateKeyValueInfoModal = ({
    fieldData: targetFieldData,
    editMode = keyValueEditModeCollection.string,
  }) => {
    this.setState(
      {
        targetFieldData,
        keyValueEditMode: editMode,
      },
      () => {
        UpdateKeyValueInfoModal.open();
      },
    );
  };

  afterUpdateKeyValueInfoModalOk = () => {
    this.reloadData({});
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
      values[fieldData.sms.shortMessagingServiceYunPianKey.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.sms.shortMessagingServiceYunPianKey.name,
        });

      values[fieldData.sms.shortMessagingServiceYunPianSignature.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.sms.shortMessagingServiceYunPianSignature.name,
        });

      values[fieldData.sms.shortMessagingServiceAliYunSignature.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.sms.shortMessagingServiceAliYunSignature.name,
        });

      values[fieldData.sms.shortMessagingServiceAliYunAccessKeyId.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.sms.shortMessagingServiceAliYunAccessKeyId.name,
        });

      values[fieldData.sms.shortMessagingServiceAliYunAccessKeySecret.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.sms.shortMessagingServiceAliYunAccessKeySecret.name,
        });

      values[fieldData.sms.shortMessagingServiceAliYunEndpoint.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.sms.shortMessagingServiceAliYunEndpoint.name,
        });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { firstLoadSuccess, metaData } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '配置生效的短信服务提供商',
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
            ],
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.sms.shortMessagingServiceEffective,
              editMode: keyValueEditModeCollection.string,
              value: getShortMessagingServiceProviderName({
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.sms.shortMessagingServiceEffective.name,
                  convert: convertCollection.string,
                }),
              }),
              handleClick: this.showUpdateEffectiveShortMessagingServiceModal,
            }),
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '云片短信服务提供商配置信息',
          },
          items: [
            buildInputItem({
              lg: 18,
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.sms.shortMessagingServiceYunPianKey,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              lg: 6,
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.sms.shortMessagingServiceYunPianSignature,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '阿里云短信服务提供商配置信息',
          },
          items: [
            buildInputItem({
              lg: 12,
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.sms.shortMessagingServiceAliYunAccessKeyId,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              lg: 12,
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.sms.shortMessagingServiceAliYunAccessKeySecret,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              lg: 12,
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.sms.shortMessagingServiceAliYunEndpoint,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              lg: 12,
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.sms.shortMessagingServiceAliYunSignature,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { keyValueEditMode, metaData, targetFieldData } = this.state;

    return (
      <>
        <UpdateEffectiveShortMessagingServiceModal
          externalData={{
            currentData: metaData,
            fieldData: targetFieldData,
          }}
          editMode={keyValueEditMode || keyValueEditModeCollection.string}
          afterClose={() => {
            this.afterUpdateEffectiveShortMessagingServiceModalOk();
          }}
        />

        <UpdateKeyValueInfoModal
          externalData={{
            currentData: metaData,
            fieldData: targetFieldData,
          }}
          editMode={keyValueEditMode || keyValueEditModeCollection.string}
          afterOK={() => {
            this.afterUpdateKeyValueInfoModalOk();
          }}
        />
      </>
    );
  };
}

export default Index;
