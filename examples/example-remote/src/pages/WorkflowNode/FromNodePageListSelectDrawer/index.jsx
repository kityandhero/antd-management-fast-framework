import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseNodePageListSelectDrawer } from '../BaseNodePageListSelectDrawer';

const visibleFlag = 'a77bce05b5064be69b6c5dd218bae2bd';

@connect(({ workflowNode, schedulingControl }) => ({
  workflowNode,
  schedulingControl,
}))
class FromNodePageListSelectDrawer extends BaseNodePageListSelectDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);
  }
}

export { FromNodePageListSelectDrawer };
