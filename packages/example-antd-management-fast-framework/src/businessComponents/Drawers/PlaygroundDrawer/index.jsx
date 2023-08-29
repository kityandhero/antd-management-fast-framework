import { connect } from 'easy-soft-dva';

import { Playground } from 'antd-management-fast-design';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

const { BaseFormDrawer } = DataDrawer;

const visibleFlag = 'E3F3492EE09B463A89D3B5989FF05B6D';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class PlaygroundDrawer extends BaseFormDrawer {
  // showCallProcess = true;

  resetDataAfterLoad = false;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      width: '100vw',
      overlayButtonOpenText: '打开源代码',
      overlayButtonCloseText: '关闭源代码',
    };
  }

  renderPresetTitle = () => {
    return '表单设计';
  };

  renderPresetContentContainorInner = () => {
    return <Playground />;
  };
}

export { PlaygroundDrawer };
