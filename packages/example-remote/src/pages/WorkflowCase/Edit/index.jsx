import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import {
  getDerivedStateFromPropertiesForUrlParameters,
  tabBarCollection,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../customConfig';
import {
  DataTabContainerSupplement,
  getFlowCaseStatusName,
} from '../../../customSpecialComponents';
import { FlowDisplayDrawer } from '../../Workflow/FlowDisplayDrawer';
import { resetAllApproveAction } from '../../WorkflowCaseProcessHistory/Assist/action';
import { PageListDrawer as WorkflowLinePageListDrawer } from '../../WorkflowLine/PageListDrawer';
import { PageListDrawer as WorkflowNodePageListDrawer } from '../../WorkflowNode/PageListDrawer';
import { PageListDrawer as WorkflowNodeApproverPageListDrawer } from '../../WorkflowNodeApprover/PageListDrawer';
import {
  closeCancelApproveSwitchAction,
  closeResetAllApproveSwitchAction,
  openCancelApproveSwitchAction,
  openResetAllApproveSwitchAction,
  refreshCacheAction,
} from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData } from '../Common/data';

@connect(({ workflowCase, schedulingControl }) => ({
  workflowCase,
  schedulingControl,
}))
class Detail extends DataTabContainerSupplement {
  componentAuthority = accessWayCollection.workflowCase.get.permission;

  tabList = [
    {
      key: 'basicInfo',
      hidden: !checkHasAuthority(
        accessWayCollection.workflowCase.get.permission,
      ),
      tab: '基本信息',
    },
    {
      key: 'formInfo',
      hidden: !checkHasAuthority(
        accessWayCollection.workflowCase.get.permission,
      ),
      tab: '表单信息',
    },
    {
      key: 'operateLog/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.workflowCase.pageListOperateLog.permission,
      ),
      tab: '操作日志',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: 'workflowCase/get',
      backPath: `/flow/workflowCase/pageList/key`,
      workflowCaseId: null,
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
    const { workflowCaseId } = this.state;

    d.workflowCaseId = workflowCaseId;

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
        key: fieldData.title.name,
      }),
    });
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

  openCancelApproveSwitch = (r) => {
    openCancelApproveSwitchAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  closeCancelApproveSwitch = (r) => {
    closeCancelApproveSwitchAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  openResetAllApproveSwitch = (r) => {
    openResetAllApproveSwitchAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  closeResetAllApproveSwitch = (r) => {
    closeResetAllApproveSwitchAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  resetAllApprove = (r) => {
    resetAllApproveAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
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
    return '流程实例';
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
    const { firstLoadSuccess, metaData } = this.state;

    if (metaData == null) {
      return null;
    }

    const cancelApproveSwitch = getValueByKey({
      data: metaData,
      key: fieldData.cancelApproveSwitch.name,
      convert: convertCollection.number,
    });

    const resetAllApproveSwitch = getValueByKey({
      data: metaData,
      key: fieldData.resetAllApproveSwitch.name,
      convert: convertCollection.number,
    });

    const that = this;

    return {
      buttons: [
        {
          key: 'openCancelApproveSwitch',
          text: '开启撤销审批功能',
          icon: iconBuilder.playCircle(),
          handleButtonClick: ({ handleData }) => {
            that.openCancelApproveSwitch(handleData);
          },
          disabled: !firstLoadSuccess,
          hidden:
            !checkHasAuthority(
              accessWayCollection.workflowCase.openCancelApproveSwitch
                .permission,
            ) || cancelApproveSwitch === whetherNumber.yes,
          confirm: true,
          title: '即将开启撤销审批功能，确定吗？',
          handleData: metaData,
        },
        {
          key: 'closeCancelApproveSwitch',
          text: '关闭撤销审批功能',
          icon: iconBuilder.playCircle(),
          handleButtonClick: ({ handleData }) => {
            that.closeCancelApproveSwitch(handleData);
          },
          disabled: !firstLoadSuccess,
          hidden:
            !checkHasAuthority(
              accessWayCollection.workflowCase.openCancelApproveSwitch
                .permission,
            ) || cancelApproveSwitch === whetherNumber.no,
          confirm: true,
          title: '即将关闭撤销审批功能，确定吗？',
          handleData: metaData,
        },
        {
          key: 'openResetAllApproveSwitch',
          text: '开启重置审批功能',
          icon: iconBuilder.playCircle(),
          handleButtonClick: ({ handleData }) => {
            that.openResetAllApproveSwitch(handleData);
          },
          disabled: !firstLoadSuccess,
          hidden:
            !checkHasAuthority(
              accessWayCollection.workflowCase.openResetAllApproveSwitch
                .permission,
            ) || resetAllApproveSwitch === whetherNumber.yes,
          confirm: true,
          title: '即将开启重置审批功能，确定吗？',
          handleData: metaData,
        },
        {
          key: 'closeResetAllApproveSwitch',
          text: '关闭重置审批功能',
          icon: iconBuilder.playCircle(),
          handleButtonClick: ({ handleData }) => {
            that.closeResetAllApproveSwitch(handleData);
          },
          disabled: !firstLoadSuccess,
          hidden:
            !checkHasAuthority(
              accessWayCollection.workflowCase.openResetAllApproveSwitch
                .permission,
            ) || resetAllApproveSwitch === whetherNumber.no,
          confirm: true,
          title: '即将关闭重置审批功能，确定吗？',
          handleData: metaData,
        },
        {
          key: 'resetAllApprove',
          text: '重置审批',
          icon: iconBuilder.redo(),
          handleButtonClick: ({ handleData }) => {
            that.resetAllApprove(handleData);
          },
          disabled:
            !firstLoadSuccess || resetAllApproveSwitch === whetherNumber.no,
          hidden: !checkHasAuthority(
            accessWayCollection.workflowCaseProcessHistory.resetAllApprove
              .permission,
          ),
          confirm: true,
          title: '即将重置审批，确定吗？',
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
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.workflowCase.refreshCache.permission,
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
      text: getFlowCaseStatusName({
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
        label: fieldData.workflowCaseId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.workflowCaseId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.workflowName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.workflowName.name,
        }),
      },
      {
        label: fieldData.cancelApproveSwitch.label,
        value:
          getValueByKey({
            data: metaData,
            key: fieldData.cancelApproveSwitch.name,
            convert: convertCollection.number,
          }) === whetherNumber.yes
            ? '开启'
            : '关闭',
      },
      {
        label: fieldData.resetAllApproveSwitch.label,
        value:
          getValueByKey({
            data: metaData,
            key: fieldData.resetAllApproveSwitch.name,
            convert: convertCollection.number,
          }) === whetherNumber.yes
            ? '开启'
            : '关闭',
      },
    ];
  };

  renderPresetOther = () => {
    const { metaData } = this.state;

    const workflowId = getValueByKey({
      data: metaData,
      key: fieldData.workflowId.name,
      defaultValue: '',
    });

    return (
      <>
        <FlowDisplayDrawer maskClosable externalData={{ workflowId }} />

        <WorkflowNodePageListDrawer externalData={{ workflowId }} />

        <WorkflowLinePageListDrawer externalData={{ workflowId }} />

        <WorkflowNodeApproverPageListDrawer externalData={{ workflowId }} />
      </>
    );
  };
}

export default Detail;
