import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  forEach,
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
import { buildInputItem } from '../../../../utils';
import {
  testDiskSpaceMonitoringAlarmEmailAction,
  testDiskSpaceMonitoringConfigAction,
  testDiskSpaceMonitoringDetectionEmailAction,
} from '../../Assist/action';
import { fieldData, fieldDataHardDiskPartition } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';
import { UpdateKeyValueInfoModal } from '../../UpdateKeyValueInfoModal';

@connect(({ currentManagementInfrastructure, schedulingControl }) => ({
  currentManagementInfrastructure,
  schedulingControl,
}))
class DiskSpaceMonitoringInfo extends TabPageBase {
  reloadHeaderOnSubmitSuccess = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.currentManagementInfrastructureTypeCollection.get,
      diskSpaceMonitoringSwitch: 0,
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
    const diskSpaceMonitoringSwitch =
      getValueByKey({
        data: metaData,
        key: fieldData.diskSpaceMonitoringSwitch.name,
        convert: convertCollection.number,
      }) === whetherNumber.yes
        ? whetherNumber.yes
        : whetherNumber.no;

    this.setState({ diskSpaceMonitoringSwitch });
  };

  testDiskSpaceMonitoringConfig = () => {
    const { metaData } = this.state;

    testDiskSpaceMonitoringConfigAction({
      target: this,
      handleData: metaData,
    });
  };

  testDiskSpaceMonitoringAlarmEmail = () => {
    const { metaData } = this.state;

    testDiskSpaceMonitoringAlarmEmailAction({
      target: this,
      handleData: metaData,
    });
  };

  testDiskSpaceMonitoringDetectionEmail = () => {
    const { metaData } = this.state;

    testDiskSpaceMonitoringDetectionEmailAction({
      target: this,
      handleData: metaData,
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

    return values;
  };

  establishCardCollectionConfig = () => {
    const { firstLoadSuccess, metaData, diskSpaceMonitoringSwitch } =
      this.state;

    const listHardDiskPartition = getValueByKey({
      data: metaData,
      key: fieldData.listHardDiskPartition.name,
      convert: convertCollection.array,
      defaultValue: [],
    });

    let listData = [];

    forEach(listHardDiskPartition, (o) => {
      listData.push(
        {
          span: 1,
          label: fieldDataHardDiskPartition.partitionName.label,
          value: getValueByKey({
            data: o,
            key: fieldDataHardDiskPartition.partitionName.name,
          }),
        },
        {
          span: 1,
          label: fieldDataHardDiskPartition.totalSpace.label,
          value: getValueByKey({
            data: o,
            key: fieldDataHardDiskPartition.totalSpace.name,
          }),
        },
        {
          span: 1,
          label: fieldDataHardDiskPartition.useSpace.label,
          value: getValueByKey({
            data: o,
            key: fieldDataHardDiskPartition.useSpace.name,
          }),
        },
        {
          span: 1,
          label: fieldDataHardDiskPartition.freeSpace.label,
          value: getValueByKey({
            data: o,
            key: fieldDataHardDiskPartition.freeSpace.name,
          }),
        },
      );
    });

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '磁盘信息',
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
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: listData,
              props: {
                size: 'small',
                bordered: true,
                column: 4,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '102px',
                },
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '磁盘空间监控配置',
          },
          hasExtra: true,
          extra: {
            affix: false,
            list: [
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                disabled: !firstLoadSuccess,
                hidden:
                  diskSpaceMonitoringSwitch === whetherNumber.no ||
                  !checkHasAuthority(
                    accessWayCollection.currentManagementInfrastructure
                      .testDiskSpaceMonitoringConfig.permission,
                  ),
                icon: iconBuilder.swap(),
                text: '测试配置',
                handleClick: () => {
                  this.testDiskSpaceMonitoringConfig();
                },
              },
            ],
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringSwitch,
              editMode: keyValueEditModeCollection.whether,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              inputIcon: iconBuilder.swap(),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringDriveLetter,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '磁盘空间预警配置',
          },
          hidden: diskSpaceMonitoringSwitch === whetherNumber.no,
          hasExtra: true,
          extra: {
            affix: false,
            list: [
              {
                buildType: cardConfig.extraBuildType.iconInfo,
                icon: iconBuilder.infoCircle(),
                text: '每次检测磁盘空间时，磁盘可用空间达到预警值的时候进行发送',
                textStyle: {
                  color: '#666',
                },
                iconStyle: {
                  color: '#666',
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                disabled: !firstLoadSuccess,
                hidden:
                  diskSpaceMonitoringSwitch === whetherNumber.no ||
                  !checkHasAuthority(
                    accessWayCollection.currentManagementInfrastructure
                      .testDiskSpaceMonitoringAlarmEmail.permission,
                  ),
                icon: iconBuilder.swap(),
                text: '测试预警邮件发送',
                handleClick: () => {
                  this.testDiskSpaceMonitoringAlarmEmail();
                },
              },
            ],
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringAlarmThreshold,
              editMode: keyValueEditModeCollection.number,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '预警短信',
              hidden: diskSpaceMonitoringSwitch === whetherNumber.no,
            },
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.diskSpaceMonitoringAlarmSmsNotificationTemplate,
              editMode: keyValueEditModeCollection.multiLineString,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringAlarmPhone,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              text: '预警邮箱',
              hidden: diskSpaceMonitoringSwitch === whetherNumber.no,
            },
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.diskSpaceMonitoringAlarmEmailNotificationTemplate,
              editMode: keyValueEditModeCollection.multiLineString,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringAlarmFromEmailName,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringAlarmFromEmailAddress,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringAlarmToEmailName,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringAlarmToEmailAddress,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringAlarmEmailSmtpServerHost,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringAlarmEmailSmtpServerPort,
              editMode: keyValueEditModeCollection.number,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.diskSpaceMonitoringAlarmEmailSmtpServerUseSsl,
              editMode: keyValueEditModeCollection.whether,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              whetherYesAlias: '使用',
              whetherNoAlias: '不使用',
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.diskSpaceMonitoringAlarmEmailSmtpServerAccount,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.diskSpaceMonitoringAlarmEmailSmtpServerPassword,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '磁盘空间检测配置',
          },
          hidden: diskSpaceMonitoringSwitch === whetherNumber.no,
          hasExtra: true,
          extra: {
            affix: false,
            list: [
              {
                buildType: cardConfig.extraBuildType.iconInfo,
                icon: iconBuilder.infoCircle(),
                text: '每次检测磁盘空间的时候进行发送',
                textStyle: {
                  color: '#666',
                },
                iconStyle: {
                  color: '#666',
                },
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.generalExtraButton,
                disabled: !firstLoadSuccess,
                hidden:
                  diskSpaceMonitoringSwitch === whetherNumber.no ||
                  !checkHasAuthority(
                    accessWayCollection.currentManagementInfrastructure
                      .testDiskSpaceMonitoringDetectionEmail.permission,
                  ),
                icon: iconBuilder.swap(),
                text: '测试检测邮件发送',
                handleClick: () => {
                  this.testDiskSpaceMonitoringDetectionEmail();
                },
              },
            ],
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.diskSpaceMonitoringDetectionEmailNotificationTemplate,
              editMode: keyValueEditModeCollection.multiLineString,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringDetectionFromEmailName,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringDetectionFromEmailAddress,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringDetectionToEmailName,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.diskSpaceMonitoringDetectionToEmailAddress,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.diskSpaceMonitoringDetectionEmailSmtpServerHost,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.diskSpaceMonitoringDetectionEmailSmtpServerPort,
              editMode: keyValueEditModeCollection.number,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.diskSpaceMonitoringDetectionEmailSmtpServerUseSsl,
              editMode: keyValueEditModeCollection.whether,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              whetherYesAlias: '使用',
              whetherNoAlias: '不使用',
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.diskSpaceMonitoringDetectionEmailSmtpServerAccount,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.diskSpaceMonitoringDetectionEmailSmtpServerPassword,
              editMode: keyValueEditModeCollection.string,
              hidden:
                diskSpaceMonitoringSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.currentManagementInfrastructure
                    .updateKeyValueInfo.permission,
                ),
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

export default DiskSpaceMonitoringInfo;
