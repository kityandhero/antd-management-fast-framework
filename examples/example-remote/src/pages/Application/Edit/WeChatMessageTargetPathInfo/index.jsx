import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import {
  accessWayCollection,
  keyValueEditModeCollection,
} from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { buildInputItem } from '../../../../utils';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';
import { UpdateKeyValueInfoModal } from '../../UpdateKeyValueInfoModal';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class WeChatMessageTargetPathInfo extends TabPageBase {
  reloadHeaderOnSubmitSuccess = true;

  componentAuthority = accessWayCollection.application.getConfigure.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.applicationTypeCollection.getConfigure,
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

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { applicationId } = this.state;

    d.applicationId = applicationId;

    return d;
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
      values[fieldData.weChatOfficialAccountPaySuccessMessagePagePath.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.weChatOfficialAccountPaySuccessMessagePagePath.name,
        });

      values[fieldData.weChatMiniProgramPaySuccessMessagePagePath.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.weChatMiniProgramPaySuccessMessagePagePath.name,
        });

      values[
        fieldData.weChatOfficialAccountWithdrawSuccessMessagePagePath.name
      ] = getValueByKey({
        data: metaData,
        key: fieldData.weChatOfficialAccountWithdrawSuccessMessagePagePath.name,
      });

      values[fieldData.weChatMiniProgramWithdrawSuccessMessagePagePath.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.weChatMiniProgramWithdrawSuccessMessagePagePath.name,
        });

      values[fieldData.weChatOfficialAccountWithdrawFailMessagePagePath.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.weChatOfficialAccountWithdrawFailMessagePagePath.name,
        });

      values[fieldData.weChatMiniProgramWithdrawFailMessagePagePath.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.weChatMiniProgramWithdrawFailMessagePagePath.name,
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
            text: '微信消息跳转路径设置',
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.weChatOfficialAccountPaySuccessMessagePagePath,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.weChatMiniProgramPaySuccessMessagePagePath,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.weChatOfficialAccountWithdrawSuccessMessagePagePath,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.weChatMiniProgramWithdrawSuccessMessagePagePath,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.weChatOfficialAccountWithdrawFailMessagePagePath,
              editMode: keyValueEditModeCollection.string,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.weChatMiniProgramWithdrawFailMessagePagePath,
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
          text: '设置微信消息跳转路径。',
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

export default WeChatMessageTargetPathInfo;
