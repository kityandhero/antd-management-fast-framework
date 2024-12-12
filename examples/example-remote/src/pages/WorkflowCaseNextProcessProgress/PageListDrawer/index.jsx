import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { BaseFlowCaseNextProcessProgressPageListDrawer } from '../../../pageBases';
import { refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';

const visibleFlag = '3da9409d07634926876405ee4b8c5886';

@connect(({ workflowCaseNextProcessProgress, schedulingControl }) => ({
  workflowCaseNextProcessProgress,
  schedulingControl,
}))
class WorkflowCaseNextProcessProgressPageListDrawer extends BaseFlowCaseNextProcessProgressPageListDrawer {
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
        modelTypeCollection.workflowCaseNextProcessProgressTypeCollection
          .pageList,
    };
  }

  getFlowCaseNextProcessProgressIdDataTarget = () => {
    return fieldData.workflowCaseNextProcessProgressId;
  };

  refreshCache = (item) => {
    refreshCacheAction({
      target: this,
      handleData: item,
    });
  };

  checkHasRefreshCacheAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCaseNextProcessProgress.refreshCache
        .permission,
    );
  };
}

export { WorkflowCaseNextProcessProgressPageListDrawer };
