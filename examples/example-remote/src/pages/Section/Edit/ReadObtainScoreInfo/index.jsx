import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  whetherNumber,
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
import { buildInputDisplay, buildInputItem } from '../../../../utils';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';
import { UpdateKeyValueInfoModal } from '../../UpdateKeyValueInfoModal';

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class ReadObtainScoreInfo extends TabPageBase {
  reloadHeaderOnSubmitSuccess = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'section/get',
      submitApiPath: 'section/setReadSectionObtainScore',
      obtainScoreByReadSwitch: 0,
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
            text: '积分全局设置',
          },
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.iconInfo,
                icon: iconBuilder.infoCircle(),
                text: '全局信息仅为显示!',
              },
            ],
          },
          items: [
            buildInputDisplay({
              handleData: metaData,
              fieldData: fieldData.obtainScoreByReadSwitch,
              editMode: keyValueEditModeCollection.number,
              value: getValueByKey({
                data: metaData,
                key: fieldData.obtainScoreByReadSwitch.name,
                convert: convertCollection.number,
                formatBuilder: (v) => {
                  return v === whetherNumber.yes ? '开启' : '关闭';
                },
              }),
            }),
            buildInputDisplay({
              handleData: metaData,
              fieldData: fieldData.obtainScoreWhenRead,
              editMode: keyValueEditModeCollection.number,
              hidden: obtainScoreByReadSwitch === whetherNumber.no,
              value: getValueByKey({
                data: metaData,
                key: fieldData.obtainScoreWhenRead.name,
                convert: convertCollection.string,
              }),
            }),
            buildInputDisplay({
              handleData: metaData,
              fieldData: fieldData.obtainFromReadDailyLimit,
              editMode: keyValueEditModeCollection.number,
              hidden: obtainScoreByReadSwitch === whetherNumber.no,
              value: getValueByKey({
                data: metaData,
                key: fieldData.obtainFromReadDailyLimit.name,
                convert: convertCollection.string,
              }),
            }),
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '阅读栏目获取积分特别设置',
          },
          hidden: obtainScoreByReadSwitch === whetherNumber.no,
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.obtainScoreWhenReadSection,
              editMode: keyValueEditModeCollection.number,
              hidden:
                obtainScoreByReadSwitch === whetherNumber.no ||
                !checkHasAuthority(
                  accessWayCollection.section.updateKeyValueInfo.permission,
                ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.obtainScoreWhenReadSection.name,
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
