import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseAddPointDrawer } from '../BaseAddPointDrawer';

const visibleFlag = 'bf0aba62faee4b66878c84f0ee2f9890';

@connect(({ workflowNode, schedulingControl }) => ({
  workflowNode,
  schedulingControl,
}))
class AddStartPointDrawer extends BaseAddPointDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      submitApiPath: 'workflowNode/addStartPoint',
    };
  }

  renderPresetTitle = () => {
    return '新增流程起始点';
  };
}

export { AddStartPointDrawer };
