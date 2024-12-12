import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseAddPointDrawer } from '../BaseAddPointDrawer';

const visibleFlag = '39dcda85c912483f944d9efc6475afae';

@connect(({ workflowNode, schedulingControl }) => ({
  workflowNode,
  schedulingControl,
}))
class AddCarbonCopyPointDrawer extends BaseAddPointDrawer {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增抄送点',
      submitApiPath: 'workflowNode/addCarbonCopyPoint',
    };
  }

  renderPresetTitle = () => {
    return '新增流程点';
  };
}

export { AddCarbonCopyPointDrawer };
