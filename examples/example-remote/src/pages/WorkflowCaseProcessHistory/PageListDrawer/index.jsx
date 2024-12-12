import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { BaseFlowCaseProcessHistoryPageListDrawer } from '../../../pageBases';
import { refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';

const visibleFlag = '5d971f98ac9b464fb2a4c3fd5bd32d23';

@connect(({ workflowCaseNextProcessProgress, schedulingControl }) => ({
  workflowCaseNextProcessProgress,
  schedulingControl,
}))
class WorkflowCaseProcessHistoryPageListDrawer extends BaseFlowCaseProcessHistoryPageListDrawer {
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
      loadApiPath:
        modelTypeCollection.workflowCaseProcessHistoryTypeCollection.pageList,
    };
  }

  getFlowCaseProcessHistoryIdDataTarget = () => {
    return fieldData.workflowCaseProcessHistoryId;
  };

  refreshCache = (item) => {
    refreshCacheAction({
      target: this,
      handleData: item,
    });
  };

  checkHasRefreshCacheAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCaseProcessHistory.refreshCache.permission,
    );
  };
}

export { WorkflowCaseProcessHistoryPageListDrawer };
