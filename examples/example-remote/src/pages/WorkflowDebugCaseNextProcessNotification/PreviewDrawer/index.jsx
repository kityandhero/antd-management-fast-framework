import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../modelBuilders';
import { BaseFlowCaseNextProcessNotificationPreviewDrawer } from '../../../pageBases';
import { fieldData } from '../Common/data';

const visibleFlag = '1d19a9a590654eec9941ea7bd08a6179';

@connect(({ workflowDebugCaseNextProcessProgress, schedulingControl }) => ({
  workflowDebugCaseNextProcessProgress,
  schedulingControl,
}))
class WorkflowDebugCaseNextProcessNotificationPreviewDrawer extends BaseFlowCaseNextProcessNotificationPreviewDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection
          .workflowDebugCaseNextProcessNotificationTypeCollection.get,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.workflowDebugCaseNextProcessNotificationId.name] =
      getValueByKey({
        data: externalData,
        key: fieldData.workflowDebugCaseNextProcessNotificationId.name,
      });

    return d;
  };
}

export { WorkflowDebugCaseNextProcessNotificationPreviewDrawer };
