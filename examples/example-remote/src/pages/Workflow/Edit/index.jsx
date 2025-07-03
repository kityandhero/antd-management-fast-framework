import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkInCollection,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
  whetherNumber,
} from 'easy-soft-utility';

import {
  dropdownExpandItemType,
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
import { PageListDrawer as WorkflowBranchConditionPageListDrawer } from '../../WorkflowBranchCondition/PageListDrawer';
import { PageListDrawer as WorkflowBranchConditionItemPageListDrawer } from '../../WorkflowBranchConditionItem/PageListDrawer';
import { WorkflowCasePageListUnderwayDrawer } from '../../WorkflowCase/PageListUnderwayDrawer';
import { WorkflowDebugCasePageListUnderwayDrawer } from '../../WorkflowDebugCase/PageListUnderwayDrawer';
import { PageListDrawer as WorkflowLinePageListDrawer } from '../../WorkflowLine/PageListDrawer';
import { PageListDrawer as WorkflowNodePageListDrawer } from '../../WorkflowNode/PageListDrawer';
import { PageListDrawer as WorkflowNodeApproverPageListDrawer } from '../../WorkflowNodeApprover/PageListDrawer';
import {
  refreshCacheAction,
  setDisableAction,
  setEnableAction,
  toggleApplicantSignSwitchAction,
  toggleAttentionSignSwitchAction,
  toggleAvailableOnMobileSwitchAction,
} from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData } from '../Common/data';
import { FlowDisplayDrawer } from '../FlowDisplayDrawer';
import { SetCaseNameTemplateDrawer } from '../SetCaseNameTemplateDrawer';
import { SetDefaultApplicantStatementDrawer } from '../SetDefaultApplicantStatementDrawer';
import { SetDefaultAttentionStatementDrawer } from '../SetDefaultAttentionStatementDrawer';
import { SetDefaultAttentionUserDrawer } from '../SetDefaultAttentionUserDrawer';
import { SetSmsTemplateDrawer } from '../SetSmsTemplateDrawer';
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
            o.hidden = false;

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
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  toggleApplicantSignSwitch = (r) => {
    toggleApplicantSignSwitchAction({
      target: this,
      handleData: r,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.applicantSignSwitch.name] = getValueByKey({
          data: remoteData,
          key: fieldData.applicantSignSwitch.name,
        });

        metaData[fieldData.applicantSignSwitchNote.name] = getValueByKey({
          data: remoteData,
          key: fieldData.applicantSignSwitchNote.name,
        });

        target.setState({ metaData });
      },
    });
  };

  toggleAttentionSignSwitch = (r) => {
    toggleAttentionSignSwitchAction({
      target: this,
      handleData: r,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.attentionSignSwitch.name] = getValueByKey({
          data: remoteData,
          key: fieldData.attentionSignSwitch.name,
        });

        metaData[fieldData.attentionSignSwitchNote.name] = getValueByKey({
          data: remoteData,
          key: fieldData.attentionSignSwitchNote.name,
        });

        target.setState({ metaData });
      },
    });
  };

  /**
   * 切换移动端是否可以发起审批
   * @param {*} o 当前数据体
   */
  toggleAvailableOnMobileSwitch = (o) => {
    toggleAvailableOnMobileSwitchAction({
      target: this,
      handleData: o,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.availableOnMobileSwitch.name] = getValueByKey({
          data: remoteData,
          key: fieldData.availableOnMobileSwitch.name,
        });

        metaData[fieldData.attentionSignSwitchNote.name] = getValueByKey({
          data: remoteData,
          key: fieldData.attentionSignSwitchNote.name,
        });

        target.setState({ metaData });
      },
    });
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

  showSetCaseNameTemplateDrawer = () => {
    SetCaseNameTemplateDrawer.open();
  };

  afterSetCaseNameTemplateDrawerOk = () => {
    this.reloadData({});
  };

  showSetSmsTemplateDrawer = () => {
    SetSmsTemplateDrawer.open();
  };

  afterSetSmsTemplateDrawerOk = () => {
    this.reloadData({});
  };

  showSetDefaultApplicantStatementDrawer = () => {
    SetDefaultApplicantStatementDrawer.open();
  };

  afterSetDefaultApplicantStatementDrawerOk = () => {
    this.reloadData({});
  };

  showSetDefaultAttentionUserDrawer = () => {
    SetDefaultAttentionUserDrawer.open();
  };

  afterSetDefaultAttentionUserDrawerOk = () => {
    this.reloadData({});
  };

  showSetDefaultAttentionStatementDrawer = () => {
    SetDefaultAttentionStatementDrawer.open();
  };

  afterSetDefaultAttentionStatementDrawerOk = () => {
    this.reloadData({});
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

  showWorkflowBranchConditionPageListDrawer = () => {
    WorkflowBranchConditionPageListDrawer.open();
  };

  showWorkflowBranchConditionItemPageListDrawer = () => {
    WorkflowBranchConditionItemPageListDrawer.open();
  };

  showWorkflowNodeApproverPageListDrawer = () => {
    WorkflowNodeApproverPageListDrawer.open();
  };

  showWorkflowLinePageListDrawer = () => {
    WorkflowLinePageListDrawer.open();
  };

  showWorkflowCasePageListUnderwayDrawer = () => {
    WorkflowCasePageListUnderwayDrawer.open();
  };

  showWorkflowDebugCasePageListUnderwayDrawer = () => {
    WorkflowDebugCasePageListUnderwayDrawer.open();
  };

  establishPageHeaderTitlePrefix = () => {
    return '流程';
  };

  establishPageHeaderTagCollectionConfig = () => {
    const { metaData } = this.state;

    if ((metaData || null) == null) {
      return null;
    }

    const applicantSignSwitch = getValueByKey({
      data: metaData,
      key: fieldData.applicantSignSwitch.name,
      convert: convertCollection.number,
    });

    const attentionSignSwitch = getValueByKey({
      data: metaData,
      key: fieldData.attentionSignSwitch.name,
      convert: convertCollection.number,
    });

    const availableOnMobileSwitch = getValueByKey({
      data: metaData,
      key: fieldData.availableOnMobileSwitch.name,
      convert: convertCollection.number,
    });

    return [
      {
        color: 'blue',
        text: '申请人签字',
        hidden: applicantSignSwitch !== whetherNumber.yes,
      },
      {
        color: 'yellow',
        text: '经办人签字',
        hidden: attentionSignSwitch !== whetherNumber.yes,
      },
      {
        color: 'orange',
        text: '移动端',
        hidden: availableOnMobileSwitch !== whetherNumber.yes,
      },
    ];
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
          icon: iconBuilder.form(),
          text: '设置实例名模板',
          handleData: metaData,
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.setCaseNameTemplate.permission,
          ),
          handleClick: ({ handleData }) => {
            that.showSetCaseNameTemplateDrawer(handleData);
          },
        },
        {
          buildType: extraBuildType.generalExtraButton,
          type: 'default',
          icon: iconBuilder.form(),
          text: '设置短信通知模板',
          handleData: metaData,
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.setSmsTemplate.permission,
          ),
          handleClick: ({ handleData }) => {
            that.showSetSmsTemplateDrawer(handleData);
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
        hidden: !checkHasAuthority(
          accessWayCollection.workflowNode.pageList.permission,
        ),
        handleClick: () => {
          this.showWorkflowNodePageListDrawer();
        },
      },
      {
        buildType: tabBarCollection.extraBuildType.button,
        icon: iconBuilder.unorderedList(),
        text: '节点条件列表',
        size: 'small',
        hidden: !checkHasAuthority(
          accessWayCollection.workflowBranchCondition.pageList.permission,
        ),
        handleClick: () => {
          this.showWorkflowBranchConditionPageListDrawer();
        },
      },
      {
        buildType: tabBarCollection.extraBuildType.button,
        icon: iconBuilder.unorderedList(),
        text: '节点条件项列表',
        size: 'small',
        hidden: !checkHasAuthority(
          accessWayCollection.workflowBranchConditionItem.pageList.permission,
        ),
        handleClick: () => {
          this.showWorkflowBranchConditionItemPageListDrawer();
        },
      },
      {
        buildType: tabBarCollection.extraBuildType.button,
        icon: iconBuilder.unorderedList(),
        text: '节点审批人列表',
        size: 'small',
        hidden: !checkHasAuthority(
          accessWayCollection.workflowNodeApprover.pageList.permission,
        ),
        handleClick: () => {
          this.showWorkflowNodeApproverPageListDrawer();
        },
      },
      {
        buildType: tabBarCollection.extraBuildType.button,
        icon: iconBuilder.unorderedList(),
        text: '线条列表',
        size: 'small',
        hidden: !checkHasAuthority(
          accessWayCollection.workflowLine.pageList.permission,
        ),
        handleClick: () => {
          this.showWorkflowLinePageListDrawer();
        },
      },
      {
        buildType: tabBarCollection.extraBuildType.button,
        icon: iconBuilder.fork(),
        text: '流程图例',
        size: 'small',
        hidden: !checkHasAuthority(
          accessWayCollection.workflowFormDesign.get.permission,
        ),
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

    const applicantSignSwitch = getValueByKey({
      data: metaData,
      key: fieldData.applicantSignSwitch.name,
      convert: convertCollection.number,
    });

    const attentionSignSwitch = getValueByKey({
      data: metaData,
      key: fieldData.attentionSignSwitch.name,
      convert: convertCollection.number,
    });

    const availableOnMobileSwitch = getValueByKey({
      data: metaData,
      key: fieldData.availableOnMobileSwitch.name,
      convert: convertCollection.number,
    });

    return {
      disabled: this.checkInProgress(),
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'showWorkflowCasePageListUnderwayDrawer': {
            that.showWorkflowCasePageListUnderwayDrawer(handleData);
            break;
          }

          case 'showWorkflowDebugCasePageListUnderwayDrawer': {
            that.showWorkflowDebugCasePageListUnderwayDrawer(handleData);
            break;
          }

          case 'toggleApplicantSignSwitch': {
            that.toggleApplicantSignSwitch(handleData);
            break;
          }

          case 'showSetDefaultApplicantStatementDrawer': {
            that.showSetDefaultApplicantStatementDrawer(handleData);
            break;
          }

          case 'toggleAttentionSignSwitch': {
            that.toggleAttentionSignSwitch(handleData);
            break;
          }

          case 'showSetDefaultAttentionUserDrawer': {
            that.showSetDefaultAttentionUserDrawer(handleData);
            break;
          }

          case 'showSetDefaultAttentionStatementDrawer': {
            that.showSetDefaultAttentionStatementDrawer(handleData);
            break;
          }

          case 'openMultibranch': {
            that.showUpdateMultibranchModal(handleData);
            break;
          }

          case 'openMultiEnd': {
            that.showUpdateMultiEndModal(handleData);
            break;
          }

          case 'toggleAvailableOnMobileSwitch': {
            that.toggleAvailableOnMobileSwitch(handleData);
            break;
          }

          case 'showUpdateChannelModal': {
            that.showUpdateChannelModal(handleData);
            break;
          }

          case 'refreshCache': {
            that.refreshCache(handleData);
            break;
          }

          default: {
            showSimpleErrorMessage('can not find matched key');
            break;
          }
        }
      },
      handleData: metaData,
      items: [
        {
          key: 'showWorkflowCasePageListUnderwayDrawer',
          icon: iconBuilder.unorderedList(),
          text: '进行中的审批实例列表',
          hidden: !checkHasAuthority(
            accessWayCollection.workflowCase.pageListUnderway.permission,
          ),
        },
        {
          key: 'showWorkflowDebugCasePageListUnderwayDrawer',
          icon: iconBuilder.unorderedList(),
          text: '进行中的测试实例列表',
          hidden: !checkHasAuthority(
            accessWayCollection.workflowDebugCase.pageListUnderway.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
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
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'toggleApplicantSignSwitch',
          icon:
            applicantSignSwitch === whetherNumber.yes
              ? iconBuilder.pauseCircle()
              : iconBuilder.enable(),
          text: `${applicantSignSwitch === whetherNumber.yes ? '关闭' : '开启'}申请人签名开关`,
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.toggleApplicantSignSwitch.permission,
          ),
          confirm: true,
          title: `即将${applicantSignSwitch === whetherNumber.yes ? '关闭' : '开启'}申请人签名开关，确定吗？`,
        },
        {
          key: 'showSetDefaultApplicantStatementDrawer',
          icon: iconBuilder.edit(),
          text: `默认申请人签名配置`,
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.setDefaultApplicantStatement
              .permission,
          ),
          disabled: applicantSignSwitch !== whetherNumber.yes,
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'toggleAttentionSignSwitch',
          icon:
            attentionSignSwitch === whetherNumber.yes
              ? iconBuilder.pauseCircle()
              : iconBuilder.enable(),
          text: `${attentionSignSwitch === whetherNumber.yes ? '关闭' : '开启'}经办人签名开关`,
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.toggleAttentionSignSwitch.permission,
          ),
          confirm: true,
          title: `即将${attentionSignSwitch === whetherNumber.yes ? '关闭' : '开启'}经办人签名开关，确定吗？`,
        },
        {
          key: 'showSetDefaultAttentionUserDrawer',
          icon: iconBuilder.edit(),
          text: `默认经办人配置`,
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.setDefaultAttentionUser.permission,
          ),
          disabled: attentionSignSwitch !== whetherNumber.yes,
        },
        {
          key: 'showSetDefaultAttentionStatementDrawer',
          icon: iconBuilder.edit(),
          text: `默认经办人签名配置`,
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.setDefaultAttentionStatement
              .permission,
          ),
          disabled: attentionSignSwitch !== whetherNumber.yes,
        },
        {
          type: dropdownExpandItemType.divider,
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
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'toggleAvailableOnMobileSwitch',
          icon:
            availableOnMobileSwitch === whetherNumber.yes
              ? iconBuilder.pauseCircle()
              : iconBuilder.enable(),
          text: `${availableOnMobileSwitch === whetherNumber.yes ? '关闭' : '开放'}移动端发起审批`,
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.toggleAvailableOnMobileSwitch
              .permission,
          ),
          confirm: true,
          title: `即将${availableOnMobileSwitch === whetherNumber.yes ? '关闭' : '开放'}移动端发起审批，确定吗？`,
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showUpdateChannelModal',
          icon: iconBuilder.swap(),
          text: '设置数据通道',
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.setChannel.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
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
      {
        label: fieldData.globalDebugUserRealName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.globalDebugUserRealName.name,
        }),
      },
    ];
  };

  renderPresetOther = () => {
    const { workflowId } = this.state;

    return (
      <>
        <SetCaseNameTemplateDrawer
          externalData={{ workflowId }}
          afterOK={() => {
            this.afterSetCaseNameTemplateDrawerOk();
          }}
        />

        <SetSmsTemplateDrawer
          externalData={{ workflowId }}
          afterOK={() => {
            this.afterSetSmsTemplateDrawerOk();
          }}
        />

        <SetDefaultApplicantStatementDrawer
          externalData={{ workflowId }}
          afterOK={() => {
            this.afterSetDefaultApplicantStatementDrawerOk();
          }}
        />

        <SetDefaultAttentionUserDrawer
          externalData={{ workflowId }}
          afterOK={() => {
            this.afterSetDefaultAttentionUserDrawerOk();
          }}
        />

        <SetDefaultAttentionStatementDrawer
          externalData={{ workflowId }}
          afterOK={() => {
            this.afterSetDefaultAttentionStatementDrawerOk();
          }}
        />

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

        <WorkflowNodePageListDrawer
          maskClosable
          externalData={{ workflowId }}
        />

        <WorkflowLinePageListDrawer
          maskClosable
          externalData={{ workflowId }}
        />

        <WorkflowBranchConditionPageListDrawer
          maskClosable
          externalData={{ workflowId }}
        />

        <WorkflowBranchConditionItemPageListDrawer
          maskClosable
          externalData={{ workflowId }}
        />

        <WorkflowNodeApproverPageListDrawer
          maskClosable
          externalData={{ workflowId }}
        />

        <WorkflowCasePageListUnderwayDrawer
          maskClosable
          externalData={{ workflowId }}
        />

        <WorkflowDebugCasePageListUnderwayDrawer
          maskClosable
          externalData={{ workflowId }}
        />
      </>
    );
  };
}

export default Detail;
