import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseFlowCaseProcessChainDrawer } from '../../../pageBases';

const visibleFlag = '8f53689d202146bab9d684c36d911e9a';

@connect(({ workflowDebugCase, schedulingControl }) => ({
  workflowDebugCase,
  schedulingControl,
}))
class ProcessChainDrawer extends BaseFlowCaseProcessChainDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'workflowDebugCase/getChainByWorkflow',
    };
  }
}

export { ProcessChainDrawer };
