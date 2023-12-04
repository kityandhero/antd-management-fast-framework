export const code = `import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseSimpleMultiPageSelectDrawer } from '../BaseSimpleMultiPageSelectDrawer';

import { code } from './codeSource';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '50456cfa3e5f4ee8b3fa6ff716c19553';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleMultiPageMultiSelectDrawer extends BaseSimpleMultiPageSelectDrawer {
  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      showSelect: true,
      sourceCode: code,
    };
  }

  static open() {
    switchControlAssist.open(visibleFlag);
  }
}

export { SimpleMultiPageMultiSelectDrawer };
`;
