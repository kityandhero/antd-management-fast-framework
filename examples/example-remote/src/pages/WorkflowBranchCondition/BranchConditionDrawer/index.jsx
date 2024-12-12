import { Collapse, Divider, Empty, Space, Table } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { extraBuildType } from 'antd-management-fast-common';
import {
  buildButton,
  buildColumnList,
  buildDropdownButton,
  buildDropdownMenu,
  // buildDropdownButton,
  iconBuilder,
  ScrollFacadeBox,
} from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getFlowBranchConditionItemTargetComparisonModeName,
  getFlowBranchConditionItemTargetSourceModeName,
  refitFlowBranchConditionItemTargetSourceModeList,
} from '../../../customSpecialComponents';
import { AddFormFieldBasicInfoModel } from '../../WorkflowBranchConditionItem/AddFormFieldBasicInfoModel';
import {
  refreshCacheAction as refreshBranchConditionItemCacheAction,
  removeConfirmAction as removeBranchConditionItemConfirmAction,
} from '../../WorkflowBranchConditionItem/Assist/action';
import { fieldData as fieldDataWorkflowBranchConditionItem } from '../../WorkflowBranchConditionItem/Common/data';
import { UpdateBasicInfoModel } from '../../WorkflowBranchConditionItem/UpdateBasicInfoModel';
import { fieldData as fieldDataWorkflowNode } from '../../WorkflowNode/Common/data';
import { AddBasicInfoModel } from '../AddBasicInfoModel';
import { refreshCacheAction, removeConfirmAction } from '../Assist/action';
import { fieldData } from '../Common/data';
import { UpdateBasicInfoModal } from '../UpdateBasicInfoModel';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = 'bcc0fad276c24177920a39bc32a2a1d1';

@connect(
  ({
    workflowNode,
    workflowBranchCondition,
    workflowBranchConditionItem,
    schedulingControl,
  }) => ({
    workflowNode,
    workflowBranchCondition,
    workflowBranchConditionItem,
    schedulingControl,
  }),
)
class BranchConditionDrawer extends BaseVerticalFlexDrawer {
  useFormWrapper = false;

