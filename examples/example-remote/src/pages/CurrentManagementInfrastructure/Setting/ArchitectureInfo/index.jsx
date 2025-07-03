import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { keyValueEditModeCollection } from '../../../../customConfig';
import {
  getCacheModeName,
  getMessageQueueModeName,
  getMessageQueueToStoreModeName,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { buildInputItem } from '../../../../utils';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';
import { UpdateCacheModeModal } from '../../UpdateCacheModeModal';
import { UpdateMessageQueueModeModal } from '../../UpdateMessageQueueModeModal';
import { UpdateMessageQueueToStoreModeModal } from '../../UpdateMessageQueueToStoreModeModal';

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

  showUpdateCacheModeModal = () => {
    UpdateCacheModeModal.open();
  };

  afterUpdateCacheModeModalOk = () => {
    this.reloadData({});
  };

  showUpdateMessageQueueModeModal = () => {
    UpdateMessageQueueModeModal.open();
  };

  afterUpdateMessageQueueModeModalOk = () => {
    this.reloadData({});
  };

  showUpdateMessageQueueToStoreModeModal = () => {
    UpdateMessageQueueToStoreModeModal.open();
  };

  afterUpdateMessageQueueToStoreModeModalOk = () => {
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

    return values;
  };

  establishCardCollectionConfig = () => {
    const { firstLoadSuccess, metaData } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '缓存相关设置',
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
              fieldData: fieldData.cacheMode,
              editMode: keyValueEditModeCollection.string,
              value: getCacheModeName({
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.cacheMode.name,
                  convert: convertCollection.string,
                }),
              }),
              handleClick: this.showUpdateCacheModeModal,
            }),
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '队列相关设置',
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.messageQueueMode,
              editMode: keyValueEditModeCollection.string,
              value: getMessageQueueModeName({
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.messageQueueMode.name,
                  convert: convertCollection.string,
                }),
              }),
              handleClick: this.showUpdateMessageQueueModeModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.messageQueueToStoreMode,
              editMode: keyValueEditModeCollection.string,
              value: getMessageQueueToStoreModeName({
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.messageQueueToStoreMode.name,
                  convert: convertCollection.string,
                }),
              }),
              handleClick: this.showUpdateMessageQueueToStoreModeModal,
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
        <UpdateCacheModeModal
          externalData={{
            currentData: metaData,
            fieldData: targetFieldData,
          }}
          editMode={keyValueEditMode || keyValueEditModeCollection.string}
          afterClose={() => {
            this.afterUpdateCacheModeModalOk();
          }}
        />

        <UpdateMessageQueueModeModal
          externalData={{
            currentData: metaData,
            fieldData: targetFieldData,
          }}
          editMode={keyValueEditMode || keyValueEditModeCollection.string}
          afterClose={() => {
            this.afterUpdateMessageQueueModeModalOk();
          }}
        />

        <UpdateMessageQueueToStoreModeModal
          externalData={{
            currentData: metaData,
            fieldData: targetFieldData,
          }}
          editMode={keyValueEditMode || keyValueEditModeCollection.string}
          afterClose={() => {
            this.afterUpdateMessageQueueToStoreModeModalOk();
          }}
        />
      </>
    );
  };
}

export default Index;
