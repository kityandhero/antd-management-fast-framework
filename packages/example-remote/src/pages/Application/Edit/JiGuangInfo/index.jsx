import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  getValueByKey,
  showSimpleSuccessMessage,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import {
  accessWayCollection,
  keyValueEditModeCollection,
} from '../../../../customConfig';
import { buildInputItem } from '../../../../utils';
import { testJiGuangSendDeviceAction } from '../../Assist/action';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';
import { UpdateKeyValueInfoModal } from '../../UpdateKeyValueInfoModal';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class PagePathInfo extends TabPageBase {
  goToUpdateWhenProcessed = true;

  componentAuthority =
    accessWayCollection.application.getJiGuangConfig.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'application/getJiGuangConfig',
      applicationId: null,
      targetFieldData: null,
      keyValueEditMode: keyValueEditModeCollection.string,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  testJiGuangSendDevice = () => {
    const { metaData } = this.state;

    testJiGuangSendDeviceAction({
      target: this,
      handleData: metaData,
      successCallback: () => {
        showSimpleSuccessMessage('发送成功');
      },
    });
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
      values[fieldData.jiGuangAppKey.name] = getValueByKey({
        data: metaData,
        key: fieldData.jiGuangAppKey.name,
      });

      values[fieldData.jiGuangSecret.name] = getValueByKey({
        data: metaData,
        key: fieldData.jiGuangSecret.name,
      });

      values[fieldData.jiGuangTestDeviceCode.name] = getValueByKey({
        data: metaData,
        key: fieldData.jiGuangTestDeviceCode.name,
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
            text: '极光配置',
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.jiGuangAppKey,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.jiGuangSecret,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '测试配置',
          },
          hasExtra: true,
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.generalButton,
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.application.testJiGuangSendDevice
                    .permission,
                ),
                type: 'primary',
                icon: iconBuilder.message(),
                text: '测试推送',
                handleClick: () => {
                  this.testJiGuangSendDevice();
                },
              },
            ],
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.jiGuangTestDeviceCode,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '设置极光相关配置。',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { keyValueEditMode, metaData, targetFieldData } = this.state;

    return (
      <>
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

export default PagePathInfo;
