import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import {
  accessWayCollection,
  keyValueEditModeCollection,
} from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { buildInputItem, buildKeyTag } from '../../../../utils';
import { updateKeyValueAction } from '../../Assist/action';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';
import { UpdateKeyValueInfoModal } from '../../UpdateKeyValueInfoModal';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class CheckInInfo extends TabPageBase {
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
    this.refreshDataWithReloadAnimalPrompt({});
  };

  onCheckInEverydaySwitchChange = (v) => {
    const { metaData } = this.state;

    updateKeyValueAction({
      target: this,
      handleData: {
        applicationId: getValueByKey({
          data: metaData,
          key: fieldData.applicationId.name,
        }),
        tag: getValueByKey({
          data: metaData,
          key: buildKeyTag(fieldData.checkInEverydaySwitch.name),
        }),
        value: v ? 1 : 0,
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  onCheckInNotificationSwitchChange = (v) => {
    const { metaData } = this.state;

    updateKeyValueAction({
      target: this,
      handleData: {
        applicationId: getValueByKey({
          data: metaData,
          key: fieldData.applicationId.name,
        }),
        tag: getValueByKey({
          data: metaData,
          key: buildKeyTag(fieldData.checkInNotificationSwitch.name),
        }),
        value: v ? 1 : 0,
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
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
      values[fieldData.checkInEverydaySwitch.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.checkInEverydaySwitch.name,
          convert: convertCollection.number,
        }) === whetherNumber.yes;

      values[fieldData.checkInNotificationSwitch.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.checkInNotificationSwitch.name,
          convert: convertCollection.number,
        }) === whetherNumber.yes;

      values[fieldData.checkInScoreRewardEveryday.name] = getValueByKey({
        data: metaData,
        key: fieldData.checkInScoreRewardEveryday.name,
      });

      values[
        fieldData.weChatOfficialAccountCheckInNotificationTemplateId.name
      ] = getValueByKey({
        data: metaData,
        key: fieldData.weChatOfficialAccountCheckInNotificationTemplateId.name,
      });

      values[fieldData.weChatMiniProgramCheckInNotificationPagePath.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.weChatMiniProgramCheckInNotificationPagePath.name,
        });

      values[fieldData.weChatOfficialCheckInNotificationPagePath.name] =
        getValueByKey({
          data: metaData,
          key: fieldData.weChatOfficialCheckInNotificationPagePath.name,
        });

      values[fieldData.checkInNotificationTitle.name] = getValueByKey({
        data: metaData,
        key: fieldData.checkInNotificationTitle.name,
      });

      values[fieldData.checkInNotificationFirstParam.name] = getValueByKey({
        data: metaData,
        key: fieldData.checkInNotificationFirstParam.name,
      });

      values[fieldData.checkInNotificationSecondParam.name] = getValueByKey({
        data: metaData,
        key: fieldData.checkInNotificationSecondParam.name,
      });

      values[fieldData.checkInNotificationThirdParam.name] = getValueByKey({
        data: metaData,
        key: fieldData.checkInNotificationThirdParam.name,
      });

      values[fieldData.checkInNotificationFourthParam.name] = getValueByKey({
        data: metaData,
        key: fieldData.checkInNotificationFourthParam.name,
      });

      values[fieldData.checkInNotificationFifthParam.name] = getValueByKey({
        data: metaData,
        key: fieldData.checkInNotificationFifthParam.name,
      });

      values[fieldData.checkInNotificationRemark.name] = getValueByKey({
        data: metaData,
        key: fieldData.checkInNotificationRemark.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { firstLoadSuccess, metaData } = this.state;

    const checkInEverydaySwitch =
      getValueByKey({
        data: metaData,
        key: fieldData.checkInEverydaySwitch.name,
        convert: convertCollection.number,
      }) === whetherNumber.yes;

    const checkInNotificationSwitch =
      getValueByKey({
        data: metaData,
        key: fieldData.checkInNotificationSwitch.name,
        convert: convertCollection.number,
      }) === whetherNumber.yes;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '签到打卡设置',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.switch,
              fieldData: fieldData.checkInEverydaySwitch,
              require: false,
              innerProps: {
                checkedChildren: '开启',
                unCheckedChildren: '关闭',
                onChange: this.onCheckInEverydaySwitchChange,
              },
            },
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.checkInScoreRewardEveryday,
              editMode: keyValueEditModeCollection.number,
              hidden: !checkInEverydaySwitch,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '提醒消息设置',
          },
          hidden: !checkInEverydaySwitch,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.switch,
              fieldData: fieldData.checkInNotificationSwitch,
              require: false,
              innerProps: {
                checkedChildren: '开启',
                unCheckedChildren: '关闭',
                onChange: this.onCheckInNotificationSwitchChange,
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '消息模板设置',
              hidden: !checkInNotificationSwitch,
            },
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.weChatOfficialAccountCheckInNotificationTemplateId,
              editMode: keyValueEditModeCollection.string,
              hidden: !checkInNotificationSwitch,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.weChatMiniProgramCheckInNotificationPagePath,
              editMode: keyValueEditModeCollection.string,
              hidden: !checkInNotificationSwitch,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.weChatOfficialCheckInNotificationPagePath,
              editMode: keyValueEditModeCollection.string,
              hidden: !checkInNotificationSwitch,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '提醒设置',
              hidden: !checkInNotificationSwitch,
            },
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.checkInNotificationRemindTime,
              editMode: keyValueEditModeCollection.time,
              hidden: !checkInNotificationSwitch,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.checkInNotificationTitle,
              editMode: keyValueEditModeCollection.string,
              hidden: !checkInNotificationSwitch,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.checkInNotificationFirstParam,
              editMode: keyValueEditModeCollection.string,
              hidden: !checkInNotificationSwitch,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.checkInNotificationSecondParam,
              editMode: keyValueEditModeCollection.string,
              hidden: !checkInNotificationSwitch,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.checkInNotificationThirdParam,
              editMode: keyValueEditModeCollection.string,
              hidden: !checkInNotificationSwitch,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.checkInNotificationFourthParam,
              editMode: keyValueEditModeCollection.string,
              hidden: !checkInNotificationSwitch,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.checkInNotificationFifthParam,
              editMode: keyValueEditModeCollection.string,
              hidden: !checkInNotificationSwitch,
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.checkInNotificationRemark,
              editMode: keyValueEditModeCollection.string,
              hidden: !checkInNotificationSwitch,
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

export default CheckInInfo;
