export const code = `import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import BaseSimpleSinglePageSelectDrawer from '../../BaseSimpleSinglePageSelectDrawer';

import { code } from './codeSource';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '94f54e3085974ebca2dd0b4f92868ec6';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleSinglePageFrontendPaginationMultiSelectDrawer extends BaseSimpleSinglePageSelectDrawer {
  // 使用模拟分页, 默认 false, 不使用二次选择确认时可不用特殊指定
  useFrontendPagination = true;

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

export { SimpleSinglePageFrontendPaginationMultiSelectDrawer };
`;