  componentAuthority = accessWayCollection.workflowNode.get.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  static close() {
    switchControlAssist.close(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '工作流节点分支条件设置',
      loadApiPath: 'workflowNode/get',
      workflowNodeId: null,
      currentBranchCondition: null,
      currentBranchConditionItem: null,
      collapseActiveKeys: [],
    };
  }

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldDataWorkflowNode.workflowNodeId.name] = getValueByKey({
      data: externalData,
      key: fieldDataWorkflowNode.workflowNodeId.name,
    });

    return d;
  };

  remove = (r) => {
    removeConfirmAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.refreshData({});
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  removeBranchConditionItem = (r) => {
    removeBranchConditionItemConfirmAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.refreshData({});
      },
    });
  };

  refreshBranchConditionItemCache = (r) => {
    refreshBranchConditionItemCacheAction({
      target: this,
      handleData: r,
    });
  };

  showAddBasicInfoModel = () => {
    AddBasicInfoModel.open();
  };

  afterAddBasicInfoModelClose = ({
    flag,
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
    // eslint-disable-next-line no-unused-vars
    subjoinData,
  }) => {
    if (!flag) {
      return;
    }

    this.refreshData({});
  };

  showUpdateBasicInfoModal = (o) => {
    this.setState(
      {
        currentBranchCondition: o,
      },
      () => {
        UpdateBasicInfoModal.open();
      },
    );
  };

  afterUpdateBasicInfoModalClose = ({
    flag,
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
    // eslint-disable-next-line no-unused-vars
    subjoinData,
  }) => {
    if (!flag) {
      return;
    }

    this.refreshData({});
  };

  showAddFormFieldBasicInfoModel = (o) => {
    this.setState(
      {
        currentBranchCondition: o,
      },
      () => {
        AddFormFieldBasicInfoModel.open();
      },
    );
  };

  afterAddFormFieldBasicInfoModelClose = ({
    flag,
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
    // eslint-disable-next-line no-unused-vars
    subjoinData,
  }) => {
    if (!flag) {
      return;
    }

    this.refreshData({});
  };

  showUpdateBasicInfoModel = (o) => {
    this.setState(
      {
        currentBranchConditionItem: o,
      },
      () => {
        UpdateBasicInfoModel.open();
      },
    );
  };

  afterUpdateBasicInfoModelClose = ({
    flag,
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
    // eslint-disable-next-line no-unused-vars
    subjoinData,
  }) => {
    if (!flag) {
      return;
    }

    this.refreshData({});
  };

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.plusCircle(),
          type: 'primary',
          text: '新增条件',
          handleClick: this.showAddBasicInfoModel,
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '无分支的审批节点无需设置条件',
        },
        {
          text: '点击箭头可以展开折叠内容面板',
        },
        {
          text: '不同条件的执行结果不能相互重叠。',
        },
      ],
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { metaData } = this.state;

    const { listBranchCondition } = {
      listBranchCondition: [],
      ...metaData,
    };

    const items = listBranchCondition.map((o) => {
      const workflowBranchConditionId = getValueByKey({
        data: o,
        key: fieldData.workflowBranchConditionId.name,
        convert: convertCollection.string,
      });

      const name = getValueByKey({
        data: o,
        key: fieldData.name.name,
        convert: convertCollection.string,
      });

      const listWorkflowBranchConditionItem = getValueByKey({
        data: o,
        key: fieldData.listWorkflowBranchConditionItem.name,
        convert: convertCollection.array,
      });

      const judgmentModeNote = getValueByKey({
        data: o,
        key: fieldData.judgmentModeNote.name,
      });

      const label = `【模式: ${judgmentModeNote}】 ${name}`;

      const columns = buildColumnList({
        columnList: [
          {
            dataTarget: fieldDataWorkflowBranchConditionItem.name,
            align: 'left',
            showRichFacade: true,
            emptyValue: '--',
          },
          {
            dataTarget: fieldDataWorkflowBranchConditionItem.targetTitle,
            width: 80,
            showRichFacade: true,
            emptyValue: '--',
          },
          {
            dataTarget:
              fieldDataWorkflowBranchConditionItem.targetComparisonMode,
            width: 180,
            showRichFacade: true,
            emptyValue: '--',
            facadeConfigBuilder: (value) => {
              return {
                color: buildRandomHexColor({
                  seed: value * 2 + 56,
                }),
              };
            },
            formatValue: (value) => {
              return getFlowBranchConditionItemTargetComparisonModeName({
                value: value,
              });
            },
          },
          {
            dataTarget: fieldDataWorkflowBranchConditionItem.targetValueInfo,
            width: 120,
            showRichFacade: true,
            emptyValue: '--',
          },
          {
            dataTarget: fieldDataWorkflowBranchConditionItem.targetSourceMode,
            width: 100,
            showRichFacade: true,
            emptyValue: '--',
            facadeConfigBuilder: (value) => {
              return {
                color: buildRandomHexColor({
                  seed: value * 2 + 21,
                }),
              };
            },
            formatValue: (value) => {
              return getFlowBranchConditionItemTargetSourceModeName({
                value: value,
              });
            },
          },
          {
            dataTarget: fieldDataWorkflowBranchConditionItem.customOperate,
            width: 123,
            // eslint-disable-next-line no-unused-vars
            render: (value, record, index) => {
              return buildDropdownButton({
                size: 'small',
                text: '编辑',
                icon: iconBuilder.edit(),
                disabled: !checkHasAuthority(
                  accessWayCollection.workflowBranchConditionItem
                    .updateBasicInfo.permission,
                ),
                handleButtonClick: ({ handleData }) => {
                  this.showUpdateBasicInfoModel(handleData);
                },
                handleData: record,
                handleMenuClick: ({ key, handleData }) => {
                  switch (key) {
                    case 'remove': {
                      this.removeBranchConditionItem(handleData);
                      break;
                    }

                    case 'refreshCache': {
                      this.refreshBranchConditionItemCache(handleData);
                      break;
                    }

                    default: {
                      break;
                    }
                  }
                },
                items: [
                  {
                    key: 'remove',
                    icon: iconBuilder.delete(),
                    text: '删除条件项',
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflowBranchConditionItem.remove
                        .permission,
                    ),
                  },
                  {
                    key: 'refreshCache',
                    withDivider: true,
                    uponDivider: true,
                    icon: iconBuilder.delete(),
                    text: '刷新缓存',
                    hidden: !checkHasAuthority(
                      accessWayCollection.workflowBranchConditionItem
                        .refreshCache.permission,
                    ),
                  },
                ],
              });
            },
          },
        ],
        attachedTargetName: this.constructor.name,
      });

      return {
        key: workflowBranchConditionId,
        label: label,
        children: (
          <div>
            <Table
              columns={columns}
              size="small"
              dataSource={listWorkflowBranchConditionItem}
              pagination={{
                hideOnSinglePage: true,
              }}
            />
          </div>
        ),
        extra: (
          <Space
            split={
              <Divider
                type="vertical"
                style={{
                  marginLeft: '1px',
                  marginRight: '1px',
                }}
              />
            }
          >
            {buildButton({
              text: '编辑信息',
              size: 'small',
              type: 'link',
              icon: iconBuilder.edit(),
              style: { border: '0', height: '22px' },
              hidden: !checkHasAuthority(
                accessWayCollection.workflowBranchCondition.updateBasicInfo
                  .permission,
              ),
              handleData: o,
              handleClick: ({ handleData }) => {
                this.showUpdateBasicInfoModal(handleData);
              },
            })}

            {buildDropdownMenu({
              label: '增加判断',
              placement: 'bottom',
              icon: iconBuilder.plusCircle(),
              size: 'middle',
              type: 'link',
              list: refitFlowBranchConditionItemTargetSourceModeList({
                withUnlimited: false,
              }),
              extraStyle: { paddingLeft: '4px' },
              extra: iconBuilder.down({
                style: {
                  fontSize: '12px',
                },
              }),
              hidden:
                !checkHasAuthority(
                  accessWayCollection.workflowBranchConditionItem
                    .addFormFieldBasicInfo.permission,
                ) &&
                !checkHasAuthority(
                  accessWayCollection.workflowBranchConditionItem
                    .addRemoteCallBasicInfo.permission,
                ),
              innerProps: {
                border: '0',
                height: '22px',
                style: {
                  padding: '0',
                  height: '22px',
                },
              },
              onClick: ({ key }) => {
                switch (key) {
                  case 'formField': {
                    this.showAddFormFieldBasicInfoModel(o);
                    break;
                  }

                  default: {
                    break;
                  }
                }
              },
            })}

            {buildDropdownMenu({
              label: '更多',
              placement: 'bottomRight',
              size: 'middle',
              type: 'link',
              list: [
                {
                  flag: 'refreshCache',
                  key: 'refreshCache',
                  name: '刷新缓存',
                  icon: iconBuilder.reload(),
                },
                {
                  flag: 'remove',
                  key: 'remove',
                  name: '移除条件',
                  icon: iconBuilder.delete(),
                },
              ],
              extraStyle: { paddingLeft: '4px' },
              extra: iconBuilder.down({
                style: {
                  fontSize: '12px',
                },
              }),
              hidden: !checkHasAuthority(
                accessWayCollection.workflowBranchConditionItem.refreshCache
                  .permission,
              ),
              innerProps: {
                border: '0',
                height: '22px',
                style: {
                  padding: '0',
                  height: '22px',
                },
              },
              onClick: ({ key }) => {
                switch (key) {
                  case 'refreshCache': {
                    this.refreshCache(o);
                    break;
                  }

                  case 'remove': {
                    this.remove(o);
                    break;
                  }

                  default: {
                    break;
                  }
                }
              },
            })}
          </Space>
        ),
        style: {
          marginBottom: 12,
          background: '#00000005',
          borderRadius: '8px',
          borderBottom: '1px solid #cce',
        },
      };
    });

    return (
      <ScrollFacadeBox
        style={{
          height: '100%',
          width: '100%',
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            paddingTop: '16px',
            paddingBottom: '16px',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          {items.length === 0 ? (
            <Empty
              style={{ marginTop: '20px' }}
              description="暂无已录入条件，请点击按钮增加新条件"
            />
          ) : (
            <Collapse
              collapsible="icon"
              size="small"
              bordered={false}
              style={{
                background: '#fff',
              }}
              expandIcon={({ isActive }) => {
                return iconBuilder.caretRight({ rotate: isActive ? 90 : 0 });
              }}
              expandIconPosition={'start'}
              items={items}
            />
          )}
        </div>
      </ScrollFacadeBox>
    );
  };

  renderPresetOther = () => {
    const { metaData, currentBranchCondition, currentBranchConditionItem } =
      this.state;

    return (
      <>
        <AddBasicInfoModel
          externalData={metaData}
          afterClose={this.afterAddBasicInfoModelClose}
        />

        <UpdateBasicInfoModal
          externalData={currentBranchCondition}
          afterClose={this.afterUpdateBasicInfoModalClose}
        />

        <AddFormFieldBasicInfoModel
          externalData={currentBranchCondition}
          afterClose={this.afterAddFormFieldBasicInfoModelClose}
        />

        <UpdateBasicInfoModel
          externalData={currentBranchConditionItem}
          afterClose={this.afterUpdateBasicInfoModelClose}
        />
      </>
    );
  };
}

export { BranchConditionDrawer };
