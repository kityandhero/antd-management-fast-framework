import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { BaseFlowCaseNextProcessNotificationPreviewDrawer } from '../../../pageBases';
import { fieldData } from '../Common/data';

const visibleFlag = '6aae5f3c691942bb8f366610aa04d66f';

@connect(({ workflowCaseNextProcessNotification, schedulingControl }) => ({
  workflowCaseNextProcessNotification,
  schedulingControl,
}))
class WorkflowCaseNextProcessNotificationPreviewDrawer extends BaseFlowCaseNextProcessNotificationPreviewDrawer {
  componentAuthority =
    accessWayCollection.workflowCaseNextProcessNotification.pageList.permission;

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
        modelTypeCollection.workflowCaseNextProcessNotificationTypeCollection
          .get,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldData.workflowCaseNextProcessNotificationId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowCaseNextProcessNotificationId.name,
    });

    return d;
  };
}

export { WorkflowCaseNextProcessNotificationPreviewDrawer };
