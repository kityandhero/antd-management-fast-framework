import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseAddPointDrawer } from '../BaseAddPointDrawer';

const visibleFlag = '709b7d9a521c45abbec25f6c6568a9a2';

@connect(({ workflowNode, schedulingControl }) => ({
  workflowNode,
  schedulingControl,
}))
class AddIntermediatePointDrawer extends BaseAddPointDrawer {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增过程点',
      submitApiPath: 'workflowNode/addIntermediatePoint',
    };
  }

  renderPresetTitle = () => {
    return '新增流程点';
  };
}

export { AddIntermediatePointDrawer };
