import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseNodePageListSelectDrawer } from '../BaseNodePageListSelectDrawer';

const visibleFlag = 'a4512ff828f441da9c4f844205f931df';

@connect(({ workflowNode, schedulingControl }) => ({
  workflowNode,
  schedulingControl,
}))
class ToNodePageListSelectDrawer extends BaseNodePageListSelectDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
    };
  }
}

export { ToNodePageListSelectDrawer };
