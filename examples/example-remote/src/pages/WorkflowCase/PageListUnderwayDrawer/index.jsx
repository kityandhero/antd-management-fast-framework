import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { BaseFlowCasePageListUnderwayDrawer } from '../../../pageBases';
import { forceEndAction, refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'db291519f9734ff4bf284374ce9a2ddb';

@connect(({ workflowCase, schedulingControl }) => ({
  workflowCase,
  schedulingControl,
}))
class WorkflowCasePageListUnderwayDrawer extends BaseFlowCasePageListUnderwayDrawer {
  componentAuthority =
    accessWayCollection.workflowCase.pageListUnderway.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '进行中的审批实例列表',
      loadApiPath: 'workflowCase/pageListUnderway',
    };
  }

  getFlowCaseIdDataTarget = () => {
    return fieldData.workflowCaseId;
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
      accessWayCollection.workflowCase.forceEnd.permission,
    );
  };

  checkHasRefreshCacheAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCase.refreshCache.permission,
    );
  };
}

export { WorkflowCasePageListUnderwayDrawer };
