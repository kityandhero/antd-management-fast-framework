import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { BaseFlowCaseNextProcessApprovePreviewDrawer } from '../../../pageBases';
import { fieldData } from '../../WorkflowCaseLatestApprove/Common/data';

const visibleFlag = '6aae5f3c691942bb8f366610aa04d66f';

@connect(({ workflowCaseNextProcessApprove, schedulingControl }) => ({
  workflowCaseNextProcessApprove,
  schedulingControl,
}))
class WorkflowCaseNextProcessApprovePreviewDrawer extends BaseFlowCaseNextProcessApprovePreviewDrawer {
  componentAuthority =
    accessWayCollection.workflowCaseNextProcessApprove.pageList.permission;

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
        modelTypeCollection.workflowCaseNextProcessApproveTypeCollection.get,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldData.workflowCaseNextProcessApproveId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowCaseNextProcessApproveId.name,
    });

    return d;
  };
}

export { WorkflowCaseNextProcessApprovePreviewDrawer };
