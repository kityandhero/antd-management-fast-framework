import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseFlowCaseFormDocumentDrawer } from '../../../pageBases';

const visibleFlag = '010012cdadee4558bb71f2617793f2ef';

@connect(({ workflowFormDesign, schedulingControl }) => ({
  workflowFormDesign,
  schedulingControl,
}))
class FlowCaseFormDocumentDrawer extends BaseFlowCaseFormDocumentDrawer {
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
      listChainApprove: [],
    };
  }

  getAllApproveProcessList = () => {
    const { allApproveProcessList } = this.props;

    return allApproveProcessList;
  };
}

export { FlowCaseFormDocumentDrawer };
