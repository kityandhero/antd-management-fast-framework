import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { BaseFlowCasePageListUnderwayDrawer } from '../../../pageBases';
import { forceEndAction, refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '63d5a6fd59bb4f15ba0b8f90070a5a1e';

@connect(({ workflowDebugCase, schedulingControl }) => ({
  workflowDebugCase,
  schedulingControl,
}))
class WorkflowDebugCasePageListUnderwayDrawer extends BaseFlowCasePageListUnderwayDrawer {
  columnOperateVisible = false;

  componentAuthority =
    accessWayCollection.workflowDebugCase.pageListUnderway.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '进行中的审批实例列表【仅与当前测试相关】',
      loadApiPath: 'workflowDebugCase/pageListUnderway',
    };
  }

  getFlowCaseIdDataTarget = () => {
    return fieldData.workflowDebugCaseId;
  };

  forceEnd = (r) => {
    forceEndAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.afterForceEnd({});
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  checkHasForceEndAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowDebugCase.forceEnd.permission,
    );
  };

  checkHasRefreshCacheAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowDebugCase.refreshCache.permission,
    );
  };
}

export { WorkflowDebugCasePageListUnderwayDrawer };
