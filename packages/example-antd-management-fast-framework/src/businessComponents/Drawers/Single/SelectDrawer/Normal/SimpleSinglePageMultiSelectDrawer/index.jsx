import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import BaseSimpleSinglePageSelectDrawer from '../../BaseSimpleSinglePageSelectDrawer';

import { code } from './codeSource';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '0c42f711935343f3b20cceedc8179064';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleSinglePageMultiSelectDrawer extends BaseSimpleSinglePageSelectDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      showSelect: true,
      sourceCode: code,
    };
  }
}

export { SimpleSinglePageMultiSelectDrawer };
