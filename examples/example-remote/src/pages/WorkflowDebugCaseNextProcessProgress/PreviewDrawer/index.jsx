import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../modelBuilders';
import { BaseFlowCaseNextProcessProgressPreviewDrawer } from '../../../pageBases';
import { fieldData } from '../Common/data';

const visibleFlag = '972d2d4604e94f24be6568e0a5367248';

@connect(({ workflowDebugCaseNextProcessProgress, schedulingControl }) => ({
  workflowDebugCaseNextProcessProgress,
  schedulingControl,
}))
class WorkflowDebugCaseNextProcessProgressPreviewDrawer extends BaseFlowCaseNextProcessProgressPreviewDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.workflowDebugCaseNextProcessProgressTypeCollection
          .getByFlowCaseId,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.flowCaseId.name] = getValueByKey({
      data: externalData,
      key: fieldData.flowCaseId.name,
    });

    return d;
  };
}

export { WorkflowDebugCaseNextProcessProgressPreviewDrawer };
