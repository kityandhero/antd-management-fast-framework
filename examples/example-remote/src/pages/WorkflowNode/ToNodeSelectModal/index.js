import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseNodeSelectModal } from '../BaseNodeSelectModal';

const visibleFlag = '30edfabd62c745d3ad1dc1cfea91d0dc';

@connect(({ workflowNode, schedulingControl }) => ({
  workflowNode,
  schedulingControl,
}))
class ToNodeSelectModal extends BaseNodeSelectModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);
  }
}

export { ToNodeSelectModal };
