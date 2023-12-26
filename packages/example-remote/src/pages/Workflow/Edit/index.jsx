import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkInCollection,
  convertCollection,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import {
  extraBuildType,
  getDerivedStateFromPropertiesForUrlParameters,
  tabBarCollection,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import {
  accessWayCollection,
  flowEffectiveRangeCollection,
  flowStatusCollection,
} from '../../../customConfig';
import {
  DataTabContainerSupplement,
  getBusinessModeName,
  getChannelName,
  getFlowEffectiveRangeName,
  getFlowScopeName,
  getFlowStatusName,
} from '../../../customSpecialComponents';
import { PageListDrawer as WorkflowLinePageListDrawer } from '../../WorkflowLine/PageListDrawer';
import { PageListDrawer as WorkflowNodePageListDrawer } from '../../WorkflowNode/PageListDrawer';
import { PageListDrawer as WorkflowNodeApproverPageListDrawer } from '../../WorkflowNodeApprover/PageListDrawer';
import {
  refreshCacheAction,
  setDisableAction,
  setEnableAction,
} from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData } from '../Common/data';
import { FlowDisplayDrawer } from '../FlowDisplayDrawer';
import { UpdateChannelModal } from '../UpdateChannelModal';
import { UpdateMultibranchModal } from '../UpdateMultibranchModal';
import { UpdateMultiEndModal } from '../UpdateMultiEndModal';

@connect(({ workflow, schedulingControl }) => ({
  workflow,
  schedulingControl,
}))
class Detail extends DataTabContainerSupplement {
  componentAuthority = accessWayCollection.workflow.get.permission;

