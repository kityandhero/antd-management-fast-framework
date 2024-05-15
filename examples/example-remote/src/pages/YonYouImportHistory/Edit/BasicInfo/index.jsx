import { Alert, Table } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  showSimpleSuccessNotification,
  toString,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder, QueueBox } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { splitToGroup } from '../../../../utils';
import {
  importAction,
  testExistAction,
} from '../../../UserYonYouCorrelation/Assist/action';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { buildColumn, buildImportListData } from '../../Assist/tools';
import { fieldData, fieldDataMapConfig } from '../../Common/data';
import { SetMapConfigModal } from '../../SetMapConfigModal';
import { TabPageBase } from '../../TabPageBase';

let nonexistentPhoneCount = 0;
let existentPhoneCount = 0;
let nonexistentPhoneList = [];
let importFailList = [];

@connect(
  ({ yonYouImportHistory, userYonYouCorrelation, schedulingControl }) => ({
    yonYouImportHistory,
    userYonYouCorrelation,
    schedulingControl,
  }),
)
class BasicInfo extends TabPageBase {
  componentAuthority = accessWayCollection.yonYouImportHistory.get.permission;

  importIndex = 0;

  batchTestIndex = 0;

  batchTestCount = 20;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'yonYouImportHistory/get',
      yonYouImportHistoryId: null,
      nonexistentPhoneCount: 0,
      existentPhoneCount: 0,
      nonexistentPhoneList: [],
      importFailList: [],
      testResultVisible: false,
      importResultVisible: false,
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

  importData = (listData) => {
    importAction({
      target: this,
      handleData: listData[this.importIndex],
      successCallback: () => {},
      failCallback: ({ params }) => {
        importFailList.push(params);
      },
      completeProcess: ({ target }) => {
        target.importIndex += 1;

        if (listData.length < target.importIndex + 1) {
          if (importFailList.length > 0) {
            target.setState({
              importResultVisible: true,
              importFailList: [...importFailList],
            });
          } else {
            showSimpleSuccessNotification('全部数据导入成功');
          }

          return;
        }

        target.importData(listData);
      },
    });
  };

  importList = () => {
    const { metaData } = this.state;

    this.setState({
      testResultVisible: false,
      importResultVisible: false,
    });

    if (metaData == null) {
      return;
    }

    let list = getValueByKey({
      data: metaData,
      key: fieldData.execlListData.name,
      convert: convertCollection.array,
    });

    const mapConfig = metaData.mapConfig;

    let listData = buildImportListData(list, mapConfig);

    this.importIndex = 0;

    importFailList = [];

    this.importData(listData);
  };

  testBatch = (listData) => {
    if (!isArray(listData) || isEmptyArray(listData)) {
      return;
    }

    testExistAction({
      target: this,
      handleData: {
        phones: listData[this.batchTestIndex].join(','),
      },
      successCallback: ({ remoteData }) => {
        const {
          nonexistentPhoneCount: nonexistentPhoneCountSource,
          existencePhoneCount: existencePhoneCountSource,
          nonexistentPhoneList: nonexistentPhoneListSource,
        } = {
          nonexistentPhoneCount: 0,
          existencePhoneCount: 0,
          nonexistentPhoneList: [],
          ...remoteData,
        };

        nonexistentPhoneCount += nonexistentPhoneCountSource;
        existentPhoneCount += existencePhoneCountSource;
        nonexistentPhoneList = [
          ...nonexistentPhoneList,
          ...nonexistentPhoneListSource,
        ];
      },
      completeProcess: ({ target }) => {
        target.batchTestIndex += 1;

        if (listData.length < target.batchTestIndex + 1) {
          target.setState({
            testResultVisible: true,
            nonexistentPhoneCount,
            existentPhoneCount,
            nonexistentPhoneList,
          });

          return;
        }

        target.testBatch(listData);
      },
    });
  };

