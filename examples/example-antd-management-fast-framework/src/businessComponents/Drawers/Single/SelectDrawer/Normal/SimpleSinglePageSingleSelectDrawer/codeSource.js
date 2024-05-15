export const code = `import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import BaseSimpleSinglePageSelectDrawer from '../../BaseSimpleSinglePageSelectDrawer';

import { code } from './codeSource';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'afc20144a2fd4fd398602da925d93da7';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleSinglePageSingleSelectDrawer extends BaseSimpleSinglePageSelectDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      sourceCode: code,
    };
  }
}

export { SimpleSinglePageSingleSelectDrawer };
`;
