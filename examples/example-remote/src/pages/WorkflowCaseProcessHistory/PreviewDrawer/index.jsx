import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { BaseFlowCaseProcessHistoryPreviewDrawer } from '../../../pageBases';
import { fieldData } from '../Common/data';

const visibleFlag = 'a9a3c29f92e0402098903cb8864ab00c';

@connect(({ workflowCaseProcessHistory, schedulingControl }) => ({
  workflowCaseProcessHistory,
  schedulingControl,
}))
class WorkFlowCaseProcessHistoryPreviewDrawer extends BaseFlowCaseProcessHistoryPreviewDrawer {
  componentAuthority =
    accessWayCollection.workflowCaseProcessHistory.pageList.permission;

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
        modelTypeCollection.workflowCaseProcessHistoryTypeCollection.get,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldData.workflowCaseProcessHistoryId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowCaseProcessHistoryId.name,
    });

    return d;
  };
}

export { WorkFlowCaseProcessHistoryPreviewDrawer };
