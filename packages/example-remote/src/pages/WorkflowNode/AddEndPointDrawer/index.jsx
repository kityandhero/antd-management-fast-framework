import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseAddPointDrawer } from '../BaseAddPointDrawer';

const visibleFlag = '5148c064c0914ca39d9bf5c9fdc27263';

@connect(({ workflowNode, schedulingControl }) => ({
  workflowNode,
  schedulingControl,
}))
class AddEndPointDrawer extends BaseAddPointDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      submitApiPath: 'workflowNode/addEndPoint',
    };
  }

  renderPresetTitle = () => {
    return '新增流程终止点';
  };
}

export { AddEndPointDrawer };
