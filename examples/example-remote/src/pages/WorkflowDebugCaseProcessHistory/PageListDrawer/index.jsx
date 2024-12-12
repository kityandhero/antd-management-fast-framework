import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { BaseFlowCaseProcessHistoryPageListDrawer } from '../../../pageBases';
import { refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '0e532e94b3cc4f23ac5d57e744e97e37';

@connect(({ workflowDebugCaseProcessHistory, schedulingControl }) => ({
  workflowDebugCaseProcessHistory,
  schedulingControl,
}))
class WorkflowDebugCaseProcessHistoryPageListDrawer extends BaseFlowCaseProcessHistoryPageListDrawer {
  reloadWhenShow = true;

  componentAuthority =
    accessWayCollection.workflowDebugCaseProcessHistory.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '测试流程审批记录列表',
      loadApiPath: 'workflowDebugCaseProcessHistory/pageList',
    };
  }

  getFlowCaseProcessHistoryIdDataTarget = () => {
    return fieldData.workflowDebugCaseProcessHistoryId;
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  checkHasRefreshCacheAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowDebugCaseProcessHistory.refreshCache
        .permission,
    );
  };
}

export { WorkflowDebugCaseProcessHistoryPageListDrawer };
