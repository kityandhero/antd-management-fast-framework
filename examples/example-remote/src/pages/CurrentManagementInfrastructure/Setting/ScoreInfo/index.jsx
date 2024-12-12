import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import { iconBuilder } from 'antd-management-fast-component';

import {
  accessWayCollection,
  keyValueEditModeCollection,
} from '../../../../customConfig';
import { buildInputItem } from '../../../../utils';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';
import { UpdateKeyValueInfoModal } from '../../UpdateKeyValueInfoModal';

@connect(({ currentManagementInfrastructure, schedulingControl }) => ({
  currentManagementInfrastructure,
  schedulingControl,
}))
class ReadObtainScoreInfo extends TabPageBase {
  reloadHeaderOnSubmitSuccess = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'currentManagementInfrastructure/get',
      obtainScoreByReadSwitch: 0,
    };
  }

  doOtherAfterLoadSuccess = ({
    metaData,
    // eslint-disable-next-line no-unused-vars
    metaListData,
    // eslint-disable-next-line no-unused-vars
    metaExtra,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData,
  }) => {
    const obtainScoreByReadSwitch =
      getValueByKey({
        data: metaData,
        key: fieldData.obtainScoreByReadSwitch.name,
        convert: convertCollection.number,
      }) === whetherNumber.yes
        ? whetherNumber.yes
        : whetherNumber.no;

    this.setState({ obtainScoreByReadSwitch });
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

    return values;
  };

  establishCardCollectionConfig = () => {
    const { firstLoadSuccess, metaData, obtainScoreByReadSwitch } = this.state;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '积分基础配置',
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.scoreAlias,
              editMode: keyValueEditModeCollection.string,
              hidden: !checkHasAuthority(
                accessWayCollection.section.updateKeyValueInfo.permission,
              ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.scoreAlias.name,
                convert: convertCollection.string,
              }),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '阅读时奖励积分开关',
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.obtainScoreByReadSwitch,
              editMode: keyValueEditModeCollection.whether,
              hidden: !checkHasAuthority(
                accessWayCollection.section.updateKeyValueInfo.permission,
              ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.obtainScoreByReadSwitch.name,
                convert: convertCollection.number,
                formatBuilder: (v) => {
                  return v === whetherNumber.yes ? '开启' : '关闭';
                },
              }),
              inputIcon: iconBuilder.swap(),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.obtainScoreWhenRead,
              editMode: keyValueEditModeCollection.number,
              hidden:
                obtainScoreByReadSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.section.updateKeyValueInfo.permission,
                ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.obtainScoreWhenRead.name,
                convert: convertCollection.string,
              }),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.obtainFromReadDailyLimit,
              editMode: keyValueEditModeCollection.number,
              hidden:
                obtainScoreByReadSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.section.updateKeyValueInfo.permission,
                ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.obtainFromReadDailyLimit.name,
                convert: convertCollection.string,
              }),
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

export default ReadObtainScoreInfo;