  tabList = [
    {
      key: 'basicInfo',
      hidden: !checkHasAuthority(accessWayCollection.workflow.get.permission),
      tab: '基本信息',
    },
    {
      key: 'fromInfo',
      hidden: !checkHasAuthority(accessWayCollection.workflow.get.permission),
      tab: '表单设计',
    },
    {
      key: 'designInfo',
      hidden: !checkHasAuthority(accessWayCollection.workflow.get.permission),
      tab: '流程设计',
    },
    {
      key: 'debugCaseInfo',
      hidden: !checkHasAuthority(
        accessWayCollection.workflowDebugCase.getByWorkflow.permission,
      ),
      tab: '流程测试',
    },
    {
      key: 'workflowRangeEffectiveSubsidiaryRelation/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.workflowRangeEffectiveSubsidiaryRelation.pageList
          .permission,
      ),
      tab: '适用的公司',
    },
    {
      key: 'workflowRangeEffectiveExternalDepartmentRelation/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.workflowRangeEffectiveExternalDepartmentRelation
          .pageList.permission,
      ),
      tab: '适用的外部部门',
    },
    {
      key: 'operateLog/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.workflow.pageListOperateLog.permission,
      ),
      tab: '操作日志',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: 'workflow/get',
      backPath: `/flow/workflow/pageList/key`,
      workflowId: null,
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

  checkNeedUpdate = (preProperties, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProperties, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { workflowId } = this.state;

    d.workflowId = workflowId;

    return d;
  };

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    this.setState({
      pageTitle: getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      }),
    });
  };

  adjustTabListAvailable = (tabListAvailable) => {
    const { metaData } = this.state;

    const result = [];

    if (
      checkHasAuthority(accessWayCollection.workflow.get.permission) &&
      metaData != null
    ) {
      const scope = getValueByKey({
        data: metaData,
        key: fieldData.effectiveRange.name,
        convert: convertCollection.number,
      });

      for (const data of Object.values(tabListAvailable)) {
        const o = data;

        if (
          checkInCollection(
            [
              'workflowRangeEffectiveSubsidiaryRelation/pageList',
              'workflowRangeEffectiveExternalDepartmentRelation/pageList',
            ],
            o.key,
          )
        ) {
          if (scope === flowEffectiveRangeCollection.rangeEffective) {
            o.show = true;

            result.push(o);
          }
        } else {
          result.push(o);
        }
      }
    }

    return result;
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      default: {
        break;
      }
    }
  };

  setEnable = (r) => {
    setEnableAction({
      target: this,
      handleData: r,
      // eslint-disable-next-line no-unused-vars
      successCallback: ({ target, handleData, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        target.setState({ metaData });
      },
    });
  };

  setDisable = (r) => {
    setDisableAction({
      target: this,
      handleData: r,
      // eslint-disable-next-line no-unused-vars
      successCallback: ({ target, handleData, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        target.setState({ metaData });
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showUpdateMultibranchModal = () => {
    UpdateMultibranchModal.open();
  };

  afterUpdateMultibranchModalOk = () => {
    this.reloadData({});
  };

  showUpdateMultiEndModal = () => {
    UpdateMultiEndModal.open();
  };

  afterUpdateMultiEndModalOk = () => {
    this.reloadData({});
  };

  showUpdateChannelModal = () => {
    UpdateChannelModal.open();
  };

  afterUpdateChannelModalOk = () => {
    this.reloadData({});
  };

  showFlowDisplayDrawer = () => {
    FlowDisplayDrawer.open();
  };

  showWorkflowNodePageListDrawer = () => {
    WorkflowNodePageListDrawer.open();
  };

  showWorkflowNodeApproverPageListDrawer = () => {
    WorkflowNodeApproverPageListDrawer.open();
  };

  showWorkflowLinePageListDrawer = () => {
    WorkflowLinePageListDrawer.open();
  };

  establishPageHeaderTitlePrefix = () => {
    return '流程';
  };

  establishExtraActionConfig = () => {
    const { metaData } = this.state;

    if (metaData == null) {
      return null;
    }

    const that = this;

    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          type: 'default',
          icon: iconBuilder.swap(),
          text: '设置数据通道',
          handleData: metaData,
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.setChannel.permission,
          ),
          handleClick: ({ handleData }) => {
            that.showUpdateChannelModal(handleData);
          },
        },
        {
          buildType: extraBuildType.divider,
        },
      ],
    };
  };

  establishTabBarExtraContentRightConfig = () => {
    return [
      {
        buildType: tabBarCollection.extraBuildType.button,
        icon: iconBuilder.unorderedList(),
        text: '节点列表',
        size: 'small',
        handleClick: () => {
          this.showWorkflowNodePageListDrawer();
        },
      },
      {
        buildType: tabBarCollection.extraBuildType.button,
        icon: iconBuilder.unorderedList(),
        text: '节点审批人列表',
        size: 'small',
        handleClick: () => {
          this.showWorkflowNodeApproverPageListDrawer();
        },
      },
      {
        buildType: tabBarCollection.extraBuildType.button,
        icon: iconBuilder.unorderedList(),
        text: '线条列表',
        size: 'small',
        handleClick: () => {
          this.showWorkflowLinePageListDrawer();
        },
      },
      {
        buildType: tabBarCollection.extraBuildType.button,
        icon: iconBuilder.fork(),
        text: '流程图例',
        size: 'small',
        handleClick: () => {
          this.showFlowDisplayDrawer();
        },
      },
    ];
  };

  establishExtraActionGroupConfig = () => {
    const { metaData } = this.state;

    if (metaData == null) {
      return null;
    }

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const that = this;

    return {
      buttons: [
        {
          key: 'setEnable',
          text: '设为启用',
          icon: iconBuilder.playCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setEnable(handleData);
          },
          disabled: status === flowStatusCollection.enable,
          confirm: true,
          title: '即将设为启用，确定吗？',
          handleData: metaData,
        },
        {
          key: 'setDisable',
          text: '设为禁用',
          icon: iconBuilder.pauseCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setDisable(handleData);
          },
          disabled: status === flowStatusCollection.disable,
          confirm: true,
          title: '即将设为禁用，确定吗？',
          handleData: metaData,
        },
      ],
    };
  };

  establishExtraActionEllipsisConfig = () => {
    const { metaData } = this.state;

    if ((metaData || null) == null) {
      return null;
    }

    const that = this;

    return {
      disabled: this.checkInProgress(),
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'openMultibranch': {
            that.showUpdateMultibranchModal(handleData);
            break;
          }

          case 'openMultiEnd': {
            that.showUpdateMultiEndModal(handleData);
            break;
          }

          case 'refreshCache': {
            that.refreshCache(handleData);
            break;
          }

          default: {
            break;
          }
        }
      },
      handleData: metaData,
      items: [
        {
          key: 'openMultibranch',
          icon: iconBuilder.branches(),
          text: '启用多分支模式',
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.openMultibranch.permission,
          ),
          disabled:
            getValueByKey({
              data: metaData,
              key: fieldData.whetherAllowMultibranch.name,
              convert: convertCollection.number,
            }) === whetherNumber.yes,
        },
        {
          key: 'openMultiEnd',
          icon: iconBuilder.edit(),
          text: '启用多终点模式',
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.openMultiEnd.permission,
          ),
          disabled:
            getValueByKey({
              data: metaData,
              key: fieldData.whetherAllowMultiEnd.name,
              convert: convertCollection.number,
            }) === whetherNumber.yes,
        },
        {
          withDivider: true,
          uponDivider: true,
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.refreshCache.permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  establishPageHeaderExtraContentConfig = () => {
    const { metaData } = this.state;

    return {
      textLabel: '当前状态',
      text: getFlowStatusName({
        value: getValueByKey({
          data: metaData,
          key: fieldData.status.name,
          convert: convertCollection.number,
        }),
      }),
      timeLabel: fieldData.createTime.label,
      time: getValueByKey({
        data: metaData,
        key: fieldData.createTime.name,
        convert: convertCollection.datetime,
      }),
    };
  };

  establishPageHeaderContentGridConfig = () => {
    const { metaData } = this.state;

    return [
      {
        label: fieldData.workflowId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.workflowId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.name.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.name.name,
        }),
      },
      {
        label: fieldData.scope.label,
        value: getFlowScopeName({
          value: getValueByKey({
            data: metaData,
            key: fieldData.scope.name,
            convert: convertCollection.number,
          }),
          defaultValue: '暂未设置',
        }),
      },
      {
        label: fieldData.businessMode.label,
        value: getBusinessModeName({
          value: getValueByKey({
            data: metaData,
            key: fieldData.businessMode.name,
            convert: convertCollection.number,
          }),
          defaultValue: '暂未设置',
        }),
      },
      {
        label: fieldData.effectiveRange.label,
        value: getFlowEffectiveRangeName({
          value: getValueByKey({
            data: metaData,
            key: fieldData.effectiveRange.name,
            convert: convertCollection.number,
          }),
          defaultValue: '暂未设置',
        }),
      },
      {
        label: fieldData.channel.label,
        value: getChannelName({
          value: getValueByKey({
            data: metaData,
            key: fieldData.channel.name,
            convert: convertCollection.string,
          }),
          defaultValue: '暂未设置',
        }),
      },
      {
        label: fieldData.whetherAllowMultibranchNote.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.whetherAllowMultibranchNote.name,
        }),
      },
      {
        label: fieldData.whetherAllowMultiEndNote.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.whetherAllowMultiEndNote.name,
        }),
      },
    ];
  };

  renderPresetOther = () => {
    const { workflowId } = this.state;

    return (
      <>
        <UpdateMultibranchModal
          externalData={{ workflowId }}
          afterOK={() => {
            this.afterUpdateMultibranchModalOk();
          }}
        />

        <UpdateMultiEndModal
          externalData={{ workflowId }}
          afterOK={() => {
            this.afterUpdateMultiEndModalOk();
          }}
        />

        <UpdateChannelModal
          externalData={{ workflowId }}
          afterOK={() => {
            this.afterUpdateChannelModalOk();
          }}
        />

        <FlowDisplayDrawer maskClosable externalData={{ workflowId }} />

        <WorkflowNodePageListDrawer externalData={{ workflowId }} />

        <WorkflowLinePageListDrawer externalData={{ workflowId }} />

        <WorkflowNodeApproverPageListDrawer externalData={{ workflowId }} />
      </>
    );
  };
}

export default Detail;
