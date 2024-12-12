import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseNodeSelectModal } from '../BaseNodeSelectModal';

const visibleFlag = '31792341dfdc4aa79ed90e51d5da3a60';

@connect(({ workflowNode, schedulingControl }) => ({
  workflowNode,
  schedulingControl,
}))
class FromNodeSelectModal extends BaseNodeSelectModal {
  showCallProcess = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);
  }
}

export { FromNodeSelectModal };