  testExist = () => {
    const { metaData } = this.state;

    this.setState({
      testResultVisible: false,
      importResultVisible: false,
    });

    if (metaData == null) {
      return;
    }

    let list = getValueByKey({
      data: metaData,
      key: fieldData.execlListData.name,
      convert: convertCollection.array,
    });

    const mapConfig = metaData.mapConfig;

    let listData = buildImportListData(list, mapConfig).map((o) => {
      return getValueByKey({
        data: o,
        key: fieldDataMapConfig.phone.name,
      });
    });

    let listGroup = splitToGroup(listData, this.batchTestCount);

    this.batchTestIndex = 0;

    nonexistentPhoneCount = 0;
    existentPhoneCount = 0;
    nonexistentPhoneList = [];

    this.testBatch(listGroup);
  };

  showSetMapConfigModal = () => {
    SetMapConfigModal.open();
  };

  afterSetMapConfigModalClose = () => {
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
    const {
      firstLoadSuccess,
      metaData,
      testResultVisible,
      existentPhoneCount,
      nonexistentPhoneCount,
      importResultVisible,
      importFailList,
    } = this.state;

    let list = getValueByKey({
      data: metaData,
      key: fieldData.execlListData.name,
      convert: convertCollection.array,
    });

    let columns = [];

    if (list.length > 0) {
      const first = list[0];

      const keyCount = Object.keys(first).length;

      columns = [...buildColumn(keyCount)];

      list = list.map((o, index) => {
        return {
          no: index + 1,
          key: toString(index + 1),
          ...o,
        };
      });
    }

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
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: fieldData.originalName.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.originalName.name,
                  }),
                },
                {
                  label: fieldData.createTime.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.createTime.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.filePath.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.filePath.name,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.localPath.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.localPath.name,
                  }),
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 2,
                labelStyle: {
                  width: '90px',
                },
                emptyValue: '暂无',
                ellipsis: false,
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '数据预览',
          },
          hasExtra: true,
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.generalButton,
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.yonYouImportHistory.setMapConfig
                    .permission,
                ),
                icon: iconBuilder.edit(),
                text: '编辑映射',
                handleClick: () => {
                  this.showSetMapConfigModal();
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalButton,
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.userYonYouCorrelation.testExist
                    .permission,
                ),
                icon: iconBuilder.read(),
                text: '测试数据存在',
                handleClick: () => {
                  this.testExist();
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalButton,
                disabled: !firstLoadSuccess,
                hidden: !checkHasAuthority(
                  accessWayCollection.yonYouImportHistory.setMapConfig
                    .permission,
                ),
                icon: iconBuilder.edit(),
                text: '立即导入',
                handleClick: () => {
                  this.importList();
                },
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <>
                  <QueueBox show={testResultVisible}>
                    <Alert
                      message={`测试结果: 电话号码已存在数量 ${existentPhoneCount} 个, 不存在数量 ${nonexistentPhoneCount} 个.`}
                      type="warning"
                      showIcon
                      closable
                      style={{ marginBottom: '16px' }}
                    />
                  </QueueBox>

                  <QueueBox
                    show={testResultVisible && nonexistentPhoneList.length > 0}
                  >
                    <Alert
                      message={`不存在的手机号码集合: ${nonexistentPhoneList.join(
                        ', ',
                      )}.`}
                      type="warning"
                      showIcon
                      closable
                      style={{ marginBottom: '16px' }}
                    />
                  </QueueBox>

                  <QueueBox show={importResultVisible}>
                    <Alert
                      message={`导入失败电话号码信息:  ${importFailList
                        .map((o) => {
                          return getValueByKey({
                            data: o,
                            key: fieldDataMapConfig.phone.name,
                          });
                        })
                        .join(',')} .`}
                      type="warning"
                      showIcon
                      closable
                      style={{ marginBottom: '16px' }}
                    />
                  </QueueBox>

                  <Table
                    columns={columns}
                    dataSource={list}
                    scroll={{ x: 1500, y: 300 }}
                    pagination={{
                      hideOnSinglePage: true,
                    }}
                  />
                </>
              ),
            },
          ],
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { metaData } = this.state;

    return (
      <>
        <SetMapConfigModal
          externalData={metaData}
          afterClose={this.afterSetMapConfigModalClose}
        />
      </>
    );
  };
}

export default BasicInfo;
